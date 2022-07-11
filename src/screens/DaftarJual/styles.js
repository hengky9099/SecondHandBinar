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
});
export {styles};
