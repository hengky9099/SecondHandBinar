import {Image, StyleSheet, View, ScrollView, Alert} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button, Header, Input, InputAdd, Poppins} from '../../component';
import DropDownPicker from 'react-native-dropdown-picker';
import {COLORS} from '../../helpers/colors';
import {moderateScale} from 'react-native-size-matters';
// import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {navigate} from '../../helpers/navigate';
import {setDataProduct, setStatusToastPostProduct} from './redux/action';
import Toast from 'react-native-toast-message';
import {setLoading} from '../../redux/globalAction';
import LoadingBar from '../../component/LoadingBar';
import ImagePicker from 'react-native-image-crop-picker';

const Index = ({navigation}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  // const [image, setImage] = useState({});
  const [listImage, setListImage] = useState([]);
  const {dataLogin, dataUser} = useSelector(state => state.login);
  const {dataCategory} = useSelector(state => state.home);
  const {loading} = useSelector(state => state.global);
  const [items, setItems] = useState(dataCategory);
  const kategori = [];

  const getProductCategories = () => {
    dataCategory.filter(function (item) {
      if (value.length >= 1) {
        [...value].forEach(category => {
          if (category === item.id) {
            return kategori.push({
              id: category,
              name: item.name,
            });
          }
        });
      } else {
        return kategori.push({
          id: null,
          name: null,
        });
      }
    });
  };

  const postDataProduk = async values => {
    getProductCategories();

    try {
      dispatch(setLoading(true));
      const body = new FormData();
      body.append('name', values.namaproduk);
      body.append('description', values.deskripsi);
      body.append('base_price', values.hargaproduk);
      value.forEach(categori => body.append('category_ids', categori));
      body.append('location', dataUser.city);

      listImage.forEach(element => {
        const imageName = element.path.substring(
          element.path.lastIndexOf('/') + 1,
        );

        const imageFile = {
          uri: element.path,
          type: element.mime,
          name: imageName,
        };
        body.append('image', imageFile);
      });

      console.log('BODY : ', body);
      //multiple image but cant send to api => output {}
      // listImage.forEach(imageData => {
      //   const imageName = imageData.path.substring(
      //     imageData.path.lastIndexOf('/') + 1,
      //   );

      //   body.append('image', {
      //     name: imageName,
      //     type: imageData.mime,
      //     uri: imageData.path,
      //   });
      // });

      if (
        dataUser.phone_number === 'null' ||
        dataUser.address === 'null' ||
        dataUser.image === '' ||
        dataUser.city === 'null'
      ) {
        dispatch(setLoading(false));
        setListImage({});
        Alert.alert('Pemberitahuan', 'Tolong Lengkapi Profile Anda.');
        navigate('Profile');
      } else {
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
          setListImage({});
          dispatch(setStatusToastPostProduct('failed'));
          navigate('DaftarJual');
          dispatch(setLoading(false));
        } else if (
          jsonRes.name === values.namaproduk &&
          dataUser.phone_number !== 'null' &&
          dataUser.address !== 'null' &&
          dataUser.image !== '' &&
          dataUser.city !== 'null'
        ) {
          // setImage({});
          dispatch(setLoading(false));
          setListImage({});
          dispatch(setStatusToastPostProduct('success'));
          navigate('DaftarJual');
        }
      }
    } catch (error) {
      console.log(error, 'error lengkapi');
      while (kategori.length > 0) {
        kategori.pop();
      }
      Toast.show({
        type: 'errorToast',
        text1: 'Silahkan cek kembali form Anda!',
      });
      if (error === 'TypeError: Network request failed') {
        Alert.alert('Pemberitahuan', 'Salah isian cek kembali isian Anda!');
      }
      dispatch(setLoading(false));
    }
  };

  const sendDataProduct = (values, dataImg) => {
    getProductCategories();
    dispatch(setDataProduct(values, dataImg, kategori));
    navigate('Preview');
  };

  // const addProductImage = async () => {
  //   await launchImageLibrary({mediaType: 'photo'}).then(dataImage =>
  //     setImage(dataImage.assets[0]),
  //   );

  //multiple picker image

  const addProductImage = async () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then(images => {
      console.log(images);
      setListImage(images);
    });
  };

  // ImagePicker.openPicker({
  //   multiple: true,
  // }).then(images => {
  //   console.log(images);
  //   setListImage(images);
  // });

  const validationProfile = Yup.object().shape({
    namaproduk: Yup.string().required('Nama Produk tidak boleh kosong'),
    deskripsi: Yup.string().required('Deskripsi produk tidak boleh kosong'),
    hargaproduk: Yup.string().required('Harga produk tidak boleh kosong'),
  });

  return (
    <Formik
      validationSchema={validationProfile}
      initialValues={{
        namaproduk: '',
        deskripsi: '',
        hargaproduk: '',
      }}
      onSubmit={(values, {resetForm}) => {
        postDataProduk(values);
        while (kategori.length > 0) {
          kategori.pop();
        }
        setValue([]);
        resetForm();
      }}>
      {({handleChange, handleBlur, values, errors, touched, handleSubmit}) => {
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
              <View style={styles.categoryContainer}>
                <DropDownPicker
                  style={styles.dropdownPicker}
                  schema={{
                    label: 'name',
                    value: 'id',
                  }}
                  placeholder="Pilih Kategori"
                  searchable={true}
                  searchPlaceholder="Cari..."
                  multiple={true}
                  mode="BADGE"
                  badgeDotColors={[
                    COLORS.purple5,
                    COLORS.cream5,
                    COLORS.neutral5,
                  ]}
                  badgeColors={[COLORS.purple2, COLORS.cream2, COLORS.neutral1]}
                  listMode="SCROLLVIEW"
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

            <View style={styles.contentContainer}>
              <View style={styles.toRow}>
                <Poppins style={styles.addInputText}>Foto Produk</Poppins>
                <Poppins style={styles.asterik}>*</Poppins>
              </View>
              <View style={styles.toRow}>
                {listImage[0]?.path ? (
                  <Image
                    source={{uri: listImage[0]?.path}}
                    style={styles.image}
                  />
                ) : (
                  <InputAdd style={styles.addInput} onPress={addProductImage} />
                )}
              </View>
            </View>

            <View style={styles.button}>
              {loading ? (
                <LoadingBar loading={loading} />
              ) : (
                <Button
                  onPressButton1={() => {
                    // sendDataProduct(values, image);
                    sendDataProduct(values, listImage);
                  }}
                  onPressButton2={() => {
                    handleSubmit();
                  }}
                  numButton={2}
                  textButton1={'Preview'}
                  textButton2={'Terbitkan'}
                />
              )}
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
    color: COLORS.red,
    marginHorizontal: moderateScale(18),
  },
  dropdownPicker: {
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
    marginVertical: moderateScale(15),
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
  categoryContainer: {
    marginHorizontal: moderateScale(18),
  },
  asterik: {
    color: COLORS.red,
  },
});
