import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../helpers/colors';
import {moderateScale} from 'react-native-size-matters';
import {Poppins} from '../FontComponents';
import Dot from '../Dot';
import Button from '../Button';
import {Product} from '../../assets/Image';

const ItemNotificationCard = ({
  urlImage,
  typeNotif,
  productName,
  productPrice,
  tawaran,
  date,
  seen = false,
  status,
  button,
  textButton1,
  textButton2,
  onPressButton1,
  onPressButton2,
}) => {
  const styles = StyleSheet.create({
    page: {
      borderColor: COLORS.neutral1,
      borderBottomWidth: 1,
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
      padding: moderateScale(5),
    },
    notifContainer: {
      flexDirection: 'row',
      marginTop: moderateScale(15),
      marginBottom: moderateScale(10),
    },
    dateContainer: {
      flexDirection: 'row',
    },
    buttonContainer: {
      marginTop: moderateScale(10),
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
        <Image
          source={urlImage ? {uri: urlImage} : Product}
          style={styles.image}
        />

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
      {button ? (
        <View style={styles.buttonContainer}>
          <Button
            numButton={2}
            textButton1={textButton1}
            textButton2={textButton2}
            onPressButton1={onPressButton1}
            onPressButton2={onPressButton2}
          />
        </View>
      ) : null}
    </View>
  );
};

export default ItemNotificationCard;
