import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {IdentityCard, InputAdd, ItemNotificationCard} from '../../component';
import {moderateScale} from 'react-native-size-matters';

const DaftarJual = () => {
  return (
    <View>
      <Text>DaftarJual</Text>
      <IdentityCard
        urlImage={
          'https://assets.pikiran-rakyat.com/crop/12x16:705x712/x/photo/2021/08/18/2258085066.jpeg'
        }
        nama="Jaemin"
        kota="Jakarta"
        typeIdentity="Penjual"
        onPressButton={() => null}
      />
      <IdentityCard
        urlImage="https://assets.pikiran-rakyat.com/crop/12x16:705x712/x/photo/2021/08/18/2258085066.jpeg"
        nama="Jaemin"
        kota="Jakarta"
        typeIdentity="Pembeli"
      />
      <InputAdd onPress={() => null} product={true} style={styles.input} />
      <InputAdd onPress={() => null} />
      <ItemNotificationCard
        productName="Jaemin"
        date="20 Apr, 14:04"
        productPrice="Rp. 12728379479"
        typeNotif="Berhasil diterbitkan"
        urlImage="https://assets.pikiran-rakyat.com/crop/12x16:705x712/x/photo/2021/08/18/2258085066.jpeg"
      />
      <ItemNotificationCard
        productName="Jaemin"
        date="20 Apr, 14:04"
        productPrice="Rp. 12728379479"
        typeNotif="Penawaran Product"
        tawaran="Rp. 150000"
        urlImage="https://assets.pikiran-rakyat.com/crop/12x16:705x712/x/photo/2021/08/18/2258085066.jpeg"
      />
      <ItemNotificationCard
        productName="Jaemin"
        date="20 Apr, 14:04"
        productPrice="Rp. 12728379479"
        typeNotif="Penawaran Product"
        tawaran="Rp. 150000"
        seen={true}
        status="Completed"
        urlImage="https://assets.pikiran-rakyat.com/crop/12x16:705x712/x/photo/2021/08/18/2258085066.jpeg"
      />
    </View>
  );
};

export default DaftarJual;

const styles = StyleSheet.create({
  input: {
    width: moderateScale(300),
    height: moderateScale(500),
  },
});
