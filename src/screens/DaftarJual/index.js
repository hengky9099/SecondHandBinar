import {View, ScrollView, FlatList, SafeAreaView} from 'react-native';
import React from 'react';
import {COLORS} from '../../helpers/colors';
import {
  ButtonFitur,
  IdentityCard,
  Poppins,
  StatusBarCore,
} from '../../component';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';

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
