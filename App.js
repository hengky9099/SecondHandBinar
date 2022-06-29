import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import {Provider} from 'react-redux';
import Root from './src/routers';
import {Provider as PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from './src/helpers/colors';
import {moderateScale} from 'react-native-size-matters';
import {Poppins} from './src/component';
import Feather from 'react-native-vector-icons/Feather';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const onPressClose = () => {
    Toast.hide();
  };

  const successToastView = text1 => {
    return (
      <View style={styles.success}>
        <View style={styles.toast}>
          <Poppins style={styles.text} type="Medium">
            {text1}
          </Poppins>
          <TouchableOpacity onPress={onPressClose}>
            <Feather name="x" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const errorToastView = text1 => {
    return (
      <View style={styles.error}>
        <View style={styles.toast}>
          <Poppins style={styles.text} type="Medium">
            {text1}
          </Poppins>
          <TouchableOpacity onPress={onPressClose}>
            <Feather name="x" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const pendingToastView = text1 => {
    return (
      <View style={styles.pending}>
        <View style={styles.toast}>
          <Poppins style={styles.text} type="Medium">
            {text1}
          </Poppins>
          <TouchableOpacity onPress={onPressClose}>
            <Feather name="x" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const toastConfig = {
    successToast: ({text1}) => successToastView(text1),
    errorToast: ({text1}) => errorToastView(text1),
    pendingToast: ({text1}) => pendingToastView(text1),
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider>
          <Root />
          <Toast config={toastConfig} />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  success: {
    height: moderateScale(52),
    width: '90%',
    backgroundColor: COLORS.green,
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(16),
  },
  text: {
    fontSize: moderateScale(14),
    color: COLORS.white,
  },
  toast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  error: {
    height: moderateScale(52),
    width: '90%',
    backgroundColor: COLORS.red,
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(16),
  },
  pending: {
    height: moderateScale(52),
    width: '90%',
    backgroundColor: COLORS.yellow,
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(16),
  },
});
