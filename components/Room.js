import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Room = ({ room, navigation }) => {
    return (
        <TouchableOpacity 
            style={styles.touch} 
            activeOpacity={1} 
            onPress={()=> navigation.navigate("Detail", {roomId : room.roomId, price : room.price})}
        >
            <View style={styles.container}>
                <View style={styles.thumbnail}>
                    <Image style={styles.image} source={{ uri: room.image }} />
                    <Text style={styles.price}>{room.price}</Text>
                </View>
                <View style={styles.dFlexRow}>
                    <Ionicons style={styles.icon} name="location-outline" size={20} color="#4890E0" />
                    <Text style={styles.text}>{room.address}</Text>
                </View>
                <View style={styles.dFlexRow}>
                    <Ionicons style={styles.icon} name="square-outline" size={15} color="#4890E0" />
                    <Text style={styles.text}>DT: {room.area} m2</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Room

const styles = StyleSheet.create({
    touch : {
        width : "50%"
    },
    container: {
        width: "100%",
        padding: 5
    },
    thumbnail: {
        position: "relative"
    },
    image: {
        width: "100%",
        height: 130,
        borderRadius: 5
    },
    price: {
        color: "#fff",
        backgroundColor: "#4890E0",
        position: "absolute",
        bottom: 0,
        paddingTop: 5,
        paddingBottom: 4,
        paddingLeft: 10,
        paddingRight: 10
    },
    dFlexRow: {
        flexDirection: "row",
        alignItems: "center"
    },
    icon: {
        marginRight: 5
    },
    text : {
        width : 135,
        fontSize : 12
    }
})
