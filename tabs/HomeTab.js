import React from 'react';
import RoomsScreen from '../screens/RoomsScreen';
import DetailRoom from '../screens/DetailRoom';

import { createStackNavigator } from '@react-navigation/stack';
import ModalScreen from '../screens/ModalScreen';

const Stack = createStackNavigator();

const HomeTab = () => {
    return (
        <Stack.Navigator
            initialRouteName="Rooms"
            options={{
                headerShadowVisible: false
            }}
        >
            <Stack.Group>
                <Stack.Screen name="Rooms" component={RoomsScreen}
                    options={{
                        title: 'Phòng mới đăng',
                        headerTintColor: "#4890E0",
                        headerShadowVisible: false
                    }} />
                <Stack.Screen name="Detail" component={DetailRoom}
                    options={({ route }) => ({
                        title: `${route.params.room.price}`,
                        headerShadowVisible: false,
                        headerTintColor: "#4890E0",
                        headerTitleAlign: "center"
                    })}
                />
            </Stack.Group>
            <Stack.Group screenOptions={{ 
                presentation: 'modal'
            }}>
                <Stack.Screen name="AddRoom"component={ModalScreen}
                    options={{
                        title: 'Đăng tin',
                        headerTintColor: "#4890E0",
                        headerShadowVisible: false,
                        headerTitleAlign: "center"
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default HomeTab
