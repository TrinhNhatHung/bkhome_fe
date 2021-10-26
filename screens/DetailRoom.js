import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatListSlider } from 'react-native-flatlist-slider';

const DetailRoom = ({ route }) => {
    const { room } = route.params;
    const data = [
        {
            data: room.urlImage
        },
        {
            data: room.urlImage
        }
    ]
    return (
        <ScrollView>
            <FlatListSlider
                data={data}
                imageKey={'data'}
                indicatorContainerStyle={{ position: 'absolute', bottom: 10 }}
                indicatorInActiveColor={'#ffffff'}
                indicatorActiveWidth={10}
                height={200}
                animation
            />
            <View style={styles.description} >
                <Text style={styles.title} >Cho thuê nhà nguyên căng 3.5 triệu</Text>
                <View style={styles.dFlexRow}>
                    <Ionicons style={styles.icon} name="location-outline" size={20} color="#4890E0" />
                    <Text>{room.position}</Text>
                </View>
                <View style={styles.dFlexRow}>
                    <Ionicons style={styles.icon} name="call" size={20} color="#4890E0" />
                    <Text>0123456789 - Nguyen Van A</Text>
                </View>
                <View style={styles.dFlexRow}>
                    <Ionicons style={styles.icon} name="square-outline" size={20} color="#4890E0" />
                    <Text>DT {room.area} m2</Text>
                </View>
                <View style={styles.dFlexRow}>
                    <Ionicons style={styles.icon} name="stopwatch-outline" size={20} color="#4890E0" />
                    <Text>2 giờ</Text>
                </View>
                <Text style={styles.title} >Tiện ích phòng</Text>
            </View>
        </ScrollView>
    )
}

export default DetailRoom

const styles = StyleSheet.create({
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
    description : {
        marginRight : 10,
        marginLeft : 10
    }
})
