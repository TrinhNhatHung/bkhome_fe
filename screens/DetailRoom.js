import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatListSlider } from 'react-native-flatlist-slider';
import Utilities from '../components/Utilities';
import axiosClient from '../axiosConfig/AxiosClient';

const DetailRoom = ({ route }) => {
    const { roomId } = route.params;
    const [room, setRoom] = useState({
        images: [
            {
                link: ""
            }
        ],
        utilities: [],
        owner: {
            phone: "",
            fullname: ""
        }
    });

    const fetchDetailRoom = () => {
        axiosClient.get(`/detailRoom/${roomId}`)
            .then(
                res => setRoom(res.data)
            )
            .catch(
                error => console.log(error)
            );
    }

    useEffect(() => {
        fetchDetailRoom();
    }, []);
    return (
        <ScrollView style={styles.container}>
            <FlatListSlider
                data={room.images}
                imageKey={'link'}
                indicatorContainerStyle={{ position: 'absolute', bottom: 10 }}
                indicatorInActiveColor={'#fafafa'}
                indicatorActiveWidth={10}
                height={200}
                animation
            />
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
                    <Utilities utilities={room.utilities}/>
                </View>
                <View>
                    <Text style={styles.title} >Mô tả chi tiết</Text>
                    <Text>{room.detail} </Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default DetailRoom

const styles = StyleSheet.create({
    container : {
        backgroundColor : "#fff"
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
