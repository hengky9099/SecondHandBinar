import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../helpers/colors';
import {moderateScale} from 'react-native-size-matters';
import {Poppins} from '../FontComponents';
import Dot from '../Dot';

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
      borderColor: COLORS.neutral1,
      margin: moderateScale(10),
      borderBottomWidth: 1,
      padding: moderateScale(5),
    },
    image: {
      width: moderateScale(48),
      height: moderateScale(48),
      borderRadius: moderateScale(12),
    },
    text1: {
      color: COLORS.neutral3,
      fontSize: moderateScale(10),
      marginEnd: moderateScale(5),
    },
    text2: {
      color: COLORS.black,
      fontSize: moderateScale(14),
    },
    text3: {
      color: COLORS.black,
      fontSize: moderateScale(14),
      textDecorationLine: status ? 'line-through' : 'none',
    },
    toRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    notifinfoContainer: {
      marginStart: moderateScale(10),
      flex: 1,
    },
    notifContainer: {
      flexDirection: 'row',
    },
    dateContainer: {
      flexDirection: 'row',
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
        <Image source={{uri: urlImage}} style={styles.image} />

        <View style={styles.notifinfoContainer}>
          <View style={styles.toRow}>
            <Poppins style={styles.text1}>{typeNotif}</Poppins>
            <View style={styles.dateContainer}>
              <Poppins style={styles.text1}>{date}</Poppins>
              {seen ? null : <Dot color={COLORS.purple4} />}
            </View>
          </View>

          <View>
            <Poppins style={styles.text2}>{productName}</Poppins>
            <Poppins style={styles.text3}>{productPrice}</Poppins>
            <Poppins style={styles.text2}>
              {statusTawaranCheck(status, tawaran)}
            </Poppins>
            {status ? (
              <Poppins style={styles.text1}>
                Kamu akan segera dihubungi penjual via WhatsApp
              </Poppins>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemNotificationCard;
