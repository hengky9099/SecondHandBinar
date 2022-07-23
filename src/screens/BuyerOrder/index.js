import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PreviewCard from '../../component/PreviewCard';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {baseUrl} from '@env';
import {BottomSheet} from '../../component';
import {useRef} from 'react';
import {currencyToIDR} from '../../helpers/change';
import Toast from 'react-native-toast-message';

const BuyerOrder = () => {
  const imgData = [
    'https://ideas.or.id/wp-content/themes/consultix/images/no-image-found-360x250.png',
  ];

  const refRBSheet = useRef();

  const {dataLogin} = useSelector(state => state.login);
  const [dataOrder, setDataOrder] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [price, setPrice] = useState();

  useEffect(() => {
    getDataProduct();
  }, [getDataProduct]);

  const getDataProduct = useCallback(async () => {
    try {
      console.log(dataLogin);
      const res = await axios.get(`${baseUrl}/buyer/product/${93}`, {
        headers: {access_token: `${dataLogin.access_token}`},
      });
      setDataProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [dataLogin]);

  const onPressTertarik = () => {
    refRBSheet.current.open();
  };

  const postOrder = useCallback(async () => {
    const body = {
      product_id: 26,
      bid_price: price,
    };
    console.log(dataLogin);

    try {
      const res = await axios.post(`${baseUrl}/buyer/order`, body, {
        headers: {
          access_token: `${dataLogin.access_token}`,
        },
      });
      if (res.status <= 201) {
        setDataOrder(res.data);
        refRBSheet.current.close();
        Toast.show({
          type: 'successToast',
          text1: 'Harga Tawaranmu berhasil dikirim ke penjual',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [dataLogin, price]);
  console.log(price);
  console.log(dataOrder);
  return (
    <SafeAreaView>
      <PreviewCard
        imgData={imgData}
        category={dataProduct?.Categories?.map(a => a.name)
          .toString()
          .split(',')
          .join(', ')}
        productName={dataProduct?.name}
        price={currencyToIDR(dataProduct?.base_price)}
        deskripsi={dataProduct?.description}
        sellerName={dataProduct?.User?.full_name}
        sellerAvatar={
          dataProduct?.User?.image_url
            ? dataProduct?.User?.image_url
            : 'https://awsimages.detik.net.id/community/media/visual/2020/08/13/avatar-the-last-airbender.webp?w=700&q=90'
        }
        city={dataProduct?.User?.city}
        btnText={
          dataOrder?.status === 'pending'
            ? 'Menunggu Respon Penjual'
            : 'Saya Tertarik dan ingin Nego'
        }
        btnOnPress={() => onPressTertarik()}
      />

      <BottomSheet
        refBottomSheet={refRBSheet}
        firstText="Masukkan Harga Tawaran Anda"
        secondText="Harga tawaranmu akan diketahui penjual, jika penjual cocok kamu akan segera dihubungi penjual"
        type="tawaran"
        productName={dataProduct?.name}
        productPrice={currencyToIDR(dataProduct?.base_price)}
        urlImageProduct="https://d1n6dbtoa2690v.cloudfront.net/article/61665d5db42c2eaf920a07f8/61665d5db42c2eaf920a07f8_1638417329.jpg"
        onChangeText={newValue => setPrice(parseInt(newValue))}
        onPressButton={postOrder}
      />
    </SafeAreaView>
  );
};

export default BuyerOrder;
