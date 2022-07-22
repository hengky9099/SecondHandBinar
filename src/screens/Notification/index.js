import {View, Alert, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ItemNotificationCard, Poppins, StatusBarCore} from '../../component';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../redux/globalAction';
import axios from 'axios';
import {baseUrl} from '@env';
import {navigate} from '../../helpers/navigate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {currencyToIDR, thisDate} from '../../helpers/change';
import {setLogin} from '../Login/redux/action';
import {useCallback} from 'react';
import styles from './styles';
import {COLORS} from '../../helpers/colors';
import {setCountNotifikasi} from './redux/action';

const Notification = () => {
  const dispatch = useDispatch();
  const {dataLogin} = useSelector(state => state.login);
  const [notifikasi, setnotifikasi] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getDataNotification();
  }, [getDataNotification]);

  const getDataNotification = useCallback(async () => {
    //OrderSeller
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`${baseUrl}/notification`, {
        headers: {access_token: `${dataLogin.access_token}`},
      });
      setnotifikasi(res.data);
      const data = res.data.filter(function (item) {
        return item.read === false;
      }).length;
      dispatch(setCountNotifikasi(data));
      console.log('ini dia :', data);
      console.log('Data Notification: ', res.data);
      if (res.status === 200) {
        dispatch(setLoading(false));
      }
      if (res.status === 403) {
        setLogin();
        navigate('Login');
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));

      if ((error.message = 'Request failed with status code 401')) {
        await AsyncStorage.setItem('@access_token', '');
        Alert.alert(
          'Pemberitahuan',
          'Token Sudah Expired, silahkan Login kembali!',
          [
            {
              text: 'OK',
              onPress: () => {
                navigate('Login');
                dispatch(setLogin(''));
              },
            },
          ],
        );
      }
    } finally {
      dispatch(setLoading(false));
    }
  }, [dataLogin, dispatch]);

  const statusRead = useCallback(
    async id => {
      try {
        dispatch(setLoading(true));
        const response = await axios.patch(
          `${baseUrl}/notification/${id}`,
          dataLogin,
          {
            headers: {access_token: `${dataLogin.access_token}`},
          },
        );
        getDataNotification();
        console.log('Data Read: ', response.data);
      } catch (error) {
        console.log('message: ', error);
      }
    },
    [dataLogin, dispatch, getDataNotification],
  );

  const onRefresh = () => {
    setRefresh(true);
    getDataNotification(dataLogin);
    setRefresh(false);
  };

  const renderDataNotification = ({item}) => (
    <ItemNotificationCard
      onPress={() => statusRead(item.id)}
      date={thisDate(item.transaction_date)}
      urlImage={item.image_url}
      productName={item.product_name}
      productPrice={currencyToIDR(item.base_price)}
      tawaran={currencyToIDR(item.bid_price)}
      status={item.status}
      read={item.read}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Poppins style={styles.textHeader}>Notifikasi</Poppins>
        <StatusBarCore backgroundColor={COLORS.white} barStyle="dark-content" />
        <View style={styles.containerNotifBar}>
          {notifikasi ? (
            <FlatList
              refreshControl={
                <RefreshControl onRefresh={onRefresh} refreshing={refresh} />
              }
              inverted
              data={notifikasi}
              keyExtractor={(_item, index) => index}
              numColumns={1}
              key={1}
              renderItem={renderDataNotification}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={<View style={styles.footerComponent} />}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default Notification;
