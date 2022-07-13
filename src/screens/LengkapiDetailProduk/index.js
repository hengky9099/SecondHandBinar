import {Image, StyleSheet, View, ScrollView} from 'react-native';
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
import {getCategory, setDataProduct} from './redux/action';
import {useEffect} from 'react';

const Index = ({navigation}) => {
  const dispacth = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([{label: 'Pilih', value: '0'}]);

  const data = {
    namaproduk: '',
    kategori: [],
    deskripsi: '',
    hargaproduk: '',
  };

  const [image, setImage] = useState('');
  const [listImage, setListImage] = useState([]);
  const {dataLogin, dataUser} = useSelector(state => state.login);
  const {dataCategory} = useSelector(state => state.dataProduct);
  const dataProduct = {
    name: data.namaproduk,
    category_ids: data.kategori,
    description: data.deskripsi,
    base_price: data.hargaproduk,
    image: image,
  };

  useEffect(() => {
    dispacth(getCategory);

    // const listCategory = () => {
    //   dataCategory.filter(function (item) {
    //     return setItems([
    //       ...items,
    //       {
    //         label: item.name,
    //         value: item.id,
    //       },
    //     ]);
    //   });
    // };

    // listCategory;
  }, [dispacth]);

  console.log(dataCategory, 'in screen');

  const postDataProduk = async values => {
    try {
      const body = new FormData();
      body.append('name', values.namaproduk);
      body.append('description', values.deskripsi);
      body.append('base_price', values.hargaproduk);
      body.append('category_ids', 1);
      body.append('location', dataUser.city);
      // body.append('image', {
      //   name: image.fileName,
      //   type: image.type,
      //   uri: image.uri,
      // }); //multiple?

      [...listImage].forEach(imageData => {
        const imageName = imageData.path;

        body.append('image', {
          name: imageName,
          type: imageData.mime,
          uri: imageData.uri,
        });
      });

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

      console.log(jsonRes, 'res fecting');
    } catch (error) {
      console.log(error, 'error lengkapi');
    }
  };

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
    namaproduk: Yup.string().required('Nama Produk tidak boleh kosong'),
    kategori: Yup.string().required('Kategori tidak boleh kosong'),
    deskripsi: Yup.string().required('Deskripsi produk tidak boleh kosong'),
    hargaproduk: Yup.string().required('Harga produk tidak boleh kosong'),
  });

  return (
    <Formik validationSchema={validationProfile} initialValues={data}>
      {({handleChange, handleBlur, values, errors, touched}) => {
        return (
          <ScrollView flex={1} style={styles.container}>
            <Header
              headerName={'Lengkapi Detail Produk'}
              onPressBack={() => {
                navigation.goBack();
              }}
            />
            <View style={styles.contentContainer}>
              <Input
                inputName="Nama Produk"
                placeholder="Nama Produk"
                onChangeText={handleChange('namaproduk')}
                onBlur={handleBlur('namaproduk')}
                value={values.namaproduk}
                required={true}
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
                inputName="Harga Produk"
                placeholder="Rp 0,00"
                onChangeText={handleChange('hargaproduk')}
                onBlur={handleBlur('hargaproduk')}
                value={values.hargaproduk}
                required={true}
              />
            </View>

            {touched.hargaproduk && errors.hargaproduk && (
              <Poppins style={styles.errorValidation}>
                {errors.hargaproduk}
              </Poppins>
            )}

            <View style={styles.contentContainer}>
              <View style={styles.toRow}>
                <Poppins style={styles.kategori}>Kategori</Poppins>
                <Poppins style={styles.asterik}>*</Poppins>
              </View>
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
                inputName="Deskripsi"
                placeholder="Deskripsi mengenai produk yang dibuat"
                required={true}
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
              <View style={styles.toRow}>
                <Poppins style={styles.addInputText}>Foto Produk</Poppins>
                <Poppins style={styles.asterik}>*</Poppins>
              </View>
              <View style={styles.toRow}>
                <InputAdd style={styles.addInput} onPress={addProductImage} />
                <Image source={{uri: image.uri}} style={styles.image} />
              </View>
            </View>

            <View style={styles.button}>
              <Button
                onPressButton1={sendDataProduct}
                onPressButton2={() => {
                  postDataProduk(values);
                }}
                numButton={2}
                textButton1={'Preview'}
                textButton2={'Terbitkan'}
              />
            </View>
          </ScrollView>
        );
      }}
    </Formik>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: moderateScale(8),
  },
  deskripsiContainer: {height: moderateScale(100), textAlignVertical: 'top'},
  errorValidation: {
    marginLeft: moderateScale(15),
    color: COLORS.red,
    marginBottom: moderateScale(10),
  },
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
    alignSelf: 'center',
    marginTop: moderateScale(15),
  },
  addInput: {
    marginLeft: moderateScale(16),
  },
  addInputText: {
    marginLeft: moderateScale(5),
    color: COLORS.black,
  },
  contentContainer: {
    marginTop: moderateScale(10),
  },
  image: {
    width: moderateScale(100),
    height: moderateScale(100),
    marginTop: moderateScale(5),
    marginStart: moderateScale(15),
  },
  toRow: {
    flexDirection: 'row',
  },
});
