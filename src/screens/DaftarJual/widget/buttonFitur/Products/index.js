import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {
  IdentityCard,
  InputAdd,
  ItemProductCard,
  Poppins,
  StatusBarCore,
} from '../../../../../component';
import {COLORS} from '../../../../../helpers/colors';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

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
      <ScrollView horizontal={true} style={{flexGrow: 0}}>
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
            onPress={() => navigation.navigate('Diminatis')}
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
});
