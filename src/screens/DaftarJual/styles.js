import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
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
    height: moderateScale(44),
    borderRadius: moderateScale(16),
  },
  headerComponent: {
    marginBottom: moderateScale(20),
  },
  contentDiminati: {
    paddingHorizontal: moderateScale(15),
  },
  containerProduct: {
    justifyContent: 'space-between',
    margin: moderateScale(15),
    marginTop: moderateScale(3),
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
    width: moderateScale(150),
    height: moderateScale(200),
  },
});
export {styles};
