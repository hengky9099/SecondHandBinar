import {Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Poppins} from '../FontComponents';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers/colors';
import IdentityCard from '../IdentityCard';
import Button from '../Button';
import RadioGroup from 'react-native-radio-buttons-group';
import Input from '../Input';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useRef} from 'react';

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
}) => {
  const radioButtonsData = [
    {
      id: '1',
      label: 'Berhasil terjual',
      value: 'accepted', //ganti
      description: 'Kamu telah sepakat menjual produk ini kepada pembeli',
      labelStyle: styles.statusTitle,
      descriptionStyle: styles.statusText,
      color: COLORS.purple4,
      borderColor: COLORS.neutral2,
    },
    {
      id: '2',
      label: 'Batalkan transaksi',
      value: 'reject', //ganti
      description: 'Kamu membatalkan transaksi produk ini dengan pembeli',
      labelStyle: styles.statusTitle,
      descriptionStyle: styles.statusText,
      color: COLORS.purple4,
      borderColor: COLORS.neutral2,
    },
  ];

  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [price, setPrice] = useState('');
  const refRBSheet = useRef();

  const onPressRadioButton = radioButtonsArray => {
    setRadioButtons(radioButtonsArray);
  };

  const styles = StyleSheet.create({
    page: {
      borderTopLeftRadius: moderateScale(16),
      borderTopRightRadius: moderateScale(16),
      height: moderateScale(354),
    },
    retangle: {
      borderRadius: moderateScale(20),
      width: moderateScale(60),
      height: moderateScale(6),
      backgroundColor: COLORS.gray,
    },
    retangleContainer: {
      alignItems: 'center',
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
    },
    text: {
      fontSize: moderateScale(12),
      color: COLORS.black,
    },
  });

  const componentView = typeView => {
    if (typeView === 'productMatch') {
      return (
        <View>
          <Poppins type="Medium" style={styles.firstText}>
            Product Match
          </Poppins>
          <IdentityCard
            urlImage={urlImageBuyer}
            nama={buyerName}
            kota={buyerCity}
          />
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
                  `Ditawar ${bargainPrice}`
                </Poppins>
              ) : null}
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
          <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
          />
          <Button onPressButton1={onPressButton} textButton1="Kirim" />
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
          <Poppins style={styles.text}>Harga Tawar</Poppins>
          <Input
            onChangeText={value => setPrice(value)}
            value={price}
            placeholder="Rp 0,00"
            placeholderTextColor={COLORS.neutral3}
          />
          <Button onPressButton1={onPressButton} textButton1="Kirim" />
        </View>
      );
    }
  };

  return (
    <View style={styles.page}>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={styles.retangleContainer}>
          <View style={styles.retangle} />
        </View>
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
