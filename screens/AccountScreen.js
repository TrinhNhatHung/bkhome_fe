import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar, Text } from "react-native-elements";

const AccountScreen = () => {
    return (
        <View style={styles.container}>
            <Avatar
                size="large"
                rounded
                title="HT"
                containerStyle={{
                    backgroundColor : "#458FE2",
                }}
            />
            <Text style={styles.name}>Hưng Trịnh</Text>
        </View>
    )
}

export default AccountScreen

const styles = StyleSheet.create({
    container : {
        alignItems : "center"
    },
    name : {
        color : "#777777",
        fontSize : 20,
        fontWeight : "bold"
    }
})
