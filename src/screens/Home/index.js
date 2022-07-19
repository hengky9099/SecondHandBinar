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
import {currencyToIDR} from '../../helpers/change';
import Feather from 'react-native-vector-icons/Feather';

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
  const [page, setPage] = useState(1);
  const [dataProducts, setDataProducts] = useState('dataAllProduct');
  const [search, setSearch] = useState('');
  const [listNumber, setListNumber] = useState([]);
  const [startData] = useState(1);
  const [endData, setEndData] = useState(5);
  const [idCategory, setIdCategory] = useState(0);

  useEffect(() => {
    const getAllProduct = () => dispatch(getProduct(page));
    if (dataProducts === 'dataAllProduct') {
      getAllProduct();
    } else if (dataProducts === 'dataProductperCategory') {
      dispatch(getProductperCategory(idCategory, page));
    }
  }, [dispatch, page, idCategory, dataProducts]);

  useEffect(() => {
    const renderListNumber = data => {
      let renderer = [];
      const lengthPageAllProduct = Math.ceil(
        lengthProducts ? lengthProducts : 0 / 20,
      );
      const lengthPageProductperCategories = Math.ceil(
        dataProductperCategory.length / 20,
      );

      if (data === 'dataAllProduct') {
        if (lengthPageAllProduct > 10) {
          setEndData(10);
        } else {
          setEndData(lengthPageAllProduct);
        }
      } else if (data === 'dataProductperCategory') {
        if (lengthPageProductperCategories > 10) {
          setEndData(10);
        } else {
          setEndData(lengthPageProductperCategories);
        }
      }

      for (let index = startData; index <= endData; index++) {
        renderer.push({
          title: index,
          isActive: index === 1 ? true : false,
        });
      }

      setListNumber(renderer);
    };
    renderListNumber(dataProducts);
  }, [
    products,
    startData,
    endData,
    dataProductperCategory.length,
    lengthProducts,
    dataProducts,
  ]);

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
          setPage(1);
          setIdCategory(item.id);
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
        onPressButton={() => {
          setPage(1);
          setDataProducts('dataAllProduct');
        }}
      />
    );
  };

  const bannerItem = ({item}) => {
    const bannerName = item.name.replace(/[^a-zA-Z ]/g, ' ');

    return (
      <View style={styles.bannerContainer}>
        <View style={styles.textBannerContainer}>
          <Poppins style={styles.textBR}>{bannerName}</Poppins>
        </View>
        <Image
          source={{uri: item.image_url}}
          style={styles.imageBanner}
          resizeMode="cover"
        />
      </View>
    );
  };

  const renderHeader = () => (
    <View>
      <LinearGradient
        colors={['#ffe9c9', '#ffe9c9', '#ffffff']}
        style={styles.topNav}>
        <View style={styles.topNavContainer}>
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
        <Poppins type="Medium" style={styles.textTK}>
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
    const categories = item.Categories;
    const listCategories = [];
    categories.forEach(data => {
      return listCategories.push(data.name);
    });

    return (
      <View style={styles.itemProduct}>
        <ItemProductCard
          productName={item?.name ? item.name : 'Nama Produk'}
          productType={
            item?.Categories[0]?.name ? listCategories.join(', ') : 'Kategori'
          }
          productPrice={
            item?.base_price ? currencyToIDR(item?.base_price) : 'Rp. 0'
          }
          url={item?.image_url}
          onPressCard={() =>
            navigation.navigate('DetailProductScreen', {id_product: item.id})
          }
        />
      </View>
    );
  };

  const pagination = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setPage(index + 1);
        }}
        key={item.title}
        style={{
          backgroundColor: index === page - 1 ? COLORS.purple3 : null,
          marginRight: parseInt(item.title, 10) === listNumber.length ? 0 : 20,
          padding: moderateScale(7),
          marginBottom: moderateScale(5),
          borderRadius: moderateScale(10),
        }}>
        <Poppins
          style={{
            fontSize: moderateScale(14),
            color: index === page - 1 ? COLORS.purple1 : '#666',
          }}>
          {item.title}
        </Poppins>
      </TouchableOpacity>
    );
  };

  const renderFooter = (data, {itemCategory}) => {
    return (
      <View flexDirection="row" flex={1} style={styles.containerListPage}>
        <View
          flexDirection="row"
          justifyContent="center"
          style={styles.containerNextPage}>
          <TouchableOpacity onPress={() => setPage(1)} style={{marginRight: 5}}>
            <Feather name="chevrons-left" color={COLORS.purple5} size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (page > 1 && data === 'dataProductperCategory') {
                setPage(prevState => (prevState - 1 < 1 ? 1 : prevState - 1));
                dispatch(getProductperCategory(itemCategory.id, page));
              } else if (page > 1 && data === 'dataAllProduct') {
                setPage(prevState => (prevState - 1 < 1 ? 1 : prevState - 1));
                dispatch(getProduct(page));
              }
            }}>
            <Feather name="chevron-left" color={COLORS.purple5} size={24} />
          </TouchableOpacity>
        </View>
        <View flexDirection="row">
          <FlatList
            data={listNumber}
            horizontal={true}
            keyExtractor={(_item, index) => index}
            renderItem={pagination}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View
          flexDirection="row"
          justifyContent="center"
          style={{
            padding: moderateScale(7),
          }}>
          <TouchableOpacity
            onPress={() => {
              if (page < 5) {
                setPage(prevState => prevState + 1);
              }
            }}>
            <Feather name="chevron-right" color={COLORS.purple5} size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPage(5);
            }}
            style={{marginLeft: 2}}>
            <Feather name="chevrons-right" color={COLORS.purple5} size={24} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const list = data => {
    if (data === 'dataAllProduct') {
      return products;
    } else if (data === 'dataProductperCategory') {
      return dataProductperCategory;
    }
  };

  const renderEmpty = () => {
    return <Poppins style={styles.empty}>Tidak ada data</Poppins>;
  };

  return (
    <View style={styles.container}>
      {list(dataProducts) ? (
        <>
          <View style={styles.searchContainer}>
            <SearchBar
              onChangeText={value => {
                setSearch(value);
              }}
              value={search}
              onSubmitEditing={() => {
                setSearch('');
                navigate('Search', {search: search});
              }}
              styleInput={styles.searchBar}
            />
          </View>
          <FlatList
            refreshControl={
              <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
            }
            contentContainerStyle={{flexGrow: 1}}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={renderEmpty}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={list(dataProducts)}
            horizontal={false}
            keyExtractor={(_item, index) => index}
            renderItem={renderItem}
            ListFooterComponent={renderFooter(dataProducts, dataCategory)}
          />
        </>
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
    height: moderateScale(350),
  },
  topNavContainer: {
    marginHorizontal: moderateScale(20),
  },
  textBannerContainer: {
    alignSelf: 'flex-start',
  },
  imageBanner: {
    height: moderateScale(135),
    width: moderateScale(300),
    borderRadius: moderateScale(10),
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
    flexDirection: 'row',
    margin: moderateScale(5),
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
    fontSize: moderateScale(17),
    color: COLORS.black,
    textTransform: 'capitalize',
  },
  textTK: {
    fontSize: moderateScale(14),
    marginHorizontal: moderateScale(2),
    marginTop: moderateScale(40),
    color: COLORS.neutral5,
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
    marginHorizontal: moderateScale(10),
  },
  searchBar: {
    width: moderateScale(320),
  },
  searchContainer: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
    backgroundColor: '#ffe9c9',
  },
  empty: {
    alignSelf: 'center',
    margin: moderateScale(10),
  },
  containerNextPage: {
    padding: moderateScale(7),
  },
  containerListPage: {
    justifyContent: 'center',
    marginHorizontal: moderateScale(60),
  },
});
