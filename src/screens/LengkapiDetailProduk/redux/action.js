// import {baseUrl} from '@env';
import {DATA_PRODUCT} from './type';

export const postDataProduk = (data, dataLogin, image) => async dispatch => {
  try {
    const formData = new FormData();
    formData.append('name', data.namaproduk);
    formData.append('description', data.deskripsi);
    formData.append('base_price', data.hargaproduk);
    formData.append('category_ids', data.kategori);
    formData.append('location', dataLogin.address);
    formData.append('image', {
      uri: image.uri,
      type: image.type,
    });

    const res = await fetch(
      'https://market-final-project.herokuapp.com/seller/product',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
          access_token: `${dataLogin.access_token}`,
        },
        body: formData,
      },
    );

    const jsonRes = await res.json();

    console.log(jsonRes, 'res fecting');
  } catch (error) {
    console.log(error);
  }
};

export const setDataProduct = payload => {
  return {
    type: DATA_PRODUCT,
    payload,
  };
};
