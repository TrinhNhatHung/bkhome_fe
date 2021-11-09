import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../screens/AccountScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PostedRoomScreen from '../screens/PostedRoomScreen';
import UpdateableRoom from '../screens/UpdateableRoom';
import UpdateRoom from '../screens/UpdateRoom';

const Stack = createNativeStackNavigator();

const AccountTab = () => {

    return (
        <Stack.Navigator
            initialRouteName={"Profile"}
        >
            <Stack.Screen name="Profile" component={AccountScreen}
                options={{
                    title: "Tài khoản",
                    headerShadowVisible: false,
                    headerTintColor: "#4890E0",
                    headerTitleAlign: "center"
                }}
            />
            <Stack.Screen name="Login" component={LoginScreen}
                options={{
                    title: "Đăng nhập",
                    headerShadowVisible: false,
                    headerTintColor: "#4890E0",
                    headerTitleAlign: "center"
                }}
            />
            <Stack.Screen name="Register" component={RegisterScreen}
                options={{
                    title: "Đăng kí",
                    headerShadowVisible: false,
                    headerTintColor: "#4890E0",
                    headerTitleAlign: "center"
                }}
            />
            <Stack.Screen name="PostedRoom" component={PostedRoomScreen}
                options={{
                    title: "Phòng đã đăng",
                    headerShadowVisible: false,
                    headerTintColor: "#4890E0",
                    headerTitleAlign: "center",
                    headerShown: false
                }}
            />
            <Stack.Screen name="UpdateableRoom" component={UpdateableRoom}
                options={{
                    title: "Phòng đã đăng",
                    headerShadowVisible: false,
                    headerTintColor: "#4890E0",
                    headerTitleAlign: "center",
                    headerShown: false
                }}
            />

            <Stack.Screen name="UpdateRoom" component={UpdateRoom}
                options={({ route }) => ({
                        title: `${route.params.price}`,
                        headerShadowVisible: false,
                        headerTintColor: "#4890E0",
                        headerTitleAlign: "center"
                    })}
            />
        </Stack.Navigator>
    )
}

export default AccountTab
