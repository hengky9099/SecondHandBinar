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
      name: image.fileName,
      type: image.type,
    });

    const res = await fetch(
      'https://market-final-project.herokuapp.com/seller/product',
      {
        method: 'POST',
        headers: {
          access_token: `${dataLogin.access_token}`,
          'Content-Type': 'multipart/form-data',
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

// const postDataProduk = async () => {
//   const body = {
//     name: 'asdf',
//     category_ids: [1],
//     description: 'sdfasfd',
//     base_price: 500,
//     image: textToBinary(
//       'https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1654962957757-sepatu.jpg?alt=media',
//     ),
//     location: 'adsf',
//   };
//   console.log(image);
//   try {
//     console.log(body);
//     const res = await axios.post(`${baseUrl}/seller/product`, body, {
//       headers: {access_token: `${dataLogin.access_token}`},
//       validateStatus: status => status < 501,
//     });

//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// };
