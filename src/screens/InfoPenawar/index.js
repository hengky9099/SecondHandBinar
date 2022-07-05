import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Header,
  IdentityCard,
  ItemNotificationCard,
  Poppins,
} from '../../component';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers/colors';

const InfoPenawar = () => {
  const [status, setStatus] = useState('waiting');

  const [datas, setDatas] = useState(data);

  const data = useMemo(() => {
    return [
      {
        id: 1,
        productName: 'Kaos Kaki',
        price: 'Rp 20.000',
        date: '29 Mei. 20.00',
        tawaran: 'Rp 15.000',
      },
      {
        id: 2,
        productName: 'Baju',
        price: 'Rp 30.000',
        date: '20 Mei. 20.00',
        tawaran: 'Rp 30.000',
      },
      {
        id: 3,
        productName: 'Lol',
        price: 'Rp 30.000',
        date: '29 Mei. 20.00',
        tawaran: 'Rp 38.000',
      },
      {
        id: 4,
        productName: 'Hahaha',
        price: 'Rp 30.000',
        date: '28 Mei. 23.00',
        tawaran: 'Rp 90.000',
      },
      {
        id: 5,
        productName: 'Wkwkwk',
        price: 'Rp 30.000',
        date: '20 Mei. 23.00',
        tawaran: 'Rp 30.000',
      },
    ];
  }, []);

  useEffect(() => {
    setDatas(data);
  }, [data]);

  const onPressButtonCard = (item, index) => {
    const newData = data.map(newItem => {
      if (newItem.id === item.id) {
        return {
          ...newItem,
          selected: true,
        };
      }
      return {
        ...newItem,
        selected: false,
      };
    });
    setDatas(newData);
  };

  const RenderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => onPressButtonCard(item, index)}>
        <ItemNotificationCard
          button={item.selected}
          seen={true}
          textButton1={'Tolak'}
          textButton2={'Terima'}
          typeNotif={'Penawaran Produk'}
          productName={item.productName}
          productPrice={item.price}
          date={item.date}
          tawaran={item.tawaran}
          status={status}
          onPressButton1={() => {
            setStatus('decline');
          }}
          onPressButton2={() => {
            Alert.alert('ID', 'item.id');
            setStatus('accepted');
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header headerName={'Info Penawar'} />
        <IdentityCard
          urlImage={'https://avatars.githubusercontent.com/u/62233239?v=4'}
          nama={'Meisy'}
          kota={'Solo'}
        />
      </View>
      <View>
        <Poppins style={styles.topText}>Daftar Produkmu yang Ditawar</Poppins>
      </View>
      <View flex={1}>
        <View style={styles.card}>
          <FlatList
            data={datas}
            renderItem={RenderItem}
            keyExtractor={(item, index) => index}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InfoPenawar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: COLORS.black,
    marginHorizontal: moderateScale(10),
    marginTop: moderateScale(20),
    marginBottom: moderateScale(10),
  },
  card: {
    marginHorizontal: moderateScale(10),
    backgroundColor: '#FFF',
  },
});
