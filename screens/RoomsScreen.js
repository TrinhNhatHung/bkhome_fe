import React, { useState } from 'react'
import { FlatList, View, StyleSheet,TouchableOpacity, Text } from 'react-native'
import Room from '../components/Room';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RoomsScreen = ({ navigation }) => {
    const [data, setData] = useState([
        {
            id: 1,
            price: 300000,
            position: "237 Hùng Vương, Thanh Khê, Đà Nẵng",
            area: 24,
            urlImage: "https://dummyimage.com/193x100.png/000000/ffffff"
        },
        {
            id: 2,
            price: 300000,
            position: "237 Hùng Vương, Thanh Khê, Đà Nẵng",
            area: 24,
            urlImage: "https://dummyimage.com/193x100.png/000000/ffffff"
        },
        {
            id: 3,
            price: 300000,
            position: "237 Hùng Vương, Thanh Khê, Đà Nẵng",
            area: 24,
            urlImage: "https://dummyimage.com/193x100.png/000000/ffffff"
        },
        {
            id: 1,
            price: 300000,
            position: "237 Hùng Vương, Thanh Khê, Đà Nẵng",
            area: 24,
            urlImage: "https://dummyimage.com/193x100.png/000000/ffffff"
        },
        {
            id: 2,
            price: 300000,
            position: "237 Hùng Vương, Thanh Khê, Đà Nẵng",
            area: 24,
            urlImage: "https://dummyimage.com/193x100.png/ff4444/ffffff"
        },
        {
            id: 3,
            price: 300000,
            position: "237 Hùng Vương, Thanh Khê, Đà Nẵng",
            area: 24,
            urlImage: "https://dummyimage.com/193x100.png/000000/ffffff"
        },
        {
            id: 1,
            price: 300000,
            position: "237 Hùng Vương, Thanh Khê, Đà Nẵng",
            area: 24,
            urlImage: "https://dummyimage.com/193x100.png/000000/ffffff"
        },
        {
            id: 2,
            price: 300000,
            position: "237 Hùng Vương, Thanh Khê, Đà Nẵng",
            area: 24,
            urlImage: "https://dummyimage.com/193x100.png/000000/ffffff"
        },
        {
            id: 3,
            price: 300000,
            position: "237 Hùng Vương, Thanh Khê, Đà Nẵng",
            area: 24,
            urlImage: "https://dummyimage.com/193x100.png/000000/ffffff"
        }
    ]);
    return (
        <View>
            <FlatList
                data={data}
                numColumns={2}
                renderItem={({ item }) => <Room room={item} navigation={navigation} />}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity activeOpacity={0.8} style={styles.fab} onPress={()=> navigation.navigate("AddRoom")}>
                <Ionicons name="md-pencil-sharp" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative"
    },
    fab: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 60,
        backgroundColor: '#E85858',
        borderRadius: 50,
        elevation: 8
      },
      fabIcon: {
        fontSize: 40,
        color: 'white'
      }
})

export default RoomsScreen
