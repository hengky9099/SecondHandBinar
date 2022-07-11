import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {Poppins} from '../FontComponents';
import {COLORS} from '../../helpers/colors';
import {Jam} from '../../assets/Images';

const ItemProductCard = ({
  onPressCard,
  url,
  productName,
  productType,
  productPrice,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPressCard}>
      <Image source={url ? {uri: url} : Jam} style={styles.image} />
      <Poppins numberOfLines={1} style={styles.textProductName}>
        {productName}
      </Poppins>
      <Poppins style={styles.textProductType}>{productType}</Poppins>
      <Poppins style={styles.textProductPrice}>{productPrice}</Poppins>
    </TouchableOpacity>
  );
};

export default ItemProductCard;

const styles = StyleSheet.create({
  image: {
    width: moderateScale(140),
    height: moderateScale(100),
    borderRadius: moderateScale(4),
    alignItems: 'center',
    margin: moderateScale(8),
  },
  textProductName: {
    fontSize: moderateScale(14),
    color: COLORS.neutral5,
    marginHorizontal: moderateScale(8),
    marginBottom: moderateScale(4),
  },
  textProductType: {
    fontSize: moderateScale(10),
    color: COLORS.neutral3,
    marginHorizontal: moderateScale(8),
  },
  textProductPrice: {
    fontSize: moderateScale(14),
    color: COLORS.neutral5,
    marginHorizontal: moderateScale(8),
    marginBottom: moderateScale(24),
    marginTop: moderateScale(8),
  },
  card: {
    width: moderateScale(156),
    height: moderateScale(206),
    borderColor: COLORS.neutral1,
    borderWidth: 1,
    borderRadius: moderateScale(4),
  },
});
