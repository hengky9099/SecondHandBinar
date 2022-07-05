// eslint-disable-line react-native/no-inline-styles
import {SafeAreaView, ScrollView, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {
  IdentityCard,
  InputAdd,
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
            onPressButton={() => navigation.navigate('DaftarJual')}
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
            onPressButton={() => navigation.navigate('Products')}
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
      </View>
    </SafeAreaView>
  );
};

export default Products;
