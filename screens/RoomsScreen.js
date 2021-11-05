import React, { useEffect, useState } from 'react'
import { FlatList, View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import Room from '../components/Room';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axiosClient from '../axiosConfig/AxiosClient';
import { Alert } from 'react-native';

const RoomsScreen = ({ navigation }) => {
    const [data, setData] = useState([]);

    const fetchData = () => {
        axiosClient.get("/rooms")
            .then(
                res => setData(res.data)
            )
            .catch(
                error => console.log(error)
            );
    }

    useEffect(() => {
        fetchData();
    }, []);

    const navigateToAddRoom = () => {
        let token = "";
        AsyncStorage.getItem("token")
            .then((response) => {
                token = response;
                var config = {
                    url: '/checkLogin',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'Authorization': token
                    },
                };

                axiosClient(config)
                    .then((response) => {
                        if (response.data.isAuthenticated) {
                            navigation.navigate("AddRoom");
                        } else {
                            Alert.alert("Bạn cần phải đăng nhập để thực hiện đăng tin");
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <View>
            <FlatList
                data={data}
                numColumns={2}
                renderItem={({ item }) => <Room room={item} navigation={navigation} />}
                keyExtractor={item => item.roomId}
            />
            <TouchableOpacity activeOpacity={0.8} style={styles.fab} onPress={navigateToAddRoom}>
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
