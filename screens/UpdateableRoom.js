import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, RefreshControl } from 'react-native'
import axiosClient from '../axiosConfig/AxiosClient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Utilities from '../components/Utilities';
import { Header } from 'react-native-elements';

const UpdateableRoom = ({ route, navigation }) => {
    const { roomId } = route.params;
    const [room, setRoom] = useState({
        image: "",
        utilities: [],
        owner: {
            phone: "",
            fullname: ""
        },
        price : null
    });

    const [refreshing, setFreshing] = useState(false);

    const fetchDetailRoom = () => {
        axiosClient.get(`/detailRoom/${roomId}`)
            .then(
                res => {
                    setRoom(res.data)
                    setFreshing(false);
                }
            )
            .catch(
                error => console.log(error)
            );
    }

    useEffect(() => {
        fetchDetailRoom();
    }, []);

    const onRefresh = ()=> {
        setFreshing(true);
        fetchDetailRoom();
    }
    return (
        <View style={styles.container}>
            <Header
                leftComponent={{ icon: 'arrow-back', color: '#4890E0', onPress: () => navigation.goBack() }}
                centerComponent={{ text: room.price, style: { color: '#4890E0', fontSize: 20, fontWeight: "bold" } }}
                rightComponent={{
                    icon: 'edit',
                    color: '#4890E0', iconStyle: { fontSize: 25 },
                    onPress : ()=> navigation.navigate("UpdateRoom", { roomId : roomId, price : room.price })
                }}
                backgroundColor={"#fff"}
                statusBarProps={{ backgroundColor: "#4890E0" }}
            />
            <ScrollView 
                style={styles.container}
                refreshControl= {
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh= {onRefresh}
                    />
                }
            >
                <Image height={200} source={{uri :room.image}} />
                <View style={styles.description} >
                    <Text style={styles.title} >{room.title}</Text>
                    <View style={styles.dFlexRow}>
                        <Ionicons style={styles.icon} name="location-outline" size={20} color="#4890E0" />
                        <Text>{room.address}</Text>
                    </View>
                    <View style={styles.dFlexRow}>
                        <Ionicons style={styles.icon} name="call" size={20} color="#4890E0" />
                        <Text>{room.owner.phone} - {room.owner.fullname} </Text>
                    </View>
                    <View style={styles.dFlexRow}>
                        <Ionicons style={styles.icon} name="square-outline" size={20} color="#4890E0" />
                        <Text>DT {room.area} m2</Text>
                    </View>
                    <View style={styles.dFlexRow}>
                        <Ionicons style={styles.icon} name="stopwatch-outline" size={20} color="#4890E0" />
                        <Text>{room.updateAt}</Text>
                    </View>
                    <View>
                        <Text style={styles.title} >Tiện ích phòng ({room.utilities.length})</Text>
                        <Utilities utilities={room.utilities} />
                    </View>
                    <View>
                        <Text style={styles.title} >Mô tả chi tiết</Text>
                        <Text>{room.detail} </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default UpdateableRoom

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingBottom : 80
    },
    title: {
        color: "#4890E0",
        fontWeight: "600",
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10
    },
    dFlexRow: {
        flexDirection: "row",
        marginBottom: 8
    },
    icon: {
        marginRight: 5
    },
    description: {
        marginRight: 10,
        marginLeft: 10
    }
})
