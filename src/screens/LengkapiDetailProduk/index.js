import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button, Header, Input, InputAdd} from '../../component';
import DropDownPicker from 'react-native-dropdown-picker';
import {COLORS} from '../../helpers/colors';
import {moderateScale} from 'react-native-size-matters';
import {launchImageLibrary} from 'react-native-image-picker';

const Index = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Ambon', value: 'ambon'},
    {label: 'Ambon', value: 'ambon'},
    {label: 'Ambon', value: 'ambon'},
    {label: 'Ambon', value: 'ambon'},
  ]);
  const [image, setImage] = useState('');

  const addProductImage = async () => {
    await launchImageLibrary({mediaType: 'photo'}).then(image =>
      setImage(image.assets[0].uri),
    );
  };

  const validationProfile = Yup.object().shape({
    namaproduk: Yup.string().required('Nama tidak boleh kosong'),
    kategori: Yup.string().required('Kota tidak boleh kosong'),
    deskripsi: Yup.string().required('Alamat tidak boleh kosong'),
    hargaproduk: Yup.string().required('No. Handphone tidak boleh kosong'),
  });
  return (
    <Formik
      validationSchema={validationProfile}
      initialValues={{
        namaproduk: '',
        kategori: '',
        deskripsi: '',
        hargaproduk: '',
      }}>
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
                inputName="Nama Produk"
                placeholder="Nama Produk"
                onChangeText={handleChange('namaproduk')}
                onBlur={handleBlur('namaproduk')}
                value={values.namaproduk}
              />
            </View>
            {touched.namaproduk && errors.namaproduk && (
              <Text style={styles.errorValidation}>{errors.namaproduk}</Text>
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
              <Text style={styles.errorValidation}>{errors.hargaproduk}</Text>
            )}

            <View style={styles.contentContainer}>
              <Text style={styles.kategori}>Kategori*</Text>
              <DropDownPicker
                style={styles.dropdownPicker}
                placeholder="Pilih Kategori"
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
              <Text style={styles.errorValidation}>{errors.deskripsi}</Text>
            )}

            <View>
              <Text style={styles.addInputText}>Foto Produk</Text>
              <InputAdd style={styles.addInput} onPress={addProductImage} />
            </View>

            <View style={styles.button}>
              <Button
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
  contentContainer: {
    alignItems: 'center',
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
    left: moderateScale(-135),
  },
  button: {
    marginLeft: moderateScale(10),
    top: moderateScale(630),
    position: 'absolute',
  },
  addInput: {
    marginLeft: moderateScale(16),
  },
  addInputText: {
    marginLeft: moderateScale(18),
    marginBottom: moderateScale(5),
    color: COLORS.black,
  },
});
