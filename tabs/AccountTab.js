import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../screens/AccountScreen';

const Stack = createNativeStackNavigator();

const AccountTab = () => {
    return (
        <Stack.Navigator 
            initialRouteName="Account"
        >
            <Stack.Screen name="Account" component={AccountScreen}
                options={{
                    title : "Tài khoản",
                    headerShadowVisible : false,
                    headerTintColor : "#4890E0",
                    headerTitleAlign : "center"
                }}
            />
        </Stack.Navigator>
    )
}

export default AccountTab
