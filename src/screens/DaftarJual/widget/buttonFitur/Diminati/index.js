import {SafeAreaView, ScrollView, View, Image} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {
  IdentityCard,
  Poppins,
  StatusBarCore,
  ButtonFitur,
} from '../../../../../component';
import {COLORS} from '../../../../../helpers/colors';
import {useNavigation} from '@react-navigation/native';
import {seller} from '../../../../../assets/Images';
import {styles} from '../../../styles';

const Products = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
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
            onPressButton={() => navigation.navigate('DaftarJual')}
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
            onPressButton={() => navigation.navigate('Product')}
            nameFitur={'Products'}
            nameIcon={'box'}
          />
        </View>

        <View style={styles.btnContainer}>
          <ButtonFitur
            onPressButton={() => navigation.navigate('Diminati')}
            nameFitur={'Diminatis'}
            nameIcon={'heart'}
          />
        </View>
      </ScrollView>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <Image
          source={seller}
          style={{
            width: moderateScale(180),
            height: moderateScale(130),
            marginTop: moderateScale(100),
          }}
        />
        <Poppins
          style={{
            textAlign: 'center',
            marginHorizontal: moderateScale(30),
            fontSize: moderateScale(14),
            marginTop: moderateScale(10),
          }}>
          Belum ada produkmu yang diminati nih, sabar ya rejeki nggak kemana kok
        </Poppins>
      </View>
    </SafeAreaView>
  );
};

export default Products;
