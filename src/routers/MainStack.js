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
  // NotificationBuyer,
  Register,
  Profile,
  Search,
} from '../screens';
import {COLORS} from '../helpers/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
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
        name="LengkapiDetailProduk"
        component={LengkapiDetailProduk}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const iconBar = (nameIcon, color, size) => {
  return <Feather name={nameIcon} color={color} size={size} />;
};

const MainApp = () => (
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
        tabBarBadge: '',
        tabBarBadgeStyle: COLORS.red,
      }}
      name="Notification"
      component={Notification}
    />
    {/* <Tab.Screen
      options={{
        tabBarLabel: 'Notification',
        tabBarIcon: ({color, size}) => iconBar('bell', color, size),
      }}
      name="Notification"
      component={NotificationBuyer}
    /> */}
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
        tabBarLabel: 'DaftarJual',
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

export default MainStack;
