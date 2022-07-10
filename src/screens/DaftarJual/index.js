import {
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
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
import {moderateScale} from 'react-native-size-matters';
import {seller} from '../../assets/Images';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../redux/globalAction';
import axios from 'axios';
import {setOrderSeller, setProductSeller} from './redux/action';
import {baseUrl} from '@env';
import {setLogin} from '../Login/redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../../helpers/navigate';
import {currencyToIDR, thisDate} from '../../helpers/change';

const DaftarJual = () => {
  const navigation = useNavigation();
  const [buttonFiturName, setButtonFiturName] = useState('Product');
  const dispatch = useDispatch();
  const {dataLogin} = useSelector(state => state.login);
  const [orderan, setOrderan] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getDataOrderSeller(dataLogin.access_token);
    getDataProductSeller(dataLogin.access_token);
  }, [getDataOrderSeller, getDataProductSeller]);

  const getDataOrderSeller = async () => {
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
  };

  const getDataProductSeller = async () => {
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
  };

  const renderDataOrderSeller = ({item}) => (
    <ItemNotificationCard
      urlImage={item.image_url}
      typeNotif={item.status}
      date={thisDate(item.updatedAt)}
      productName={item.product_name}
      productPrice={currencyToIDR(item.base_price)}
      tawaran={currencyToIDR(item.price)}
    />
  );

  const renderDataProduct = ({item}) => (
    <ItemProductCard
      productPrice={currencyToIDR(item.base_price)}
      urlImageProduct={item.image_url}
      productName={item.name}
      productType={'Aksesoris'}
    />
  );
  const renderHeader = () => {
    return (
      <View>
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
      </View>
    );
  };

  const productsView = () => {
    return (
      <View
        style={{
          marginLeft: moderateScale(16),
          borderRadius: moderateScale(4),
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginBottom: moderateScale(60),
        }}>
        {/* <InputAdd onPress={() => navigation.navigate('Jual')} /> */}
        <FlatList
          keyExtractor={(_item, index) => index}
          renderItem={renderDataProduct}
          data={product}
          numColumns={2}
        />
      </View>
    );
  };

  const productView = () => {
    return (
      <View
        style={{
          marginTop: moderateScale(10),
          marginLeft: moderateScale(16),
          borderRadius: moderateScale(4),
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginBottom: moderateScale(300),
        }}>
        <InputAdd onPress={() => navigation.navigate('Jual')} />
      </View>
    );
  };

  const diminatiView = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          marginBottom: moderateScale(200),
        }}>
        <Image
          source={seller}
          style={{
            width: moderateScale(180),
            height: moderateScale(130),
            marginTop: moderateScale(100),
          }}
        />
        <Poppins
          style={{
            textAlign: 'center',
            marginHorizontal: moderateScale(30),
            fontSize: moderateScale(14),
            marginTop: moderateScale(10),
          }}>
          Belum ada produkmu yang diminati nih, sabar ya rejeki nggak kemana kok
        </Poppins>
      </View>
    );
  };

  const diminatisView = () => {
    return (
      <View
        style={{
          marginHorizontal: moderateScale(20),
          marginBottom: moderateScale(150),
        }}>
        <FlatList
          keyExtractor={(_item, index) => index}
          renderItem={renderDataOrderSeller}
          data={orderan}
        />
      </View>
    );
  };

  const tampilkan = buttonName => {
    if (buttonName === 'Products') {
      return productsView();
    } else if (buttonName === 'Product') {
      return productView();
    } else if (buttonName === 'Diminati') {
      return diminatiView();
    } else if (buttonName === 'Diminatis') {
      return diminatisView();
    }
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
      />
      {tampilkan(buttonFiturName)}
    </SafeAreaView>
  );
};

export default DaftarJual;
