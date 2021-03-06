import {
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BottomSheet,
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
import {currencyToIDR, thisDate} from '../../helpers/change';
import {goBack} from '../../helpers/navigate';
import Toast from 'react-native-toast-message';

const InfoPenawar = ({route}) => {
  const id = route.params.id_order;
  const [data, setData] = useState([]);
  const {dataLogin} = useSelector(state => state.login);
  const [refresh, setRefresh] = useState(false);
  const [value, setValue] = useState('');

  const refRBAcceptedSheet = useRef();
  const refRBStatusSheet = useRef();

  const onRefresh = () => {
    setRefresh(true);
    getDataOrderbyStatus();
    setRefresh(false);
  };

  useEffect(() => {
    getDataOrderbyStatus();
  }, [getDataOrderbyStatus, onPressAccepted]);

  const getDataOrderbyStatus = useCallback(async () => {
    try {
      const res = await axios.get(`${baseUrl}/seller/order/${id}`, {
        headers: {access_token: `${dataLogin.access_token}`},
      });
      console.log('DATA RES: ', res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [dataLogin.access_token, id]);

  const onPressAccepted = useCallback(
    async status => {
      try {
        const res = await axios.patch(
          `${baseUrl}/seller/order/${id}`,
          {status: status},
          {
            headers: {access_token: `${dataLogin.access_token}`},
          },
        );
        console.log(res);
        getDataOrderbyStatus();
      } catch (error) {
        console.log(error);
      }
    },
    [id, getDataOrderbyStatus, dataLogin.access_token],
  );

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

  const onPressBtnStatus = () => {
    refRBStatusSheet.current.open();
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

  const onPressButtonBottomSheet = () => {
    if (value === 'accepted') {
      refRBStatusSheet.current.close();
      onPressAccepted('accepted');
      Toast.show({
        type: 'successToast',
        text1: 'Status produk berhasil diperbaharui',
      });
    } else if (value === 'rejected') {
      refRBStatusSheet.current.close();
      onPressDecline();
      Toast.show({
        type: 'successToast',
        text1: 'Status produk berhasil diperbaharui',
      });
    }
  };

  return (
    <>
      {data.id ? (
        <SafeAreaView style={styles.container}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
            }>
            <View>
              <Header
                headerName={'Info Penawar'}
                onPressBack={() => goBack()}
              />
              <IdentityCard
                urlImage={
                  data?.User?.image_url
                    ? data?.User?.image_url
                    : 'https://avatars.githubusercontent.com/u/62233239?v=4'
                }
                nama={data?.User?.full_name}
                kota={data?.User?.city}
              />
            </View>
            <View>
              <Poppins style={styles.topText}>
                Daftar Produkmu yang Ditawar
              </Poppins>
            </View>
            <View flex={1}>
              <View style={styles.card}>
                <TouchableOpacity onPress={() => console.log('Pressed')}>
                  <ItemNotificationCard
                    button={data?.status}
                    seen={true}
                    urlImage={data?.Product?.image_url}
                    textButton1={data.status === 'pending' ? 'Tolak' : 'Status'}
                    textButton2={
                      data.status === 'pending' ? 'Terima' : 'Hubungi'
                    }
                    typeNotif={
                      data.status === 'accepted'
                        ? 'Berhasil terjual'
                        : 'Penawaran Produk'
                    }
                    productName={data?.product_name}
                    productPrice={currencyToIDR(data?.base_price)}
                    date={thisDate(data?.transaction_date)}
                    tawaran={currencyToIDR(data?.price)}
                    status={data?.status}
                    onPressButton1={() => {
                      if (data.status === 'pending') {
                        onPressDecline();
                      } else {
                        onPressBtnStatus();
                      }
                    }}
                    onPressButton2={() => {
                      if (data.status === 'pending') {
                        refRBAcceptedSheet.current.open();
                        onPressAccepted('');
                      } else {
                        onPressBtnHubungi(data?.id);
                      }
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <BottomSheet
            refBottomSheet={refRBStatusSheet}
            firstText="Perbarui status penjualan produkmu"
            type="perbaharuiStatus"
            value={value}
            onValueChange={newValue => setValue(newValue)}
            onPressButton={onPressButtonBottomSheet}
          />
          <BottomSheet
            refBottomSheet={refRBAcceptedSheet}
            firstText="Yeay kamu berhasil mendapat harga yang sesuai"
            secondText="Segera hubungi pembeli melalui whatsapp untuk transaksi selanjutnya"
            type="productMatch"
            productName={data?.product_name}
            productPrice={currencyToIDR(data?.base_price)}
            bargainPrice={currencyToIDR(data?.price)}
            urlImageProduct={data?.Product?.image_url}
            urlImageBuyer={data?.User?.image_url}
            buyerCity={data?.User?.city}
            buyerName={data?.User?.full_name}
            onPressButton={onPressBtnHubungi}
          />
        </SafeAreaView>
      ) : null}
    </>
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
