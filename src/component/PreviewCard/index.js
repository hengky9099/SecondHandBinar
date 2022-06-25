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

const {width, height} = Dimensions.get('window');

const PreviewCard = () => {
  const [imgActive, setImgActive] = useState(0);
  const imgData = [
    'https://cdn.pixabay.com/photo/2022/06/18/21/40/strasbourg-7270721_960_720.jpg',
    'https://media.istockphoto.com/photos/weve-made-it-all-this-way-i-am-proud-picture-id904172104?b=1&k=20&m=904172104&s=170667a&w=0&h=cpH1h5ENopSwP2hB-zlAxeg3Gry9KkcBReSsBV1zyzQ=',
    'https://media.istockphoto.com/photos/lady-with-kayak-picture-id516449022?b=1&k=20&m=516449022&s=170667a&w=0&h=kgLt9ELGehVZDxXhDUJB6OyNHuiPb_9k81VlyzzjcLo=',
  ];

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
          <Header backArrowBackground={true} />
        </View>

        <View style={styles.wrap}>
          <ScrollView
            onScroll={({nativeEvent}) => onChange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={styles.wrap}>
            {imgData.map((imgUrl, index) => (
              <Image
                key={imgUrl}
                resizeMode="stretch"
                style={styles.wrap}
                source={{uri: imgUrl}}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.dotWrap}>
          {imgData.map((imgUrl, index) => (
            <Text
              key={imgUrl}
              style={imgActive === index ? styles.dotActive : styles.dot}>
              ●
            </Text>
          ))}
        </View>
        <View style={styles.topWrap}>
          <Poppins type="Medium" style={styles.text1}>
            Jam Tangan Casio
          </Poppins>
          <Poppins style={styles.text2}>Aksesoris</Poppins>
          <Poppins style={styles.text1}>Rp 250.000</Poppins>
        </View>
        <IdentityCard
          nama="Iqbal"
          kota={'Klaten'}
          urlImage={'https://avatars.githubusercontent.com/u/62233239?v=4'}
        />
        <View style={styles.topWrap}>
          <Poppins style={styles.text1}>Deskripsi</Poppins>
          <Poppins style={styles.text2}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
            ut labore et dolore
          </Poppins>
        </View>
      </ScrollView>
      <View style={styles.btnBottom}>
        <Button textButton1={'Terbitkan'} />
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
