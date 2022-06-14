import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {View, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from './src/helpers/colors';
import {Button, Header, Input, MenuAkun, Poppins} from './src/component';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const goToLogin = () => null;

  return (
    <View style={styles.container}>
      {/* header */}
      <Header headerName="Fanny" onPressBack={goToLogin} />
      <Header backArrowBackground={true} />
      <Header onPressBack={goToLogin} />

      {/* text poppins */}
      <Poppins style={styles.text}>Hello</Poppins>

      {/* input data */}
      <Input inputName="Name" placeholder="Name" />
      <Input
        inputName="Password"
        placeholder="Password"
        password={true}
        secureTextEntry={true}
      />

      <Input
        inputName="textArea"
        styleInput={styles.input}
        numberOfLines={6}
        multiline={true}
      />

      {/* Button */}
      <Button textButton1="Login" onPressButton1={goToLogin} />
      <Button
        textButton1="Preview"
        textButton2="Terbitkan"
        onPressButton1={goToLogin}
        onPressButton2={goToLogin}
        numButton={2}
      />

      {/* menuAkun */}
      <MenuAkun nameIcon="edit-3" menuName="Ubah" onPress={goToLogin} />
      <MenuAkun nameIcon="settings" menuName="Ubah" onPress={goToLogin} />
      <MenuAkun nameIcon="log-out" menuName="Ubah" onPress={goToLogin} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: moderateScale(10),
    flex: 1,
  },
  text: {
    fontSize: moderateScale(30),
  },
  input: {
    height: moderateScale(80),
    textAlignVertical: 'top',
  },
  dropDown: {
    borderColor: COLORS.neutral2,
    color: COLORS.neutral3,
  },
});
