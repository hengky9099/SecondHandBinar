import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import IdentityCard from '../IdentityCard';
import {Poppins} from '../FontComponents';
import {COLORS} from '../../helpers/colors';
import Button from '../Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../Header';
import {goBack} from '../../helpers/navigate';

const {width, height} = Dimensions.get('window');

const PreviewCard = ({
  imgData,
  productName,
  category,
  price,
  sellerName,
  sellerAvatar,
  city,
  deskripsi,
  btnText,
  btnOnPress,
  btnColor = COLORS.purple4,
}) => {
  const [imgActive, setImgActive] = useState(0);

  const onChange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide !== imgActive) {
        setImgActive(slide);
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.header}>
          <Header backArrowBackground={true} onPressBack={() => goBack()} />
        </View>
        <View style={styles.wrap}>
          <ScrollView
            onScroll={({nativeEvent}) => onChange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={styles.wrap}>
            {/* {imgData.map((imgUrl, index) => ( */}
            <Image
              key={imgData}
              resizeMode="stretch"
              style={styles.wrap}
              source={{uri: imgData}}
            />
            {/* ))} */}
          </ScrollView>
        </View>
        <View style={styles.dotWrap}>
          {/* {imgData.map((imgUrl, index) => ( */}
          <Text key={imgData}>●</Text>
          {/* ))} */}
        </View>
        <View style={styles.topWrap}>
          <Poppins type="Medium" style={styles.text1}>
            {productName}
          </Poppins>
          <Poppins style={styles.text2}>{category}</Poppins>
          <Poppins style={styles.text1}>{price}</Poppins>
        </View>
        <IdentityCard nama={sellerName} kota={city} urlImage={sellerAvatar} />
        <View style={styles.topWrap}>
          <Poppins style={styles.text1}>Deskripsi</Poppins>
          <Poppins style={styles.text2}>{deskripsi}</Poppins>
        </View>
      </ScrollView>
      <View style={styles.btnBottom}>
        <Button
          buttonColor={btnColor}
          textButton1={btnText}
          onPressButton1={btnOnPress}
        />
      </View>
    </SafeAreaView>
  );
};

export default PreviewCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: width,
    height: '100%',
  },
  wrap: {
    width: width,
    height: height * 0.38,
  },
  dotActive: {
    color: COLORS.white,
  },
  dot: {
    color: 'grey',
  },
  dotWrap: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: moderateScale(-60),
  },
  text1: {
    fontSize: moderateScale(14),
    color: COLORS.black,
  },
  text2: {
    fontSize: moderateScale(11),
    color: COLORS.neutral3,
    textAlign: 'justify',
    lineHeight: 18,
  },
  topWrap: {
    backgroundColor: COLORS.white,
    borderWidth: moderateScale(1),
    borderColor: COLORS.neutral1,
    borderRadius: moderateScale(16),
    margin: moderateScale(10),
    padding: moderateScale(16),
  },
  btnBottom: {
    position: 'absolute',
    bottom: moderateScale(20),
    right: moderateScale(10),
    left: moderateScale(10),
  },
  header: {
    position: 'absolute',
    zIndex: 2,
    left: moderateScale(10),
    top: moderateScale(10),
  },
});
