import {View, Text} from 'react-native';
import React from 'react';
import Button from '../../component/Button';
import {useRef} from 'react';

const Home = () => {
  const refRBSheet = useRef();
  return (
    <View>
      <Text>Home</Text>
      <Button
        textButton1="OPEN BOTTOM SHEET"
        onPressButton1={() => refRBSheet.current.open()}
      />
    </View>
  );
};

export default Home;
