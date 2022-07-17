import {
  Alert,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Header,
  IdentityCard,
  ItemNotificationCard,
  Poppins,
} from '../../component';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers/colors';
import axios from 'axios';
import {baseUrl} from '@env';
import {useSelector} from 'react-redux';

const InfoPenawar = ({route}) => {
  const id = route.params.id_order;
  const [data, setData] = useState([]);
  const {dataLogin} = useSelector(state => state.login);
  const [refresh, setRefresh] = useState(false);
  const [btnRight, setBtnRight] = useState('Terima');
  const [btnLeft, setBtnLeft] = useState('Tolak');

  const onRefresh = () => {
    setRefresh(true);
    getDataOrderbyStatus();
    setRefresh(false);
  };

  useEffect(() => {
    btnText();
    getDataOrderbyStatus();
  }, [getDataOrderbyStatus, onPressAccepted, btnText]);

  const getDataOrderbyStatus = useCallback(async () => {
    try {
      const res = await axios.get(`${baseUrl}/seller/order/${id}`, {
        headers: {access_token: `${dataLogin.access_token}`},
      });
      console.log('DATA RES: ', res.data);
      setData(res.data);
      btnText();
    } catch (error) {
      console.log(error);
    }
  }, [dataLogin, id, btnText]);

  const onPressAccepted = useCallback(async () => {
    try {
      const res = await axios.patch(
        `${baseUrl}/seller/order/${id}`,
        {status: ''},
        {
          headers: {access_token: `${dataLogin.access_token}`},
        },
      );
      getDataOrderbyStatus();
      console.log('PATCH : ', res);
    } catch (error) {
      console.log(error);
    }
  }, [dataLogin.access_token, id, getDataOrderbyStatus]);

  const onPressDecline = async () => {
    try {
      const res = await axios.patch(
        `${baseUrl}/seller/order/${id}`,
        {status: 'declined'},
        {
          headers: {access_token: `${dataLogin.access_token}`},
        },
      );
      getDataOrderbyStatus();
      console.log('PATCH : ', res);
    } catch (error) {
      console.log(error);
    }
  };

  const btnText = useCallback(() => {
    if (data.status === 'pending') {
      setBtnLeft('Tolak');
      setBtnRight('Terima');
    }
    if (data.status === 'accepted') {
      setBtnLeft('Status');
      setBtnRight('Hubungi');
    }
    if (data.status === '') {
      setBtnLeft('Status');
      setBtnRight('Hubungi');
    }
  }, [data.status]);

  const onPressBtnStatus = () => {
    Alert.alert('Tes', 'tombol status nih');
  };

  const convertPhoneNumber = num => {
    return num.toString().substring(0);
  };

  const onPressBtnHubungi = () => {
    Linking.openURL(
      `https://api.whatsapp.com/send?phone=62${convertPhoneNumber(
        data.User.phone_number,
      )}`,
    );
  };

  console.log(btnLeft, btnRight);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }>
        <View>
          <Header headerName={'Info Penawar'} />
          <IdentityCard
            urlImage={
              data?.image_url
                ? data?.image_url
                : 'https://avatars.githubusercontent.com/u/62233239?v=4'
            }
            nama={data?.User?.full_name}
            kota={data?.User?.city}
          />
        </View>
        <View>
          <Poppins style={styles.topText}>Daftar Produkmu yang Ditawar</Poppins>
        </View>
        <View flex={1}>
          <View style={styles.card}>
            <TouchableOpacity onPress={() => console.log('Pressed')}>
              <ItemNotificationCard
                button={data?.status}
                seen={true}
                urlImage={data?.Product?.image_url}
                textButton1={btnLeft}
                textButton2={btnRight}
                typeNotif={'Penawaran Produk'}
                productName={data?.product_name}
                productPrice={data?.base_price}
                date={data?.transaction_date}
                tawaran={data?.price}
                status={data?.status}
                onPressButton1={() => {
                  if (btnLeft === 'Status') {
                    onPressBtnStatus();
                  }
                  if (btnLeft === 'Tolak') {
                    onPressDecline();
                  }
                }}
                onPressButton2={() => {
                  if (btnRight === 'Hubungi') {
                    onPressBtnHubungi(data?.id);
                  }
                  if (btnRight === 'Terima') {
                    onPressAccepted(data?.id);
                  }
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InfoPenawar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: COLORS.black,
    marginHorizontal: moderateScale(10),
    marginTop: moderateScale(20),
    marginBottom: moderateScale(10),
  },
  card: {
    marginHorizontal: moderateScale(10),
  },
});
