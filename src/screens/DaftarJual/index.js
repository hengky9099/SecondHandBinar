import {
  View,
  ScrollView,
  FlatList,
  Image,
  RefreshControl,
  Alert,
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
import {baseUrl} from '@env';
import {navigate} from '../../helpers/navigate';
import {currencyToIDR, thisDate} from '../../helpers/change';
import {useCallback} from 'react';
import Toast from 'react-native-toast-message';
import {setStatusToastPostProduct} from '../LengkapiDetailProduk/redux/action';

const DaftarJual = ({}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [buttonFiturName, setButtonFiturName] = useState('Product');
  const [orderan, setOrderan] = useState([]);
  const [product, setProduct] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const {dataLogin, dataUser} = useSelector(state => state.login);
  const {statusToastPostProduct} = useSelector(state => state.dataProduct);
  const [dataterjual, setDataTerjual] = useState([]);

  useEffect(() => {
    getDataProductSeller();
    getDataOrderSeller();
    // getTerjual();
  }, [getDataOrderSeller, getDataProductSeller]);

  const getDataOrderSeller = useCallback(async () => {
    //OrderSeller
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`${baseUrl}/seller/order`, {
        headers: {access_token: `${dataLogin.access_token}`},
      });
      setOrderan(res.data);
      console.log('Data Order Seller: ', res.data);
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
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
      setProduct(['', ...res.data]);
      const getTerjual = res.data.filter(function (item) {
        return item.status === 'sold';
      });
      setDataTerjual(getTerjual);
      console.log('Data Product Seller: ', res.data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dataLogin, dispatch]);

  const deleteProduct = async id => {
    try {
      const res = await axios.delete(`${baseUrl}/seller/product/${id}`, {
        headers: {access_token: `${dataLogin.access_token}`},
      });
      Alert.alert('Success', res.message);
      getDataProductSeller();
    } catch (error) {
      console.log(error);
    }
  };

  // const getTerjual = () => {
  //   return product.filter(item => item.status === 'sold');
  // };

  // console.log('dataterjual: ', getTerjual());

  const onRefresh = () => {
    setRefresh(true);
    getDataOrderSeller(dataLogin);
    getDataProductSeller(dataLogin);
    setRefresh(false);
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerComponent}>
        <StatusBarCore backgroundColor={COLORS.white} barStyle="dark-content" />
        <View style={styles.headerDJ}>
          <Poppins style={styles.textHeaderDJ}>Daftar Jual Saya</Poppins>
        </View>
        <IdentityCard
          nama={dataUser?.full_name}
          kota={dataUser?.city ? dataUser?.city : 'City'}
          urlImage={
            dataUser?.image_url
              ? dataUser?.image_url
              : 'https://avatars.githubusercontent.com/u/62233239?v=4'
          }
          typeIdentity={'Penjual'}
          onPressButton={() => navigate('Profile')}
        />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.btnFiturContainer}>
          <View style={styles.btnContainer}>
            <ButtonFitur
              onPressButton={() => {
                setButtonFiturName('Product');
              }}
              nameFitur={'Product'}
              nameIcon={'box'}
              clicked={buttonFiturName === 'Product' ? true : false}
            />
          </View>

          <View style={styles.btnContainer}>
            <ButtonFitur
              onPressButton={() => {
                setButtonFiturName('Diminati');
              }}
              nameFitur={'Diminati'}
              nameIcon={'heart'}
              clicked={buttonFiturName === 'Diminati' ? true : false}
            />
          </View>

          <View style={styles.btnContainer}>
            <ButtonFitur
              onPressButton={() => {
                setButtonFiturName('Terjual');
              }}
              nameFitur={'Terjual'}
              clicked={buttonFiturName === 'Terjual' ? true : false}
              nameIcon={'dollar-sign'}
            />
          </View>
        </ScrollView>
      </View>
    );
  };

  const productsView = () => {
    return (
      <FlatList
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refresh} />
        }
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.containerProduct}
        data={product}
        numColumns={2}
        key={2}
        keyExtractor={(item, index) => item.id}
        renderItem={({item, index}) => {
          if (index === 0) {
            return (
              <InputAdd
                style={styles.addButton}
                onPress={() => navigation.navigate('Jual')}
              />
            );
          }
          return (
            <ItemProductCard
              productPrice={currencyToIDR(item.base_price)}
              url={item.image_url}
              productName={item.name}
              productType={item?.Categories?.map(a => a.name)
                .toString()
                .split(',')
                .join(', ')}
              onPressCard={() =>
                Alert.alert('Hold on!', `Do you want to delete ${item.name}?`, [
                  {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                  },
                  {text: 'YES', onPress: () => deleteProduct(item.id)},
                ])
              }
            />
          );
        }}
        ListFooterComponent={<View style={styles.footerComponent} />}
      />
    );
  };

  const emptyTerjualView = () => {
    return (
      <View style={styles.wrapDiminati}>
        <Image source={seller} style={styles.imageDiminati} />
        <Poppins style={styles.textDiminati}>
          Belum ada produkmu yang terjual nih, sabar ya rejeki nggak kemana kok
        </Poppins>
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
          <RefreshControl onRefresh={onRefresh} refreshing={refresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentDiminati}
        key={1}
        keyExtractor={(_item, index) => index}
        data={orderan}
        numColumns={1}
        ListEmptyComponent={diminatiView}
        renderItem={({item, index}) => {
          return (
            <ItemNotificationCard
              urlImage={item.image_product}
              date={thisDate(item.transaction_date)}
              productName={item.product_name}
              productPrice={currencyToIDR(item.base_price)}
              tawaran={currencyToIDR(item.price)}
              onPress={() =>
                navigation.navigate('InfoPenawar', {id_order: item.id})
              }
            />
          );
        }}
      />
    );
  };

  const terjual = () => {
    return (
      <FlatList
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentDiminati}
        key={1}
        keyExtractor={(_item, index) => index}
        data={dataterjual}
        ListEmptyComponent={emptyTerjualView}
        numColumns={1}
        renderItem={({item, index}) => {
          return (
            <ItemNotificationCard
              urlImage={item.image_url}
              date={thisDate(item.updatedAt)}
              productName={item.name}
              productPrice={currencyToIDR(item.base_price)}
              status={item.status}
            />
          );
        }}
      />
    );
  };

  const tampilkan = buttonName => {
    if (buttonName === 'Product') {
      return productsView();
    } else if (buttonName === 'Diminati') {
      return diminatisView();
    } else if (buttonName === 'Terjual') {
      return terjual();
    }
  };

  const showToast = status => {
    if (status === 'success') {
      dispatch(setStatusToastPostProduct(''));
      getDataProductSeller();
      return Toast.show({
        type: 'successToast',
        text1: 'Produk berhasil diterbitkan.',
      });
    } else if (status === 'failed') {
      dispatch(setStatusToastPostProduct(''));
      return Toast.show({
        type: 'errorToast',
        text1: 'Produk gagal untuk diterbitkan',
      });
    } else {
      return null;
    }
  };
  console.log('Data terjual: ', dataterjual);
  return (
    <SafeAreaView style={[styles.container]}>
      {showToast(statusToastPostProduct)}
      {renderHeader()}
      {tampilkan(buttonFiturName)}
    </SafeAreaView>
  );
};

export default DaftarJual;
