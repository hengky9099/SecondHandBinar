/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../assets/Images/gift.png';
import ItemProductCard from '../../component/ItemProductCard/index';
import {SearchBar, Categories} from '../../component';

const Home = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#D3D9FD'} barStyle={'dark-content'} />
      <LinearGradient
        colors={['#ffe9c9', '#ffe9c9', '#ffffff']}
        style={styles.topNav}>
        <View style={styles.topNavContainer}>
          <SearchBar />
          <View style={styles.topNavLeft}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 20,
                marginHorizontal: 16,
                marginTop: 65,
                height: 40,
                color: 'black',
              }}>
              Bulan Ramadhan
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 20,
                marginHorizontal: 16,
                height: 40,
                color: 'black',
              }}>
              Banyak diskon!
            </Text>
            <Text
              style={{
                fontWeight: 'regular',
                marginHorizontal: 16,
                fontSize: 14,
                color: 'black',
              }}>
              Diskon Hingga
            </Text>
            <Text
              style={{
                fontWeight: 'regular',
                marginHorizontal: 16,
                fontSize: 20,
                color: '#FA2C5A',
              }}>
              60%
            </Text>
          </View>
          <View style={styles.topNavRight}>
            <Image
              source={Images}
              style={styles.topNavRight}
              resizeMode={'cover'}
            />
          </View>
        </View>
      </LinearGradient>
      <View style={styles.categories}>
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 16,
            marginHorizontal: 16,
            marginTop: 40,
            height: 20,
            color: 'black',
          }}>
          Telusuri Kategori
        </Text>
      </View>
      <View style={styles.middleCardNav}>
        <Categories />
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}>
        <ItemProductCard />
        <ItemProductCard />
        <ItemProductCard />
        <ItemProductCard />
        <ItemProductCard />
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
    height: 450,
    width: 600,
  },
  topNavContainer: {
    //justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  topNavLeft: {
    alignContent: 'space-around',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    marginTop: -40,
    height: 200,
  },
  topNavRight: {
    flexDirection: 'column',
    width: 130,
    height: 123,
    borderRadius: 20,
    marginHorizontal: 105,
    marginTop: -60,
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
  scroll: {
    marginHorizontal: 20,
    marginVertical: 20,
    marginBottom: 55,
    // backgroundColor: 'black',
  },
});
