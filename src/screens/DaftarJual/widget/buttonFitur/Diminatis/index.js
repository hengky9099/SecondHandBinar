import {FlatList, SafeAreaView, ScrollView, View} from 'react-native';
import React from 'react';
import {
  IdentityCard,
  ItemNotificationCard,
  Poppins,
  StatusBarCore,
  ButtonFitur,
} from '../../../../../component';
import {COLORS} from '../../../../../helpers/colors';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../../styles';
import {moderateScale} from 'react-native-size-matters';

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
            onPressButton={() => navigation.navigate('Product')}
            nameFitur={'Products'}
            nameIcon={'box'}
          />
        </View>

        <View style={styles.btnContainer}>
          <ButtonFitur
            onPressButton={() => navigation.navigate('DaftarJual')}
            nameFitur={'Diminatis'}
            nameIcon={'heart'}
          />
        </View>
      </ScrollView>
      <View
        style={{
          marginTop: moderateScale(10),
          marginHorizontal: moderateScale(20),
        }}>
        <FlatList renderItem={renderData} data={dataProduct} />
      </View>
    </SafeAreaView>
  );
};

export default Products;
