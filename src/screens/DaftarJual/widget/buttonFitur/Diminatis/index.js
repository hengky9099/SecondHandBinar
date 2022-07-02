import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {
  IdentityCard,
  ItemNotificationCard,
  Poppins,
  StatusBarCore,
} from '../../../../../component';
import {COLORS} from '../../../../../helpers/colors';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const Products = () => {
  const navigation = useNavigation();

  const dataProduct = [
    {
      id: 1,
      urlImage:
        'https://p-id.ipricegroup.com/uploaded_337182c1d9e1b9ec0eb4f7823e087a9d.jpg?position=11',
      productName: 'Jam Tangan Casio',
      productPrice: 'Rp 250.000',
      typeNotif: 'Penawaran product',
      date: '20 Apr, 14:04',
      tawaran: 'Ditawar Rp 200.000',
    },
    {
      id: 2,
      urlImage:
        'https://p-id.ipricegroup.com/uploaded_337182c1d9e1b9ec0eb4f7823e087a9d.jpg?position=11',
      productName: 'Jam Tangan Casio',
      productPrice: 'Rp 250.000',
      typeNotif: 'Berhasil di terbitkan',
      date: '19 Apr, 12:00',
    },
  ];

  const renderData = ({item}) => (
    <ItemNotificationCard
      urlImage={item.urlImage}
      typeNotif={item.typeNotif}
      date={item.date}
      productName={item.productName}
      productPrice={item.productPrice}
      tawaran={item.tawaran}
    />
  );

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
      <ScrollView
        horizontal={true}
        style={{flexGrow: 0, marginTop: moderateScale(10)}}>
        <View
          style={{
            marginHorizontal: moderateScale(10),
            width: width - moderateScale(230),
            height: moderateScale(44),
            borderRadius: moderateScale(16),
            backgroundColor: COLORS.purple4,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Product')}
            style={{
              paddingVertical: moderateScale(10),
              paddingHorizontal: moderateScale(20),
            }}>
            <Poppins
              type="Medium"
              style={{
                fontSize: moderateScale(17),
                color: COLORS.white,
              }}>
              <Feather name={'box'} size={18} />
              {' Product'}
            </Poppins>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginHorizontal: moderateScale(10),
            width: width - moderateScale(230),
            height: moderateScale(44),
            borderRadius: moderateScale(16),
            backgroundColor: COLORS.purple4,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Diminati')}
            style={{
              paddingVertical: moderateScale(10),
              paddingHorizontal: moderateScale(20),
            }}>
            <Poppins
              type="Medium"
              style={{
                fontSize: moderateScale(17),
                color: COLORS.white,
              }}>
              <Feather name={'heart'} size={18} />
              {' Diminati'}
            </Poppins>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginHorizontal: moderateScale(10),
            width: width - moderateScale(230),
            height: moderateScale(44),
            borderRadius: moderateScale(16),
            backgroundColor: COLORS.purple4,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('DaftarJual')}
            style={{
              paddingVertical: moderateScale(10),
              paddingHorizontal: moderateScale(20),
            }}>
            <Poppins
              type="Medium"
              style={{
                fontSize: moderateScale(17),
                color: COLORS.white,
              }}>
              <Feather name={'dollar-sign'} size={18} />
              {' Terjual'}
            </Poppins>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginHorizontal: moderateScale(10),
            width: width - moderateScale(230),
            height: moderateScale(44),
            borderRadius: moderateScale(16),
            backgroundColor: COLORS.purple4,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Products')}
            style={{
              paddingVertical: moderateScale(10),
              paddingHorizontal: moderateScale(20),
            }}>
            <Poppins
              type="Medium"
              style={{
                fontSize: moderateScale(17),
                color: COLORS.white,
              }}>
              <Feather name={'box'} size={18} />
              {' Products'}
            </Poppins>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginHorizontal: moderateScale(10),
            width: width - moderateScale(230),
            height: moderateScale(44),
            borderRadius: moderateScale(16),
            backgroundColor: COLORS.purple4,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('DaftarJual')}
            style={{
              paddingVertical: moderateScale(10),
              paddingHorizontal: moderateScale(20),
            }}>
            <Poppins
              type="Medium"
              style={{
                fontSize: moderateScale(16),
                color: COLORS.white,
              }}>
              <Feather name={'heart'} size={17} />
              {' Diminatis'}
            </Poppins>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.containerNotifBar}>
        <FlatList renderItem={renderData} data={dataProduct} />
      </View>
    </SafeAreaView>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.white},
  headerDJ: {
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
  },
  textHeaderDJ: {
    fontSize: moderateScale(20),
    color: COLORS.black,
    fontWeight: 'bold',
  },
  containerNotifBar: {
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(10),
  },
});
