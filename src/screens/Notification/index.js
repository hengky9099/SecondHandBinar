import {View, StyleSheet, Alert, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ItemNotificationCard, Poppins} from '../../component';
import {COLORS} from '../../helpers/colors';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../redux/globalAction';
import axios from 'axios';
import {baseUrl} from '@env';
import {setNotification} from './redux/action';
import {navigate} from '../../helpers/navigate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {currencyToIDR, thisDate} from '../../helpers/change';
import {setLogin} from '../Login/redux/action';

const Notification = () => {
  const dispatch = useDispatch();
  const {dataLogin} = useSelector(state => state.login);
  const [notifikasi, setnotifikasi] = useState([]);

  useEffect(() => {
    const getDataNotification = async () => {
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
    };
    getDataNotification();
  }, [dataLogin.access_token, dispatch]);

  const renderDataNotification = ({item}) => (
    <ItemNotificationCard
      typeNotif={item.notification_type}
      date={thisDate(item.updatedAt)}
      productName={item.product_name}
      productPrice={currencyToIDR(item.base_price)}
      tawaran={currencyToIDR(item.bid_price)}
      status={item.status}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Poppins style={styles.textHeader}>Notifikasi</Poppins>
        <View style={styles.containerNotifBar}>
          <FlatList
            keyExtractor={(_item, index) => index}
            data={notifikasi}
            renderItem={renderDataNotification}
          />
        </View>
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
  },
  textHeader: {
    fontSize: moderateScale(25),
    color: COLORS.black,
    fontWeight: 'bold',
  },
  containerNotifBar: {marginTop: moderateScale(10)},
});
