// eslint-disable-line react-native/no-inline-styles
import {ScrollView, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {
  IdentityCard,
  InputAdd,
  ItemProductCard,
  Poppins,
  StatusBarCore,
  ButtonFitur,
} from '../../../../../component';
import {COLORS} from '../../../../../helpers/colors';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../../styles';

const Products = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBarCore backgroundColor={COLORS.white} barStyle="dark-content" />
      <View style={styles.headerDJ}>
        <Poppins style={styles.textHeaderDJ}>Daftar Jual Saya</Poppins>
      </View>
      <IdentityCard
        nama="Iqbal"
        kota={'Klaten'}
        urlImage={'https://avatars.githubusercontent.com/u/62233239?v=4'}
        typeIdentity={'Penjual'}
      />
      <ScrollView horizontal={true} style={styles.btnFiturContainer}>
        <View style={styles.btnContainer}>
          <ButtonFitur
            onPressButton={() => navigation.navigate('Product')}
            nameFitur={'Product'}
            nameIcon={'box'}
          />
        </View>

        <View style={styles.btnContainer}>
          <ButtonFitur
            onPressButton={() => navigation.navigate('Diminati')}
            nameFitur={'Diminati'}
            nameIcon={'heart'}
          />
        </View>

        <View style={styles.btnContainer}>
          <ButtonFitur
            onPressButton={() => navigation.navigate('DaftarJual')}
            nameFitur={'Terjual'}
            nameIcon={'dollar-sign'}
          />
        </View>

        <View style={styles.btnContainer}>
          <ButtonFitur
            onPressButton={() => navigation.navigate('DaftarJual')}
            nameFitur={'Products'}
            nameIcon={'box'}
          />
        </View>

        <View style={styles.btnContainer}>
          <ButtonFitur
            onPressButton={() => navigation.navigate('Diminatis')}
            nameFitur={'Diminatis'}
            nameIcon={'heart'}
          />
        </View>
      </ScrollView>
      <View
        style={{
          marginTop: moderateScale(10),
          marginLeft: moderateScale(16),
          borderRadius: moderateScale(4),
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        <InputAdd onPress={() => navigation.navigate('Jual')} />
        <ItemProductCard
          productName={'Smartwatch Sams...'}
          productType={'Aksesoris'}
          productPrice={'Rp 3.550.000'}
          urlImageProduct={
            'https://s3.bukalapak.com/img/37852069262/s-463-463/data.jpeg.webp'
          }
        />
        <ItemProductCard
          productName={'Jam Tangan Casio'}
          productType={'Aksesoris'}
          productPrice={'Rp 250.000'}
          urlImageProduct={
            'https://p-id.ipricegroup.com/uploaded_337182c1d9e1b9ec0eb4f7823e087a9d.jpg?position=11'
          }
        />
      </View>
    </View>
  );
};

export default Products;
