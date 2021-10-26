import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from './tabs/HomeTab';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AccountTab from './tabs/AccountTab';
import { StatusBar } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="#4890E0"/>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Account') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4890E0',
          tabBarInactiveTintColor: 'gray',
          headerShown : false,
          headerShadowVisible : false
        })}
      >
        <Tab.Screen name="Home" component={HomeTab} options={{
            title : 'Nhà trọ'
        }}
            
        />
        <Tab.Screen name="Account" component={AccountTab} options={{
            title :'Tài khoản',
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
