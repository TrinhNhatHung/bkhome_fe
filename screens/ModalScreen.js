import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Image, AsyncStorage, ToastAndroid } from 'react-native';
import { Button, Input } from 'react-native-elements';
import ActiveWifi from "../assets/wifiactive.png";
import Wifi from "../assets/wifi.png";
import ActiveWC from "../assets/wcactive.png";
import WC from "../assets/wc.png";
import ActiveGiuXe from "../assets/giuxeactive.png";
import GiuXe from "../assets/giuxe.png";
import ActiveFree from "../assets/freeactive.png";
import Free from "../assets/free.png";
import ActiveBep from "../assets/bepactive.png";
import Bep from "../assets/bep.png";
import ActiveDieuHoa from "../assets/dieuhoaactive.png";
import DieuHoa from "../assets/dieuhoa.png";
import ActiveTulanh from "../assets/tulanhactive.png";
import Tulanh from "../assets/tulanh.png";
import ActiveMayGiat from "../assets/maygiatactive.png";
import MayGiat from "../assets/maygiat.png";
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import axiosClient from '../axiosConfig/AxiosClient';

const ModalScreen = ({ navigation }) => {

    const [utilities, setUtilities] = useState([]);

    const [room, setRoom] = useState({
        city: "",
        district: "",
        ward: "",
        address: "",
        price: null,
        area: null,
        utilities: [],
        title: "",
        detail: ""
    });

    const [errorMsg, setErrorMsg] = useState({
        city: "",
        district: "",
        ward: "",
        address: "",
        price: null,
        area: null,
        title: "",
        detail: ""
    });

    const defaultUtilities = [
        {
            id: 1,
            utility: "Wifi",
            icon: Wifi,
            activeIcon: ActiveWifi
        },
        {
            id: 2,
            utility: "WC riêng",
            icon: WC,
            activeIcon: ActiveWC
        },
        {
            id: 3,
            utility: "Giữ xe",
            icon: GiuXe,
            activeIcon: ActiveGiuXe
        },
        {
            id: 4,
            utility: "Tự do",
            icon: Free,
            activeIcon: ActiveFree
        },
        {
            id: 5,
            utility: "Bếp",
            icon: Bep,
            activeIcon: ActiveBep
        },
        {
            id: 6,
            utility: "Điều hòa",
            icon: DieuHoa,
            activeIcon: ActiveDieuHoa
        },
        {
            id: 7,
            utility: "Tủ lạnh",
            icon: Tulanh,
            activeIcon: ActiveTulanh
        },
        {
            id: 8,
            utility: "Máy giặt",
            icon: MayGiat,
            activeIcon: ActiveMayGiat
        }
    ];

    const firstRow = defaultUtilities.slice(0, 4);
    const secondRow = defaultUtilities.slice(4, 8);

    const pressUtilIcon = (utility) => {
        let position = utilities.indexOf(utility);
        let tmp = [...utilities];
        if (position === -1) {
            tmp.push(utility);
        } else {
            tmp.splice(position, 1);
        }
        setUtilities(tmp);
    }

    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);
    }

    const renderUtilities = (list) => {
        return list.map((item, index) => {
            let source = item.icon
            if (utilities.indexOf(item.id) !== -1) {
                source = item.activeIcon
            }
            return <TouchableOpacity key={index} activeOpacity={0.9} onPress={() => pressUtilIcon(item.id)}>
                <Image key={index} style={styles.icon} source={source} />
            </TouchableOpacity>
        })
    }

    const enterValue = (event, field) => {
        const { text } = event.nativeEvent;
        setRoom({
            ...room,
            [field]: text
        })
    }
    const submit = () => {
        let check = true;
        let msg = {
            city: "",
            district: "",
            ward: "",
            address: "",
            price: null,
            area: null,
            title: "",
            detail: ""
        }

        if (room.city === "") {
            check = false;
            msg.city = "* Bắt buộc";
        }

        if (room.district === "") {
            check = false;
            msg.district = "* Bắt buộc";
        }

        if (room.ward === "") {
            check = false;
            msg.ward = "* Bắt buộc";
        }
        if (room.address === "") {
            check = false;
            msg.address = "* Bắt buộc";
        }

        if (room.price === null) {
            check = false;
            msg.price = "* Bắt buộc";
        }

        if (room.area === null) {
            check = false;
            msg.area = "* Bắt buộc";
        }

        if (room.title === "") {
            check = false;
            msg.title = "* Bắt buộc";
        }

        if (room.detail === "") {
            check = false;
            msg.detail = "* Bắt buộc";
        }

        if (check) {
            let postedRoom = {
                ...room,
                utilities,
                address: room.address + "," + room.ward + "," + room.district + "," + room.city
            };

            AsyncStorage.getItem("token")
                .then((response) => {
                    var data = new FormData();
                    data.append("price", postedRoom.price);
                    data.append("area", postedRoom.area);
                    postedRoom.utilities.forEach((item) => data.append("utilities", item));
                    data.append("title", postedRoom.title);
                    data.append("detail", postedRoom.detail);
                    data.append("address", postedRoom.address);
                    var config = {
                        url: "/addRoom",
                        method: "post",
                        data,
                        headers: {
                            'Authorization': response,
                            ...data.getHeaders
                        },
                    };

                    axiosClient(config)
                        .then((response) => {
                            if (response.data.message !== undefined) {
                                ToastAndroid.show("Đăng tin thất bại", ToastAndroid.SHORT);
                            } else {
                                ToastAndroid.show("Đăng tin thành công", ToastAndroid.SHORT);
                                navigation.replace("Rooms");
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            ToastAndroid.show("Đăng tin thất bại", ToastAndroid.SHORT);
                        })
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setErrorMsg(msg);
        }

    }

    return (
        <ScrollView style={styles.container}>
            <Input
                label={"Chọn Tỉnh/TP"}
                placeholder='Tỉnh/TP'
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                onChange={(event) => enterValue(event, "city")}
                errorMessage={errorMsg.city}
            />
            <Input
                label={"Chọn Quận/Huyện"}
                placeholder='Quận/Huyện'
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                onChange={(event) => enterValue(event, "district")}
                errorMessage={errorMsg.district}
            />
            <Input
                label={"Phường/Xã"}
                placeholder='Phường/Xã'
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                onChange={(event) => enterValue(event, "ward")}
                errorMessage={errorMsg.ward}
            />
            <Input
                label={"Số nhà, tên đường"}
                placeholder='Nhập số nhà, tên đường'
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                onChange={(event) => enterValue(event, "address")}
                errorMessage={errorMsg.address}
            />
            <View style={styles.row} >
                <View style={styles.col}>
                    <Input
                        label={"Giá phòng (VND)"}
                        placeholder='300000'
                        inputContainerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        keyboardType="numeric"
                        onChange={(event) => enterValue(event, "price")}
                        errorMessage={errorMsg.price}
                    />
                </View>
                <View style={styles.col}>
                    <Input
                        label={"Diện tích (m2)"}
                        placeholder='20'
                        inputContainerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        keyboardType="numeric"
                        onChange={(event) => enterValue(event, "area")}
                        errorMessage={errorMsg.area}
                    />
                </View>
            </View>
            <View style={styles.utilities}>
                <View style={styles.rowIcons}>
                    {
                        renderUtilities(firstRow)
                    }
                </View>
                <View style={styles.rowIcons}>
                    {
                        renderUtilities(secondRow)
                    }
                </View>
            </View>
            <Input
                label={"Tiêu đề bài đăng"}
                placeholder='Nhập tiêu đề bài đăng'
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                onChange={(event) => enterValue(event, "title")}
                errorMessage={errorMsg.title}
            />
            <Input
                label={"Mô tả"}
                placeholder=''
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                multiline={true}
                numberOfLines={5}
                onChange={(event) => enterValue(event, "detail")}
                errorMessage={errorMsg.detail}
            />
            <Button
                buttonStyle={styles.btn}
                title="Đăng"
                onPress={submit}
            />
        </ScrollView>
    )
}

export default ModalScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        backgroundColor: "#fff"
    },
    inputContainer: {
        borderRadius: 5,
        borderColor: "#B4BDC1",
        borderWidth: 1,
        paddingLeft: 15,
        paddingRight: 5,
        marginTop: 5
    },
    input: {
    },
    row: {
        flexDirection: "row"
    },
    col: {
        width: "50%"
    },
    rowIcons: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    icon: {
        height: 75,
        marginBottom: 10
    },
    utilities: {
        marginRight: 7,
        marginLeft: 7
    },
    btn: {
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 20
    }
})
