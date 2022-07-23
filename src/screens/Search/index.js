import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getSearchProduct} from './redux/action';
import LoadingBar from '../../component/LoadingBar';
import {Header, ItemProductCard, Poppins} from '../../component';
import {navigate} from '../../helpers/navigate';
import {setRefreshing} from '../../redux/globalAction';
import {moderateScale} from 'react-native-size-matters';
import {currencyToIDR} from '../../helpers/change';
import {COLORS} from '../../helpers/colors';

const Search = ({route, navigation}) => {
  const search = route.params?.search;
  const dispatch = useDispatch();
  const {loading, refreshing} = useSelector(state => state.global);
  const {dataSearch} = useSelector(state => state.search);

  useEffect(() => {
    dispatch(getSearchProduct(search));
  }, [dispatch, search]);

  const onRefresh = () => {
    dispatch(setRefreshing(true));
    dispatch(getSearchProduct(search));
  };

  const searchItem = ({item}) => {
    const categories = item.Categories;
    const listCategories = [];
    categories.forEach(data => {
      return listCategories.push(data.name);
    });

    return (
      <View style={styles.itemPage}>
        <ItemProductCard
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
          productName={item?.name ? item.name : 'Nama Produk'}
          productType={
            item?.Categories[0]?.name ? listCategories.join(', ') : 'Kategori'
          }
          productPrice={
            item?.base_price ? currencyToIDR(item?.base_price) : 'Rp. 0'
          }
          url={item?.image_url}
          onPressCard={() => navigate('BuyerOrder', {id: item.id})}
        />
      </View>
    );
  };

  const emptyView = () => {
    return (
      <View>
        <Poppins style={styles.text}>
          Maaf, tidak terdapat produk yang anda cari
        </Poppins>
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <Header
        headerName="Produk Hasil Search"
        onPressBack={() => navigation.goBack()}
      />
      {loading ? (
        <LoadingBar loading={loading} />
      ) : (
        <FlatList
          data={dataSearch}
          keyExtractor={(_item, index) => index}
          renderItem={searchItem}
          numColumns={2}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={emptyView}
        />
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: moderateScale(10),
  },
  itemPage: {
    margin: moderateScale(10),
  },
  text: {
    alignSelf: 'center',
    margin: moderateScale(10),
    color: COLORS.black,
  },
});
