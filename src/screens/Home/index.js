import {View, Text} from 'react-native';
import React from 'react';
import Button from '../../component/Button';
import {useRef} from 'react';
import BottomSheet from '../../component/BottomSheet';
import {navigate} from '../../helpers/navigate';
import {useState} from 'react';

const Home = () => {
  const refRBSheet = useRef();
  const onPressButton = () => {
    console.log(value);
  };

  const [price, setPrice] = useState('');
  const [value, setValue] = React.useState(false);

  return (
    <View>
      <Text>Home</Text>
      <Button
        textButton1="OPEN BOTTOM SHEET"
        onPressButton1={() => refRBSheet.current.open()}
      />
      <BottomSheet
        refBottomSheet={refRBSheet}
        firstText="anyeong hello"
        secondText="hjsahfjhsjfhasfhausfhuehahajhjfhjshfjahfjashf"
        type="perbaharuiStatus"
        value={value}
        onValueChange={newValue => setValue(newValue)}
        onPressButton={onPressButton}
      />
    </View>
  );
};

export default Home;
