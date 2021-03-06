import {createStackNavigator} from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Akun,
  DaftarJual,
  Home,
  LengkapiDetailProduk,
  Login,
  Notification,
  Register,
  Profile,
  Search,
  InfoPenawar,
  BuyerOrder,
  Preview,
} from '../screens';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="MainApp">
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InfoPenawar"
        component={InfoPenawar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BuyerOrder"
        component={BuyerOrder}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Preview"
        component={Preview}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const iconBar = (nameIcon, color, size) => {
  return <Feather name={nameIcon} color={color} size={size} />;
};

const MainApp = () => {
  const {dataNotif} = useSelector(state => state.notification);
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => iconBar('home', color, size),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: ({color, size}) => iconBar('bell', color, size),
          tabBarBadge: dataNotif < 1 ? null : dataNotif,
        }}
        name="Notification"
        component={Notification}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Jual',
          tabBarIcon: ({color, size}) => iconBar('plus-circle', color, size),
        }}
        name="Jual"
        component={LengkapiDetailProduk}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Daftar Jual',
          tabBarIcon: ({color, size}) => iconBar('list', color, size),
        }}
        name="DaftarJual"
        component={DaftarJual}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Akun',
          tabBarIcon: ({color, size}) => iconBar('user', color, size),
        }}
        name="Akun"
        component={Akun}
      />
    </Tab.Navigator>
  );
};

export default MainStack;
