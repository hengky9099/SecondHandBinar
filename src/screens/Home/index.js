import {StyleSheet, View, Image, ScrollView} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import ItemProductCard from '../../component/ItemProductCard/index';
import {SearchBar, Poppins, ButtonFitur} from '../../component';
import {moderateScale} from 'react-native-size-matters';
import {Box} from '../../assets/Images';
import {COLORS} from '../../helpers/colors';

const Home = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffe9c9', '#ffe9c9', '#ffffff']}
        style={styles.topNav}>
        <View style={styles.topNavContainer}>
          <SearchBar />
          <View style={styles.topNavLeft}>
            <Poppins style={styles.textBR}>Bulan Ramadhan</Poppins>
            <Poppins style={styles.textBD}>Banyak diskon!</Poppins>
            <Poppins style={styles.textDH}>Diskon Hingga</Poppins>
            <Poppins style={styles.textPercent}>60%</Poppins>
          </View>
          <View style={styles.topNavRight}>
            <Image
              source={Box}
              style={styles.topNavRight}
              resizeMode={'cover'}
            />
          </View>
        </View>
      </LinearGradient>
      <View style={styles.categories}>
        <Poppins style={styles.textTK}>Telusuri Kategori</Poppins>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.fitur}>
        <ButtonFitur nameIcon={'search'} nameFitur={'semua'} />
        <ButtonFitur nameIcon={'search'} nameFitur={'Hobi'} />
        <ButtonFitur nameIcon={'search'} nameFitur={'Kendaraan'} />
        <ButtonFitur nameIcon={'box'} nameFitur={'Product'} />
        <ButtonFitur nameIcon={'heart'} nameFitur={'Diminati'} />
        <ButtonFitur nameIcon={'dollar-sign'} nameFitur={'Terjual'} />
      </ScrollView>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <ItemProductCard
          productName={'Jam Tangan Casio'}
          productType={'Aksesoris'}
          productPrice={'Rp 250.000'}
        />
        <ItemProductCard
          productName={'Smartwatch Sams...'}
          productType={'Aksesoris'}
          productPrice={'Rp 3.550.000'}
        />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topNav: {
    height: moderateScale(450),
    width: moderateScale(600),
  },
  topNavContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  topNavLeft: {
    alignContent: 'space-around',
    justifyContent: 'center',
    marginTop: -40,
    height: 200,
  },
  topNavRight: {
    flexDirection: 'column',
    width: moderateScale(130),
    height: moderateScale(123),
    borderRadius: moderateScale(20),
    marginTop: moderateScale(-50),
    marginLeft: moderateScale(100),
  },
  categories: {
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: -200,
  },
  middleNav: {
    flexDirection: 'column',
    height: 160,
    marginHorizontal: 20,
    marginTop: -70,
    alignItems: 'center',
  },
  middleCardNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  textBR: {
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(22),
    marginHorizontal: moderateScale(2),
    marginTop: moderateScale(100),
    color: COLORS.black,
  },
  textBD: {
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(22),
    marginHorizontal: moderateScale(2),
    color: COLORS.black,
  },
  textDH: {
    marginHorizontal: moderateScale(2),
    fontSize: moderateScale(12),
    color: COLORS.black,
    marginTop: moderateScale(10),
  },
  textTK: {
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(16),
    marginHorizontal: moderateScale(2),
    marginTop: moderateScale(40),
    color: COLORS.black,
  },
  textPercent: {
    fontSize: moderateScale(20),
    marginHorizontal: moderateScale(2),
    color: COLORS.pink,
  },
  fitur: {
    marginTop: moderateScale(19),
    marginHorizontal: moderateScale(5),
  },
});
