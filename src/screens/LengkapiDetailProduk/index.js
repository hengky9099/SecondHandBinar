import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button, Header, Input, InputAdd, Poppins} from '../../component';
import DropDownPicker from 'react-native-dropdown-picker';
import {COLORS} from '../../helpers/colors';
import {moderateScale} from 'react-native-size-matters';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {navigate} from '../../helpers/navigate';
import {setDataProduct} from './redux/action';

const Index = ({navigation}) => {
  const dispacth = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    {label: 'Tas', value: '1'},
    {label: 'Sepatu', value: '2'},
    {label: 'Sandal', value: '3'},
    {label: 'Baju', value: '4'},
  ]);

  const [data] = useState({
    namaproduk: '',
    kategori: [],
    deskripsi: '',
    hargaproduk: '',
  });

  const [image, setImage] = useState('');
  const {dataLogin} = useSelector(state => state.login);
  const dataProduct = {
    name: data.namaproduk,
    category_ids: data.kategori,
    description: data.deskripsi,
    base_price: data.hargaproduk,
    location: dataLogin.location,
    image: image,
  };

  const postDataProduk = async () => {
    try {
      const body = new FormData();
      body.append('name', data.namaproduk);
      body.append('description', data.deskripsi);
      body.append('base_price', data.hargaproduk);
      body.append('category_ids', data.kategori);
      body.append('location', 'dataLogin.address'); //ganti jd data user nanti
      body.append('image', {
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
          body: body,
        },
      );

      const jsonRes = await res.json();

      console.log(jsonRes, 'res fecting');
    } catch (error) {
      console.log(error, 'error lengkapi');
    }
  };

  // const postDataProduct = () => {
  //   postDataProduk();
  // };

  const sendDataProduct = () => {
    dispacth(setDataProduct(dataProduct));
    navigate('Preview');
  };

  const addProductImage = async () => {
    await launchImageLibrary({mediaType: 'photo'}).then(dataImage =>
      setImage(dataImage.assets[0]),
    );
  };

  const validationProfile = Yup.object().shape({
    namaproduk: Yup.string().required('Nama tidak boleh kosong'),
    kategori: Yup.string().required('Kota tidak boleh kosong'),
    deskripsi: Yup.string().required('Alamat tidak boleh kosong'),
    hargaproduk: Yup.string().required('No. Handphone tidak boleh kosong'),
  });

  return (
    <Formik validationSchema={validationProfile} initialValues={data}>
      {({handleChange, handleBlur, values, errors, touched}) => {
        return (
          <View flex={1} style={styles.container}>
            <Header
              headerName={'Lengkapi Detail Produk'}
              onPressBack={() => {
                navigation.goBack();
              }}
            />
            <View style={styles.contentContainer}>
              <Input
                inputName="Nama Produk*"
                placeholder="Nama Produk"
                onChangeText={handleChange('namaproduk')}
                onBlur={handleBlur('namaproduk')}
                value={values.namaproduk}
              />
            </View>
            {touched.namaproduk && errors.namaproduk && (
              <Poppins style={styles.errorValidation}>
                {errors.namaproduk}
              </Poppins>
            )}

            <View style={styles.contentContainer}>
              <Input
                keyboardType={'numeric'}
                inputName="Harga Produk*"
                placeholder="Rp 0,00"
                onChangeText={handleChange('hargaproduk')}
                onBlur={handleBlur('hargaproduk')}
                value={values.hargaproduk}
              />
            </View>

            {touched.hargaproduk && errors.hargaproduk && (
              <Poppins style={styles.errorValidation}>
                {errors.hargaproduk}
              </Poppins>
            )}

            <View style={styles.contentContainer}>
              <Poppins style={styles.kategori}>Kategori*</Poppins>
              <DropDownPicker
                style={styles.dropdownPicker}
                placeholder="Pilih Kategori"
                multiple={true}
                min={0}
                max={5}
                dropDownDirection="BOTTOM"
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />
            </View>
            <View style={styles.contentContainer}>
              <Input
                inputName="Deskripsi*"
                placeholder="Contoh: Jalan Hiu 33"
                multiline={true}
                numberOfLines={4}
                styleInput={styles.deskripsiContainer}
                onChangeText={handleChange('deskripsi')}
                onBlur={handleBlur('deskripsi')}
                value={values.deskripsi}
              />
            </View>

            {touched.deskripsi && errors.deskripsi && (
              <Poppins style={styles.errorValidation}>
                {errors.deskripsi}
              </Poppins>
            )}

            <View>
              <Poppins style={styles.addInputText}>Foto Produk</Poppins>
              <InputAdd style={styles.addInput} onPress={addProductImage} />
            </View>

            <View style={styles.button}>
              <Button
                onPressButton1={sendDataProduct}
                onPressButton2={postDataProduk}
                numButton={2}
                textButton1={'Preview'}
                textButton2={'Terbitkan'}
              />
            </View>
          </View>
        );
      }}
    </Formik>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  deskripsiContainer: {height: moderateScale(100), textAlignVertical: 'top'},
  errorValidation: {
    marginLeft: moderateScale(15),
    color: 'red',
    marginBottom: moderateScale(10),
  },
  contentContainer: {},
  dropdownPicker: {
    width: moderateScale(325),
    marginLeft: moderateScale(15),
    backgroundColor: COLORS.white,
    borderColor: COLORS.neutral2,
    borderRadius: moderateScale(10),
  },
  kategori: {
    color: COLORS.black,
    marginStart: moderateScale(5),
  },
  button: {
    marginTop: moderateScale(10),
  },
  addInput: {
    marginLeft: moderateScale(16),
  },
  addInputText: {
    marginLeft: moderateScale(5),
    color: COLORS.black,
  },
});
