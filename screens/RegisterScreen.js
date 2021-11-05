import React, { useState } from 'react'
import { StyleSheet, ScrollView, Text, AsyncStorage } from 'react-native'
import { Button, Input } from 'react-native-elements'
import axiosClient from "../axiosConfig/AxiosClient.js"
import queryString from 'query-string';
import { StackActions } from '@react-navigation/routers';

const RegisterScreen = ({ navigation }) => {

    const [user, setUser] = useState({
        id: "",
        fullname: "",
        phone: "",
        password: "",
        rePassword: ""
    });

    const [errorMsg, setErrorMsg] = useState({
        id: "",
        fullname: "",
        phone: "",
        password: "",
        rePassword: ""
    })

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



    const enterRepassword = (event) => {
        const { text } = event.nativeEvent;
        setUser({
            ...user,
            rePassword: text
        })
    }

    const enterFullname = (event) => {
        const { text } = event.nativeEvent;
        setUser({
            ...user,
            fullname: text
        })
    }

    const enterPhone = (event) => {
        const { text } = event.nativeEvent;
        setUser({
            ...user,
            phone: text
        })
    }

    const submit = async () => {
        let check = true;
        let msg = {
            id: "",
            fullname: "",
            phone: "",
            password: "",
            rePassword: ""
        }
        if (user.id === "") {
            check = false;
            msg.id = "* Bắt buộc"
        }

        if (user.phone === "") {
            check = false;
            msg.phone = "* Bắt buộc"
        }

        if (user.fullname === "") {
            check = false;
            msg.fullname = "* Bắt buộc"
        }

        if (user.password === "") {
            check = false;
            msg.password = "* Bắt buộc"
        }

        if (user.password !== user.rePassword) {
            check = false;
            msg.rePassword = "* Phải giống với password"
        }


        if (check) {
            var data = queryString.stringify(user);
            var config = {
                method: 'post',
                url: '/register',
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
                        msg.id = "* " + message;
                        setErrorMsg(msg);
                    }
                })
                .catch(function (error) {
                    setErrorMsg({
                        id: "",
                        fullname: "",
                        phone: "",
                        password: "",
                        rePassword: "",
                        common: "Đăng ký lỗi"
                    })
                });
        } else {
            setErrorMsg(msg);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Input
                placeholder='Username'
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                onChange={enterUsername}
                errorMessage={errorMsg.id}
            />
            <Input
                placeholder='Họ và tên'
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                onChange={enterFullname}
                errorMessage={errorMsg.fullname}
            />
            <Input
                placeholder='Số điện thoại'
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                keyboardType="numeric"
                onChange={enterPhone}
                errorMessage={errorMsg.phone}
            />
            <Input
                placeholder='Mật khẩu'
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                secureTextEntry={true}
                onChange={enterPassword}
                errorMessage={errorMsg.password}
            />
            <Input
                placeholder='Nhập lại mật khẩu'
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                secureTextEntry={true}
                onChange={enterRepassword}
                errorMessage={errorMsg.rePassword}
            />
            <Text style={styles.commonError}>{errorMsg.common}</Text>
            <Button
                buttonStyle={styles.button}
                title="Tạo tài khoản"
                onPress={submit}
            />
        </ScrollView>
    )
}

export default RegisterScreen

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

