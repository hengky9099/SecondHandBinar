import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PreviewCard from '../../component/PreviewCard';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {baseUrl} from '@env';

const Preview = () => {
  const imgData = [
    'https://ideas.or.id/wp-content/themes/consultix/images/no-image-found-360x250.png',
  ];

  const {dataLogin} = useSelector(state => state.login);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataSeller, setDataSeller] = useState([]);

  useEffect(() => {
    getDataProduct();
    getDataSeller();
  }, [getDataProduct, getDataSeller]);

  const getDataSeller = useCallback(async () => {
    try {
      console.log(dataLogin);
      const res = await axios.get(`${baseUrl}/auth/user`, {
        headers: {access_token: `${dataLogin.access_token}`},
      });
      setDataSeller(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [dataLogin]);

  const getDataProduct = useCallback(async () => {
    try {
      console.log(dataLogin);
      const res = await axios.get(`${baseUrl}/seller/product/911`, {
        headers: {access_token: `${dataLogin.access_token}`},
      });
      setDataProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [dataLogin]);

  return (
    <SafeAreaView>
      <PreviewCard
        imgData={imgData}
        category={dataProduct?.Categories?.map(a => a.name)
          .toString()
          .split(',')
          .join(', ')}
        productName={dataProduct.name}
        price={dataProduct.base_price}
        deskripsi={dataProduct.description}
        sellerName={dataSeller.full_name}
        sellerAvatar={dataSeller.image_url}
        city={dataSeller.city}
        btnText={'Terbitkan'}
        btnOnPress={() => console.log('Pressed')}
      />
    </SafeAreaView>
  );
};

export default Preview;
