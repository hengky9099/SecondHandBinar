import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import PreviewCard from '../../component/PreviewCard';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {baseUrl} from '@env';
import {Alert} from 'react-native';
import {setStatusToastPostProduct} from '../LengkapiDetailProduk/redux/action';
import {navigate} from '../../helpers/navigate';

const Preview = () => {
  const dispatch = useDispatch();

  const {dataProduct, image, kategori} = useSelector(
    state => state.dataProduct,
  );
  const {dataLogin, dataUser} = useSelector(state => state.login);
  const [dataSeller, setDataSeller] = useState([]);

  useEffect(() => {
    getDataSeller();
  }, [getDataSeller]);

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

  const btnTerbitkan = async () => {
    try {
      const body = new FormData();
      body.append('name', dataProduct.namaproduk);
      body.append('description', dataProduct.deskripsi);
      body.append('base_price', dataProduct.hargaproduk);
      kategori.forEach(categori => body.append('category_ids', categori.id));
      body.append('location', dataSeller.city);

      const imageName = image[0].path.substring(
        image[0].path.lastIndexOf('/') + 1,
      );

      const imageFile = {
        uri: image[0].path,
        type: image[0].mime,
        name: imageName,
      };
      body.append('image', imageFile);
      console.log('IMAGE FILEE : ', imageFile);
      console.log('BODY : ', body);
      const res = await fetch(
        'https://market-final-project.herokuapp.com/seller/product',
        {
          method: 'POST',
          headers: {
            accept: 'body',
            'Content-Type': 'multipart/form-data',
            access_token: `${dataLogin.access_token}`,
          },
          body: body,
        },
      );
      const jsonRes = await res.json();
      if (jsonRes.name && jsonRes.message) {
        Alert.alert('Pemberitahuan', jsonRes.message);
        // setImage({});

        dispatch(setStatusToastPostProduct('failed'));
        navigate('DaftarJual');
      } else if (
        jsonRes.name === dataProduct.namaproduk &&
        dataUser.phone_number !== 'null' &&
        dataUser.address !== 'null' &&
        dataUser.image !== '' &&
        dataUser.city !== 'null'
      ) {
        dispatch(setStatusToastPostProduct('success'));
        navigate('DaftarJual');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <PreviewCard
        imgData={image[0].path}
        category={kategori
          ?.map(a => a.name)
          .toString()
          .split(',')
          .join(', ')}
        productName={dataProduct.namaproduk}
        price={dataProduct.hargaproduk}
        deskripsi={dataProduct.deskripsi}
        sellerName={dataSeller.full_name}
        sellerAvatar={
          dataSeller.image_url
            ? dataSeller.image_url
            : 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png'
        }
        city={dataSeller.city}
        btnText={'Terbitkan'}
        btnOnPress={() => btnTerbitkan()}
      />
    </SafeAreaView>
  );
};

export default Preview;
