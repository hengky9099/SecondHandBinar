import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Poppins} from '../FontComponents';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers/colors';
import Button from '../Button';
import Input from '../Input';
import RBSheet from 'react-native-raw-bottom-sheet';
import {RadioButton} from 'react-native-paper';

const BottomSheet = ({
  firstText,
  secondText,
  type,
  urlImageBuyer,
  buyerCity,
  buyerName,
  urlImageProduct,
  productName,
  productPrice,
  bargainPrice,
  onPressButton,
  refBottomSheet,
  onChangeText,
  value,
  onValueChange,
}) => {
  const styles = StyleSheet.create({
    page: {
      flex: 1,
    },
    firstText: {
      fontSize: moderateScale(14),
      color: COLORS.black,
    },
    secondText: {
      fontSize: moderateScale(14),
      color: COLORS.neutral3,
    },
    productPrice: {
      color: COLORS.black,
      fontSize: moderateScale(14),
      textDecorationLine: bargainPrice ? 'line-through' : 'none',
    },
    productContainer: {
      flexDirection: 'row',
    },
    productImage: {
      width: moderateScale(48),
      height: moderateScale(48),
      borderRadius: moderateScale(12),
      marginEnd: moderateScale(16),
    },
    statusTitle: {
      fontSize: moderateScale(14),
      color: COLORS.neutral5,
      marginBottom: moderateScale(8),
    },
    statusText: {
      fontSize: moderateScale(14),
      color: COLORS.neutral3,
    },
    infoProduct: {
      flexDirection: 'row',
      marginBottom: moderateScale(24),
      padding: moderateScale(16),
      borderColor: COLORS.neutral1,
      borderRadius: moderateScale(16),
      borderWidth: 1,
      marginTop: moderateScale(16),
    },
    text: {
      fontSize: moderateScale(12),
      color: COLORS.black,
    },
    containerRadio: {
      alignSelf: 'flex-start',
    },
    toRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    labelStyle: {
      fontSize: moderateScale(14),
      color: COLORS.neutral5,
    },
    descriptionStyle: {
      fontSize: moderateScale(14),
      color: COLORS.neutral3,
      marginStart: moderateScale(10),
      marginBottom: moderateScale(16),
    },
    pageProductMatch: {
      marginHorizontal: moderateScale(10),
      marginTop: moderateScale(16),
      borderWidth: moderateScale(1),
      borderColor: COLORS.neutral1,
      borderRadius: moderateScale(16),
      padding: moderateScale(16),
      marginBottom: moderateScale(15),
    },
    subBab: {
      alignItems: 'center',
      marginBottom: moderateScale(10),
    },
    text1: {
      fontSize: moderateScale(14),
      color: COLORS.black,
    },
    text2: {
      fontSize: moderateScale(10),
      color: COLORS.neutral3,
    },
    image: {
      width: moderateScale(48),
      height: moderateScale(48),
      borderRadius: moderateScale(12),
    },
    textContainer: {
      alignItems: 'flex-start',
      marginStart: moderateScale(10),
    },
    pageBuyerIdentity: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: moderateScale(16),
    },
    marginInfoProduct: {
      marginTop: moderateScale(30),
    },
  });

  const componentView = typeView => {
    if (typeView === 'productMatch') {
      return (
        <View>
          <View style={styles.pageProductMatch}>
            <View style={styles.subBab}>
              <Poppins type="Medium" style={styles.firstText}>
                Product Match
              </Poppins>
            </View>
            <View style={styles.pageBuyerIdentity}>
              <View>
                <Image style={styles.image} source={{uri: urlImageBuyer}} />
              </View>
              <View style={styles.textContainer}>
                <Poppins type="Medium" style={styles.text1}>
                  {buyerName}
                </Poppins>
                <Poppins style={styles.text2}>{buyerCity}</Poppins>
              </View>
            </View>
            <View style={styles.productContainer}>
              <Image
                source={{uri: urlImageProduct}}
                style={styles.productImage}
              />
              <View>
                <Poppins style={styles.firstText}>{productName}</Poppins>
                <Poppins style={styles.productPrice}>{productPrice}</Poppins>
                {bargainPrice ? (
                  <Poppins style={styles.firstText}>
                    Ditawar {bargainPrice}
                  </Poppins>
                ) : null}
              </View>
            </View>
          </View>
          <Button
            textButton1="Hubungi via WhatsApp"
            onPressButton1={onPressButton}
          />
        </View>
      );
    } else if (typeView === 'perbaharuiStatus') {
      return (
        <View>
          <RadioButton.Group onValueChange={onValueChange} value={value}>
            <View style={styles.toRow}>
              <RadioButton
                value="accepted"
                color={COLORS.purple4}
                uncheckedColor={COLORS.neutral2}
              />
              <Poppins style={styles.labelStyle}>Berhasil terjual</Poppins>
            </View>
            <Poppins style={styles.descriptionStyle}>
              Kamu telah sepakat menjual produk ini kepada pembeli
            </Poppins>
            <View style={styles.toRow}>
              <RadioButton
                value="rejected"
                color={COLORS.purple4}
                uncheckedColor={COLORS.neutral2}
              />
              <Poppins style={styles.labelStyle}>Batalkan transaksi</Poppins>
            </View>
            <Poppins style={styles.descriptionStyle}>
              Kamu membatalkan transaksi produk ini dengan pembeli
            </Poppins>
          </RadioButton.Group>
          {value !== false ? (
            <Button onPressButton1={onPressButton} textButton1="Kirim" />
          ) : (
            <Button buttonColor={COLORS.gray} textButton1="Kirim" />
          )}
        </View>
      );
    } else if (typeView === 'tawaran') {
      return (
        <View>
          <View style={styles.infoProduct}>
            <Image
              source={{uri: urlImageProduct}}
              style={styles.productImage}
            />
            <View>
              <Poppins type="Medium" style={styles.firstText}>
                {productName}
              </Poppins>
              <Poppins style={styles.statusTitle}>{productPrice}</Poppins>
            </View>
          </View>
          <Input
            onChangeText={onChangeText}
            value={value}
            placeholder="Rp 0,00"
            placeholderTextColor={COLORS.neutral3}
            inputName="Harga Tawar"
            styleInputName={styles.text}
            keyboardType={'numeric'}
          />
          <View style={styles.marginInfoProduct}>
            <Button onPressButton1={onPressButton} textButton1="Kirim" />
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.page}>
      <RBSheet
        ref={refBottomSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: '#00000080',
          },
          draggableIcon: {
            backgroundColor: COLORS.gray,
            borderRadius: moderateScale(20),
            width: moderateScale(60),
            height: moderateScale(6),
          },
          container: {
            height: moderateScale(438),
            borderTopLeftRadius: moderateScale(16),
            borderTopRightRadius: moderateScale(16),
            padding: moderateScale(15),
          },
        }}>
        <Poppins type="Medium" style={styles.firstText}>
          {firstText}
        </Poppins>
        {secondText ? <Poppins>{secondText}</Poppins> : null}
        {componentView(type)}
      </RBSheet>
    </View>
  );
};

export default BottomSheet;
