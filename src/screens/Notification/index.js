import {View, Alert, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ItemNotificationCard, Poppins} from '../../component';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../redux/globalAction';
import axios from 'axios';
import {baseUrl} from '@env';
import {setNotification, setRefreshing} from './redux/action';
import {navigate} from '../../helpers/navigate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {currencyToIDR, thisDate} from '../../helpers/change';
import {setLogin} from '../Login/redux/action';
import {useCallback} from 'react';
import styles from './styles';

const Notification = () => {
  const dispatch = useDispatch();
  const {dataLogin} = useSelector(state => state.login);
  const {refreshing} = useSelector(state => state.notifikasi);
  const [notifikasi, setnotifikasi] = useState([]);

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
      setnotifikasi([...res.data]);
      console.log('Data Notification: ', res.data);
      dispatch(setNotification(res.data));
      if (res.status === 200) {
        dispatch(setLoading(false));
        dispatch(setNotification(res.data));
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

  const onRefresh = () => {
    dispatch(setRefreshing(true));
    dispatch(getDataNotification(dataLogin));
  };

  const renderDataNotification = ({item}) => (
    <ItemNotificationCard
      onPress={setRead(item.id)}
      date={thisDate(item.transaction_date)}
      productName={item.product_name}
      productPrice={currencyToIDR(item.base_price)}
      tawaran={currencyToIDR(item.bid_price)}
      status={item.status}
    />
  );

  const setRead = id => {
    for (let i in notifikasi) {
      if (notifikasi[i].id === id) {
        notifikasi[i].read = true;
        break;
      }
    }
    setNotification(notifikasi);
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Poppins style={styles.textHeader}>Notifikasi</Poppins>
        <View style={styles.containerNotifBar}>
          {notifikasi ? (
            <FlatList
              refreshControl={
                <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
              }
              data={notifikasi}
              renderItem={renderDataNotification}
              keyExtractor={(_item, index) => index}
              numColumns={1}
              key={1}
              ListFooterComponent={<View style={styles.footerComponent} />}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default Notification;
