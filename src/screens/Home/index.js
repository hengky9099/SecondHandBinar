import {
  StyleSheet,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  SearchBar,
  Poppins,
  ButtonFitur,
  ItemProductCard,
} from '../../component';
import {moderateScale} from 'react-native-size-matters';
import {Box} from '../../assets/Images';
import {COLORS} from '../../helpers/colors';
import {getProduct} from './redux/action';
import {useSelector, useDispatch} from 'react-redux';

export default function Home({navigation}) {
  const dispatch = useDispatch();
  const {products, lengthProducts} = useSelector(state => state.home);
  const [end, setEnd] = useState(16);
  const [dataProducts, setDataProducts] = useState('dataAllProduct');

  const produkHobi = products.filter(function (item) {
    return item?.Categories[0]?.name === 'Hobi dan Koleksi';
  });

  const produkKendaraan = products.filter(function (item) {
    return item?.Categories[0]?.name === 'Otomotif';
  });

  useEffect(() => {
    const getAllProduct = () => dispatch(getProduct());
    getAllProduct();
  }, [dispatch]);

  const renderHeader = () => (
    <View>
      <LinearGradient
        colors={['#ffe9c9', '#ffe9c9', '#ffffff']}
        style={styles.topNav}>
        <View style={styles.topNavContainer}>
          <SearchBar
            style={styles.searchBar}
            placeholder="Cari di Second chance"
            inputStyle={styles.inputStyle}
          />
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
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.fitur}>
          <ButtonFitur
            nameIcon={'search'}
            nameFitur={'Semua'}
            onPressButton={() => setDataProducts('dataAllProduct')}
          />
          <ButtonFitur
            nameIcon={'search'}
            nameFitur={'Hobi'}
            onPressButton={() => setDataProducts('dataProductHobi')}
          />
          <ButtonFitur
            nameIcon={'search'}
            nameFitur={'Kendaraan'}
            onPressButton={() => setDataProducts('dataProductKendaraan')}
          />
          <ButtonFitur nameIcon={'box'} nameFitur={'Product'} />
          <ButtonFitur nameIcon={'heart'} nameFitur={'Diminati'} />
          <ButtonFitur nameIcon={'dollar-sign'} nameFitur={'Terjual'} />
        </ScrollView>
      </View>
    </View>
  );

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemProduct}>
        <ItemProductCard
          productName={item?.name ? item.name : 'Nama Produk'}
          productType={
            item?.Categories[0]?.name ? item?.Categories[0]?.name : 'Kategori'
          }
          productPrice={item?.base_price ? item?.base_price : 'Rp. 0'}
          url={item?.image_url}
          onPressCard={() =>
            navigation.navigate('DetailProductScreen', {id_product: item.id})
          }
        />
      </View>
    );
  };

  const renderFooter = data => {
    const tmp = end;
    if (data === 'dataAllProduct') {
      if (end < lengthProducts) {
        return (
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => {
                setEnd(tmp + 10);
              }}
              style={styles.loadMoreBtn}>
              <Poppins style={styles.btnText}>Load More</Poppins>
            </TouchableOpacity>
          </View>
        );
      } else if (end > lengthProducts || end === lengthProducts) {
        return (
          <View style={styles.footer}>
            <Poppins style={styles.text}>No More Data</Poppins>
          </View>
        );
      }
    } else if (data === 'dataProductHobi') {
      if (end < produkHobi.length) {
        return (
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => {
                setEnd(tmp + 10);
              }}
              style={styles.loadMoreBtn}>
              <Poppins style={styles.btnText}>Load More</Poppins>
            </TouchableOpacity>
          </View>
        );
      } else if (end > produkHobi.length || end === produkHobi.length) {
        return (
          <View style={styles.footer}>
            <Poppins style={styles.text}>No More Data</Poppins>
          </View>
        );
      }
    } else if (data === 'dataProductKendaraan') {
      if (end < produkKendaraan.length) {
        return (
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => {
                setEnd(tmp + 10);
              }}
              style={styles.loadMoreBtn}>
              <Poppins style={styles.btnText}>Load More</Poppins>
            </TouchableOpacity>
          </View>
        );
      } else if (
        end > produkKendaraan.length ||
        end === produkKendaraan.length
      ) {
        return (
          <View style={styles.footer}>
            <Poppins style={styles.text}>No More Data</Poppins>
          </View>
        );
      }
    }
  };

  const list = data => {
    if (data === 'dataAllProduct') {
      return products.slice(0, end);
    } else if (data === 'dataProductHobi') {
      return produkHobi.slice(0, end);
    } else if (data === 'dataProductKendaraan') {
      return produkKendaraan.slice(0, end);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={list(dataProducts)}
        horizontal={false}
        keyExtractor={(_item, index) => index}
        renderItem={renderItem}
        ListFooterComponent={renderFooter(dataProducts)}
      />
    </View>
  );
}

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
  ter: {
    margin: moderateScale(15),
    alignSelf: 'center',
  },
  loadMoreBtn: {
    padding: moderateScale(13),
    backgroundColor: COLORS.purple5,
    borderRadius: moderateScale(5),
    marginHorizontal: moderateScale(50),
    alignItems: 'center',
    marginVertical: moderateScale(20),
  },
  btnText: {
    color: COLORS.white,
    fontSize: moderateScale(15),
  },
  text: {
    color: COLORS.black,
    alignSelf: 'center',
    margin: moderateScale(10),
    fontSize: moderateScale(18),
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
  cardWrapper: {
    marginTop: 10,
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 16,
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
  inputStyle: {
    size: 12,
  },
  itemProduct: {
    margin: moderateScale(15),
    marginTop: moderateScale(15),
  },
  list: {
    marginTop: moderateScale(15),
    alignSelf: 'center',
  },
});
