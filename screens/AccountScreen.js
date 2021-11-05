import React, { useEffect, useState } from 'react'
import { AsyncStorage, StyleSheet, View } from 'react-native'
import { Avatar, Text, ListItem } from "react-native-elements";
import axiosClient from '../axiosConfig/AxiosClient';

const AccountScreen = ({ navigation }) => {

    const checkLogged = () => {

        AsyncStorage.getItem("token")
            .then((response) => {
                var config = {
                    url: '/checkLogin',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'Authorization': response
                    },
                };

                axiosClient(config)
                    .then((response) => {
                        if (!response.data.isAuthenticated) {
                            navigation.replace("Login");
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

    checkLogged();

    const list = [
        {
            title: "Phòng đã đăng",
            onPress: () => {
                navigation.navigate("PostedRoom")
            }
        },
        {
            title: "Đăng xuất",
            onPress: () => {
                AsyncStorage.removeItem("token");
                navigation.replace("Login")
            }
        }
    ];

    const [user, setUser] = useState({
        fullname: ""
    });

    const fetchUser = async () => {

        const token = await AsyncStorage.getItem("token");

        var config = {
            url: '/user/info',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': token
            }
        };

        axiosClient(config)
            .then(function (response) {
                setUser(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <View style={styles.container}>
            <Avatar
                size="large"
                rounded
                title="HT"
                containerStyle={{
                    backgroundColor: "#458FE2",
                    marginTop: 20,
                    marginBottom: 10
                }}
            />
            <Text style={styles.name}>{user.fullname}</Text>
            <View style={styles.list}>
                {
                    list.map((item, index) => (
                        <ListItem style={styles.listItem} key={index} bottomDivider topDivider>
                            <ListItem.Content>
                                <ListItem.Title onPress={item.onPress} style={styles.title}>{item.title}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    ))
                }
            </View>
        </View>
    )
}

export default AccountScreen

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#fff",
        height: "100%"
    },
    name: {
        color: "#777777",
        fontSize: 20,
        fontWeight: "bold"
    },
    list: {
        width: "90%",
        marginTop: 20
    },
    listItem: {
        width: "100%"
    },
    title: {
        color: "#4890E0"
    }
})
