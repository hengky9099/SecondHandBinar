import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../helpers/colors';
import {moderateScale} from 'react-native-size-matters';
import {IdentityCard, Poppins, StatusBarCore} from '../../component';

import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const DaftarJual = () => {
  const navigation = useNavigation();

  const renderHeader = () => {
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
        <ScrollView horizontal={true}>
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
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
};

export default DaftarJual;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
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
