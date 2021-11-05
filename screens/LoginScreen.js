import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Input, Button } from 'react-native-elements'
import queryString from 'query-string';
import axiosClient from "../axiosConfig/AxiosClient.js"
import { AsyncStorage } from 'react-native';
import { StackActions } from '@react-navigation/routers';

const LoginScreen = ({ navigation }) => {

    const [user, setUser] = useState({
        id: "",
        password: ""
    });

    const [errorMsg, setErrorMsg] = useState({
        id: "",
        password: "",
        common: ""
    });

    const enterUsername = (event) => {
        const { text } = event.nativeEvent;
        setUser({
            ...user,
            id: text
        })
    }

    const enterPassword = (event) => {
        const { text } = event.nativeEvent;
        setUser({
            ...user,
            password: text
        })
    }

    const submit = () => {
        let check = true;
        let msg = {
            id: "",
            password: ""
        }
        if (user.id === "") {
            check = false;
            msg.id = "* Bắt buộc"
        }

        if (user.password === "") {
            check = false;
            msg.password = "* Bắt buộc"
        }

        if (check) {
            var data = queryString.stringify(user);
            var config = {
                method: 'post',
                url: '/login',
                data: data
            };
            axiosClient(config)
                .then(function (response) {
                    const { message } = response.data;
                    if (message === undefined) {
                        AsyncStorage.setItem("token", user.id + "/" + user.password);
                        navigation.dispatch(
                            StackActions.replace('Profile')
                        );
                    } else {
                        msg.common = "* " + message;
                        setErrorMsg(msg);
                    }
                })
                .catch(function (error) {
                    setErrorMsg({
                        id: "",
                        password: "",
                        common: "Đăng nhập lỗi"
                    })
                });
        } else {
            setErrorMsg(msg);
        }
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder='Username'
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                errorMessage={errorMsg.id}
                onChange={enterUsername}
            />
            <Input
                placeholder='Password'
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                errorMessage={errorMsg.password}
                secureTextEntry={true}
                onChange={enterPassword}
            />
            <Text style={styles.commonError}>{errorMsg.common}</Text>
            <Button
                onPress={submit}
                buttonStyle={styles.button}
                title="Đăng nhập"
            />
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Register")}>
                <Text style={styles.text}>Chưa có tài khoản? Đăng ký tại đây</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: "100%",
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 20
    },
    inputContainer: {
        borderRadius: 5,
        borderColor: "#B4BDC1",
        borderWidth: 1,
        paddingLeft: 15,
        paddingRight: 5,
        height: 50
    },
    button: {
        height: 50,
        marginLeft: 10,
        marginRight: 10
    },
    text: {
        color: "#4890E0",
        textAlign: "center",
        marginTop: 20
    },
    commonError: {
        color: "red",
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    }
})
