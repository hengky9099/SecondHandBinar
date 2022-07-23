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
import {COLORS} from '../../helpers/colors';

const BuyerOrder = ({route}) => {
  const refRBSheet = useRef();
  const {id} = route.params;

  const {dataLogin} = useSelector(state => state.login);
  const [dataOrder, setDataOrder] = useState([]);
  const [dataPostOrder, setDataPostOrder] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [price, setPrice] = useState();
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    getDataProduct();
    getOrder();
  }, [getDataProduct, getOrder]);

  const getDataProduct = useCallback(async () => {
    try {
      const res = await axios.get(`${baseUrl}/buyer/product/${id}`, {
        headers: {access_token: `${dataLogin.access_token}`},
      });
      setDataProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [dataLogin, id]);

  const onPressTertarik = () => {
    refRBSheet.current.open();
  };

  const getOrder = useCallback(async () => {
    try {
      const res = await axios.get(`${baseUrl}/buyer/order`, {
        headers: {
          access_token: `${dataLogin.access_token}`,
        },
      });
      setDataOrder(res.data);
      const filter = res.data.filter(item => item.product_id === id);
      setFilter(filter);
    } catch (error) {
      console.log(error);
    }
  }, [dataLogin, id]);

  const postOrder = useCallback(async () => {
    const body = {
      product_id: id,
      bid_price: price,
    };

    try {
      const res = await axios.post(`${baseUrl}/buyer/order`, body, {
        headers: {
          access_token: `${dataLogin.access_token}`,
        },
      });
      if (res.status <= 201) {
        setDataPostOrder(res.data);
        refRBSheet.current.close();
        Toast.show({
          type: 'successToast',
          text1: 'Harga Tawaranmu berhasil dikirim ke penjual',
        });
        getOrder();
      }
    } catch (error) {
      console.log(error);
    }
  }, [dataLogin, price, id, getOrder]);

  return (
    <>
      {dataProduct.id ? (
        <SafeAreaView>
          <PreviewCard
            imgData={dataProduct?.image_url}
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
              filter[0]?.status === 'pending'
                ? 'Menunggu Respon Penjual'
                : 'Saya Tertarik dan ingin Nego'
            }
            btnColor={
              filter[0]?.status === 'pending' ? COLORS.gray : COLORS.purple4
            }
            btnOnPress={() => {
              filter[0]?.status === 'pending' ? null : onPressTertarik();
            }}
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
      ) : null}
    </>
  );
};

export default BuyerOrder;
