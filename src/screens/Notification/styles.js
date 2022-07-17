import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
  },
  textHeader: {
    fontSize: moderateScale(25),
    color: COLORS.black,
    fontWeight: 'bold',
  },
  containerNotifBar: {
    marginTop: moderateScale(10),
    marginBottom: moderateScale(70),
  },
  footerComponent: {height: moderateScale(10)},
});
export default styles;
