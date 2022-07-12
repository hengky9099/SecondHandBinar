import {
  View,
  ScrollView,
  FlatList,
  Image,
  Alert,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../helpers/colors';
import {
  ButtonFitur,
  IdentityCard,
  InputAdd,
  ItemNotificationCard,
  ItemProductCard,
  Poppins,
  StatusBarCore,
} from '../../component';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import {seller} from '../../assets/Images';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../redux/globalAction';
import axios from 'axios';
import {setOrderSeller, setProductSeller, setRefreshing} from './redux/action';
import {baseUrl} from '@env';
import {setLogin} from '../Login/redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../../helpers/navigate';
import {currencyToIDR, thisDate} from '../../helpers/change';
import {useCallback} from 'react';

const DaftarJual = () => {
  const navigation = useNavigation();
  const [buttonFiturName, setButtonFiturName] = useState('Product');
  const dispatch = useDispatch();
  const {dataLogin} = useSelector(state => state.login);
  const {refreshing} = useSelector(state => state.daftarjual);
  const [orderan, setOrderan] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getDataOrderSeller();
    getDataProductSeller();
  }, [getDataOrderSeller, getDataProductSeller]);

  const getDataOrderSeller = useCallback(async () => {
    //OrderSeller
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`${baseUrl}/seller/order`, {
        headers: {access_token: `${dataLogin.access_token}`},
      });
      setOrderan([...res.data]);
      console.log('Data Order Seller: ', res.data);
      dispatch(setOrderSeller(res.data));
      if (res.status === 200) {
        dispatch(setLoading(false));
        dispatch(setOrderSeller(res.data));
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

  const getDataProductSeller = useCallback(async () => {
    //  ProductSeller
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`${baseUrl}/seller/product`, {
        headers: {access_token: `${dataLogin.access_token}`},
      });
      setProduct([...res.data]);
      console.log('Data Product Seller: ', res.data);
      dispatch(setProductSeller(res.data));
      if (res.status === 200) {
        dispatch(setLoading(false));
        dispatch(setProductSeller(res.data));
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
    dispatch(getDataOrderSeller(dataLogin));
    dispatch(getDataProductSeller(dataLogin));
  };

  const renderHeader = () => {
    return (
      <>
        <StatusBarCore backgroundColor={COLORS.white} barStyle="dark-content" />
        <View style={styles.headerDJ}>
          <Poppins style={styles.textHeaderDJ}>Daftar Jual Saya</Poppins>
        </View>
        <IdentityCard
          nama="Iqbal"
          kota={'Klaten'}
          urlImage={'https://avatars.githubusercontent.com/u/62233239?v=4'}
          typeIdentity={'Penjual'}
        />
        <ScrollView horizontal={true} style={styles.btnFiturContainer}>
          <View style={styles.btnContainer}>
            <ButtonFitur
              onPressButton={() => setButtonFiturName('Product')}
              nameFitur={'Product'}
              nameIcon={'box'}
            />
          </View>

          <View style={styles.btnContainer}>
            <ButtonFitur
              onPressButton={() => setButtonFiturName('Diminati')}
              nameFitur={'Diminati'}
              nameIcon={'heart'}
            />
          </View>

          <View style={styles.btnContainer}>
            <ButtonFitur
              onPressButton={() => setButtonFiturName('DaftarJual')}
              nameFitur={'Terjual'}
              nameIcon={'dollar-sign'}
            />
          </View>

          <View style={styles.btnContainer}>
            <ButtonFitur
              onPressButton={() => setButtonFiturName('Products')}
              nameFitur={'Products'}
              nameIcon={'box'}
            />
          </View>

          <View style={styles.btnContainer}>
            <ButtonFitur
              onPressButton={() => setButtonFiturName('Diminatis')}
              nameFitur={'Diminatis'}
              nameIcon={'heart'}
            />
          </View>
        </ScrollView>
      </>
    );
  };

  const productsView = () => {
    return (
      <FlatList
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        columnWrapperStyle={[
          styles.contentProduct,
          {flexDirection: 'row', flexWrap: 'wrap'},
        ]}
        data={product}
        numColumns={2}
        key={2}
        keyExtractor={(_item, index) => index}
        renderItem={({item, index}) => {
          if (index === 0) {
            return <InputAdd onPress={() => navigation.navigate('Jual')} />;
          }
          return (
            <ItemProductCard
              productPrice={currencyToIDR(item.base_price)}
              urlImageProduct={item.image_url}
              productName={item.name}
              productType={item.categories}
            />
          );
        }}
        ListFooterComponent={<View style={styles.footerComponent} />}
      />
    );
  };

  const productView = () => {
    return (
      <View style={styles.productView}>
        <InputAdd onPress={() => navigation.navigate('Jual')} />
      </View>
    );
  };

  const diminatiView = () => {
    return (
      <View style={styles.wrapDiminati}>
        <Image source={seller} style={styles.imageDiminati} />
        <Poppins style={styles.textDiminati}>
          Belum ada produkmu yang diminati nih, sabar ya rejeki nggak kemana kok
        </Poppins>
      </View>
    );
  };

  const diminatisView = () => {
    return (
      <FlatList
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        contentContainerStyle={styles.contentDiminati}
        key={1}
        keyExtractor={(_item, index) => index}
        data={orderan}
        numColumns={1}
        renderItem={({item, index}) => {
          return (
            <ItemNotificationCard
              urlImage={item.image_url}
              typeNotif={item.status}
              date={thisDate(item.updatedAt)}
              productName={item.product_name}
              productPrice={currencyToIDR(item.base_price)}
              tawaran={currencyToIDR(item.price)}
            />
          );
        }}
        ListFooterComponent={<View style={styles.footerComponent} />}
      />
    );
  };

  const tampilkan = buttonName => {
    if (buttonName === 'Product') {
      return productsView();
    } else if (buttonName === 'Products') {
      return productView();
    } else if (buttonName === 'Diminatis') {
      return diminatiView();
    } else if (buttonName === 'Diminati') {
      return diminatisView();
    }
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <FlatList
        ListHeaderComponent={renderHeader}
        ListHeaderComponentStyle={styles.headerComponent}
      />
      {tampilkan(buttonFiturName)}
    </SafeAreaView>
  );
};

export default DaftarJual;
