import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../helpers/colors';
import {moderateScale} from 'react-native-size-matters';
import {Poppins} from '../FontComponents';
import Dot from '../dot';

const ItemNotificationCard = ({
  urlImage,
  typeNotif,
  productName,
  productPrice,
  tawaran,
  date,
  seen = false,
  status,
}) => {
  const styles = StyleSheet.create({
    page: {
      width: moderateScale(328),
      height: moderateScale(86),
      borderColor: COLORS.neutral1,
      margin: moderateScale(9),
      borderBottomWidth: 1,
    },
    notifContainer: {
      flexDirection: 'row',
    },
    imageContainer: {},
    image: {
      width: moderateScale(48),
      height: moderateScale(48),
      borderRadius: moderateScale(12),
    },
    text1: {
      color: COLORS.neutral3,
      fontSize: moderateScale(10),
      marginBottom: moderateScale(4),
    },
    text2: {
      color: COLORS.black,
      fontSize: moderateScale(14),
      marginBottom: moderateScale(4),
      textDecorationLine: status ? 'line-through' : 'none',
    },
  });

  const statusTawaranCheck = (statusTawaran, tawaranPembeli) => {
    if (tawaranPembeli && !statusTawaran) {
      return `Ditawar ${tawaranPembeli}`;
    } else if (tawaranPembeli && statusTawaran) {
      return `Berhasil Ditawar ${tawaranPembeli}`;
    } else {
      return null;
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.notifContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: urlImage}} style={styles.image} />
        </View>
        <View>
          <Poppins style={styles.text1}>{typeNotif}</Poppins>
          <Poppins style={styles.text2}>{productName}</Poppins>
          <Poppins style={styles.text2}>{productPrice}</Poppins>
          <Poppins style={styles.text2}>
            {statusTawaranCheck(status, tawaran)}
          </Poppins>
          {status ? (
            <Poppins>Kamu akan segera dihubungi penjual via WhatsApp</Poppins>
          ) : null}
        </View>
        <View>
          <Poppins style={styles.text1}>{date}</Poppins>
          {seen ? null : <Dot color={COLORS.purple4} />}
        </View>
      </View>
    </View>
  );
};

export default ItemNotificationCard;
