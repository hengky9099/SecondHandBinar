import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers/colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: height,
  },
  headerDJ: {
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
  },
  textHeaderDJ: {
    fontSize: moderateScale(20),
    color: COLORS.black,
    fontWeight: 'bold',
  },
  btnFiturContainer: {flexGrow: 0},
  btnContainer: {
    width: width - moderateScale(230),
    height: moderateScale(44),
    borderRadius: moderateScale(16),
  },
  headerComponent: {
    marginBottom: moderateScale(80),
  },
  footerComponent: {height: moderateScale(100)},
  contentDiminati: {
    paddingHorizontal: moderateScale(10),
  },
  contentProduct: {
    justifyContent: 'space-evenly',
    alignSelf: 'flex-start',
    marginHorizontal: moderateScale(10),
  },
  productView: {
    marginTop: moderateScale(10),
    marginLeft: moderateScale(16),
    borderRadius: moderateScale(4),
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: moderateScale(300),
  },
  wrapDiminati: {
    alignItems: 'center',
    marginBottom: moderateScale(200),
  },
  imageDiminati: {
    width: moderateScale(150),
    height: moderateScale(120),
    marginTop: moderateScale(100),
  },
  textDiminati: {
    textAlign: 'center',
    marginHorizontal: moderateScale(30),
    fontSize: moderateScale(14),
    marginTop: moderateScale(10),
  },
  addButton: {
    width: moderateScale(156),
    height: moderateScale(206),
  },
});
export {styles};