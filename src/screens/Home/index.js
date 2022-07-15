import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
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
import {COLORS} from '../../helpers/colors';
import {getProduct, getProductperCategory} from './redux/action';
import {useSelector, useDispatch} from 'react-redux';
import LoadingBar from '../../component/LoadingBar';
import {setRefreshing} from '../../redux/globalAction';
import {navigate} from '../../helpers/navigate';

export default function Home({navigation}) {
  const dispatch = useDispatch();
  const {
    products,
    lengthProducts,
    dataCategory,
    dataProductperCategory,
    banner,
  } = useSelector(state => state.home);
  const {loading, refreshing} = useSelector(state => state.global);
  const [end, setEnd] = useState(16);
  const [dataProducts, setDataProducts] = useState('dataAllProduct');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getAllProduct = () => dispatch(getProduct());
    getAllProduct();
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(setRefreshing(true));
    dispatch(getProduct());
  };

  const fiturButton = ({item}) => {
    return (
      <ButtonFitur
        nameIcon="search"
        nameFitur={item.name}
        onPressButton={() => {
          dispatch(getProductperCategory(item.id));
          setDataProducts('dataProductperCategory');
        }}
      />
    );
  };

  const headerFiturButton = () => {
    return (
      <ButtonFitur
        nameIcon="search"
        nameFitur="Semua"
        onPressButton={() => setDataProducts('dataAllProduct')}
      />
    );
  };

  const bannerItem = ({item}) => {
    const bannerName = item.name.replace(/[^a-zA-Z ]/g, ' ');

    return (
      <View>
        <Image
          source={{uri: item.image_url}}
          style={styles.imageBanner}
          resizeMode="cover"
        />
        <View style={styles.textBannerContainer}>
          <Poppins type="Bold" style={styles.textBR}>
            {bannerName}
          </Poppins>
        </View>
      </View>
    );
  };

  const renderHeader = () => (
    <View>
      <LinearGradient
        colors={['#ffe9c9', '#ffe9c9', '#ffffff']}
        style={styles.topNav}>
        <View style={styles.topNavContainer}>
          <SearchBar
            onChangeText={value => {
              setSearch(value);
            }}
            value={search}
            onSubmitEditing={() => navigate('Search', {search: search})}
            styleInput={styles.searchBar}
          />
          <FlatList
            style={styles.bannerContainer}
            data={banner}
            horizontal={true}
            keyExtractor={(_item, index) => index}
            renderItem={bannerItem}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </LinearGradient>
      <View style={styles.categories}>
        <Poppins type="Bold" style={styles.textTK}>
          Telusuri Kategori
        </Poppins>
        <FlatList
          ListHeaderComponent={headerFiturButton}
          data={dataCategory}
          horizontal={true}
          keyExtractor={(_item, index) => index}
          renderItem={fiturButton}
          showsHorizontalScrollIndicator={false}
        />
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
    } else if (data === 'dataProductperCategory') {
      if (end < dataProductperCategory.length) {
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
        end > dataProductperCategory.length ||
        end === dataProductperCategory.length
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
    } else if (data === 'dataProductperCategory') {
      return dataProductperCategory.slice(0, end);
    }
  };

  return (
    <View style={styles.container}>
      {list(dataProducts) ? (
        <FlatList
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
          ListHeaderComponent={renderHeader}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={list(dataProducts)}
          horizontal={false}
          keyExtractor={(_item, index) => index}
          renderItem={renderItem}
          ListFooterComponent={renderFooter(dataProducts)}
        />
      ) : (
        <LoadingBar loading={loading} />
      )}
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
  },
  topNavContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  textBannerContainer: {
    alignSelf: 'center',
  },
  imageBanner: {
    height: moderateScale(135),
    width: moderateScale(300),
    borderRadius: moderateScale(10),
    margin: moderateScale(10),
  },
  footer: {
    marginHorizontal: moderateScale(50),
    alignSelf: 'center',
    marginBottom: moderateScale(15),
  },
  loadMoreBtn: {
    padding: moderateScale(13),
    backgroundColor: COLORS.purple5,
    borderRadius: moderateScale(5),
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
    marginTop: moderateScale(-200),
    padding: moderateScale(10),
  },
  textBR: {
    fontSize: moderateScale(22),
    color: COLORS.black,
    textTransform: 'capitalize',
  },
  textTK: {
    fontSize: moderateScale(16),
    marginHorizontal: moderateScale(2),
    marginTop: moderateScale(40),
    color: COLORS.black,
    marginBottom: moderateScale(10),
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
  itemProduct: {
    margin: moderateScale(15),
    marginTop: moderateScale(15),
  },
  list: {
    marginTop: moderateScale(15),
    alignSelf: 'center',
  },
  bannerContainer: {
    margin: moderateScale(10),
  },
  searchBar: {
    width: moderateScale(320),
  },
});
