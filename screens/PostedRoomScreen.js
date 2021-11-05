import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, Image, Text, AsyncStorage, Alert, ToastAndroid } from 'react-native'
import { Header } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axiosClient from '../axiosConfig/AxiosClient';
import qs from 'query-string';
const PostedRoom = ({ room }) => {
    return (
        <View style={stylePostedRoom.container}>
            <View style={stylePostedRoom.thumbnail}>
                <Image style={stylePostedRoom.image} source={{ uri: room.image }} />
                <Text style={stylePostedRoom.price}>{room.price}</Text>
            </View>
            <View style={stylePostedRoom.content}>
                <Text style={stylePostedRoom.title}>{room.title}</Text>
                <View style={stylePostedRoom.row}>
                    <Ionicons style={stylePostedRoom.icon} name="location-outline" size={20} color="#4890E0" />
                    <Text>{room.address}</Text>
                </View>
                <View style={stylePostedRoom.row}>
                    <Ionicons style={stylePostedRoom.icon} name="square-outline" size={20} color="#4890E0" />
                    <Text>DT {room.area} m2</Text>
                </View>
                <View style={stylePostedRoom.row}>
                    <Ionicons style={stylePostedRoom.icon} name="stopwatch-outline" size={20} color="#4890E0" />
                    <Text>{room.updateAt}</Text>
                </View>
            </View>
        </View>
    )
}

const stylePostedRoom = StyleSheet.create({
    thumbnail: {
        width: "35%",
        marginRight: 5,
        position: "relative"
    },
    price: {
        position: "absolute",
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: "#4890E0",
        color: "#fff"
    },
    image: {
        height: 100,
        width: "100%",
        borderRadius: 5
    },
    container: {
        flexDirection: "row",
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    row: {
        flexDirection: "row"
    },
    icon: {
        marginRight: 5
    },
    title: {
        color: "#4890E0",
        fontSize: 17,
        fontWeight: "bold"
    }
});

const PostedRoomScreen = ({ navigation }) => {
    const [data, setData] = useState([]);

    const [selectedRoom, setSelectedRoom] = useState([]);

    const addSelectedRoom = (roomId) => {
        let position = selectedRoom.indexOf(roomId);
        if (position === -1) {
            let arr = [...selectedRoom];
            arr.push(roomId);
            setSelectedRoom(arr);
        } else {
            let arr = [...selectedRoom];
            arr.splice(position, 1);
            setSelectedRoom(arr);
        }
    }

    const fetchData = () => {
        AsyncStorage.getItem("token")
            .then((response) => {
                var config = {
                    url: '/roomByUser',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'Authorization': response
                    },
                };

                axiosClient(config)
                    .then((response) => {
                        setData(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const checkActive = (roomId) => {
        return selectedRoom.indexOf(roomId) !== -1;
    }

    const requestDelete = () => {
        AsyncStorage.getItem("token")
            .then((response) => {
                var data = qs.stringify({
                    rooms : selectedRoom
                });
                var config = {
                    url: '/deleteRooms',
                    method: "delete",
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'Authorization': response
                    },
                    data
                };

                axiosClient(config)
                    .then((response) => {
                        if (response.data.message !== undefined) {
                            ToastAndroid.show("Xóa thất bại", ToastAndroid.SHORT);
                        } else {
                            fetchData();
                            ToastAndroid.show("Xóa thành công", ToastAndroid.SHORT);
                            setSelectedRoom([]);
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

    const deleteAll = () => {
        Alert.alert(
            "Xóa ?",
            "Bạn có chắc muốn xóa bài đăng ?",
            [
                {
                    text: "Xóa",
                    onPress: () => requestDelete()
                },
                {
                    text: "Hủy",
                    style: "cancel"
                }
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={styles.container}>
            <Header
                leftComponent={{ icon: 'arrow-back', color: '#4890E0', onPress: () => navigation.goBack() }}
                centerComponent={{ text: 'Phòng đã đăng', style: { color: '#4890E0', fontSize: 20, fontWeight: "bold" } }}
                rightComponent={{
                    icon: 'restore-from-trash',
                    color: '#4890E0', iconStyle: { fontSize: 25 },
                    onPress: deleteAll
                }}
                backgroundColor={"#fff"}
                statusBarProps={{ backgroundColor: "#4890E0" }}
            />
            <FlatList
                style={styles.list}
                data={data}
                renderItem={({ item }) => <TouchableOpacity style={styles.item} onLongPress={() => addSelectedRoom(item.roomId)}>
                    <PostedRoom room={item} />
                    {checkActive(item.roomId) && <Ionicons style={styles.icon} name="checkmark-circle-sharp" size={35} color="#E85858" />}
                </TouchableOpacity>}
                keyExtractor={item => item.roomId}
            />
        </View>
    )
}

export default PostedRoomScreen

const styles = StyleSheet.create({
    container: {
        position: "relative"
    },
    list: {
        marginTop: 15,
        marginBottom : 70
    },
    item: {
        position: "relative"
    },
    activeItem: {

    },
    icon: {
        position: "absolute",
        top: "25%",
        right: 20
    }
})
