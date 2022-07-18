import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../helpers/colors';
import {moderateScale} from 'react-native-size-matters';
import {Poppins} from '../FontComponents';
import Dot from '../Dot';
import Button from '../Button';
import {Jam} from '../../assets/Images';

const ItemNotificationCard = ({
  urlImage,
  onPress,
  typeNotif,
  productName,
  productPrice,
  tawaran,
  date,
  seen = false,
  status = 'pending',
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
    text: {
      color: COLORS.black,
      fontSize: moderateScale(14),
    },
    text1: {
      color: COLORS.neutral3,
      fontSize: moderateScale(10),
      marginEnd: moderateScale(5),
    },
    text2: {
      color: COLORS.black,
      fontSize: moderateScale(14),
      textDecorationLine: status === 'declined' ? 'line-through' : 'none',
    },
    text3: {
      color: COLORS.black,
      fontSize: moderateScale(14),
      textDecorationLine:
        status === 'accepted' || status === '' ? 'line-through' : 'none',
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
      marginTop: moderateScale(-10),
      marginBottom: moderateScale(10),
      alignItems: 'center',
    },
  });

  const statusTawaranCheck = (statusTawaran, tawaranPembeli) => {
    if (
      (tawaranPembeli && statusTawaran === 'declined' && 'e') ||
      statusTawaran === ''
    ) {
      return `Ditawar ${tawaranPembeli}`;
    } else if (tawaranPembeli && statusTawaran === 'bid') {
      return `Ditawar ${tawaranPembeli}`;
    } else if (tawaranPembeli && statusTawaran === 'accepted') {
      return `Berhasil Ditawar ${tawaranPembeli}`;
    } else if (statusTawaran === 'pending' && 'bid') {
      return `Ditawar ${tawaranPembeli}`;
    } else {
      return null;
    }
  };

  return (
    <View style={styles.page}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.notifContainer}>
          <Image
            source={urlImage ? {uri: urlImage} : Jam}
            style={styles.image}
          />
          <View style={styles.notifinfoContainer}>
            <View style={styles.toRow}>
              {status === 'create' ? (
                <Poppins style={styles.text1}>Berhasil diterbitkan</Poppins>
              ) : (
                <Poppins style={styles.text1}>Penawaran Produk</Poppins>
              )}
              <View style={styles.dateContainer}>
                <Poppins style={styles.text1}>{date}</Poppins>
                {seen ? null : <Dot color={COLORS.purple4} />}
              </View>
            </View>
            <View>
              <Poppins style={styles.text}>{productName}</Poppins>
              <Poppins style={styles.text3}>{productPrice}</Poppins>
              <Poppins style={styles.text2}>
                {statusTawaranCheck(status, tawaran)}
              </Poppins>
              {status === 'accepted' && typeNotif === 'buyer' ? (
                <Poppins style={styles.text1}>
                  Kamu akan segera dihubungi penjual via WhatsApp
                </Poppins>
              ) : null}
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {button !== 'declined' ? (
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

