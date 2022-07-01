import {Text, View} from 'react-native';
import React from 'react';
import Button from '../../component/Button';
import Input from '../../component/Input';
import IdentityCard from '../../component/IdentityCard';

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <Button textButton1="Hallo" />
      <Input placeholder="Hallo" />
      <IdentityCard nama="Nana" kota="Busan" />
    </View>
  );
};

export default Home;
