import {View, ScrollView, FlatList, SafeAreaView, Image} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../helpers/colors';
import {
  ButtonFitur,
  IdentityCard,
  InputAdd,
  ItemNotificationCard,
  ItemProductCard,
  Poppins,
  StatusBarCore,
} from '../../component';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import {moderateScale} from 'react-native-size-matters';
import {seller} from '../../assets/Images';

const DaftarJual = () => {
  const navigation = useNavigation();
  const [buttonFiturName, setButtonFiturName] = useState('Product');

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
              onPressButton={() => setButtonFiturName('Product')}
              nameFitur={'Product'}
              nameIcon={'box'}
            />
          </View>

          <View style={styles.btnContainer}>
            <ButtonFitur
              onPressButton={() => setButtonFiturName('Diminati')}
              nameFitur={'Diminati'}
              nameIcon={'heart'}
            />
          </View>

          <View style={styles.btnContainer}>
            <ButtonFitur
              onPressButton={() => setButtonFiturName('DaftarJual')}
              nameFitur={'Terjual'}
              nameIcon={'dollar-sign'}
            />
          </View>

          <View style={styles.btnContainer}>
            <ButtonFitur
              onPressButton={() => setButtonFiturName('Products')}
              nameFitur={'Products'}
              nameIcon={'box'}
            />
          </View>

          <View style={styles.btnContainer}>
            <ButtonFitur
              onPressButton={() => setButtonFiturName('Diminatis')}
              nameFitur={'Diminatis'}
              nameIcon={'heart'}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  const productsView = () => {
    return (
      <View
        style={{
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
    );
  };

  const productView = () => {
    return (
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
    );
  };

  const diminatiView = () => {
    return (
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
    );
  };

  const diminatisView = () => {
    return (
      <View
        style={{
          marginTop: moderateScale(10),
          marginHorizontal: moderateScale(20),
        }}>
        <FlatList renderItem={renderData} data={dataProduct} />
      </View>
    );
  };

  const tampilkan = buttonName => {
    if (buttonName === 'Products') {
      return productsView();
    } else if (buttonName === 'Product') {
      return productView();
    } else if (buttonName === 'Diminati') {
      return diminatiView();
    } else if (buttonName === 'Diminatis') {
      return diminatisView();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
      />
      {tampilkan(buttonFiturName)}
    </View>
  );
};

export default DaftarJual;
