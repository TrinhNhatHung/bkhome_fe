import React, { useEffect, useState } from 'react'
import { View, ScrollView, StyleSheet, Image, AsyncStorage, ToastAndroid, Text } from 'react-native'
import { Button, Input } from 'react-native-elements'
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
import Ionicons from 'react-native-vector-icons/Ionicons';

const UpdateRoom = ({ route, navigation }) => {

    const { roomId } = route.params;

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
        detail: "",
        image : ""
    });

    const [errorMsg, setErrorMsg] = useState({
        city: "",
        district: "",
        ward: "",
        address: "",
        price: null,
        area: null,
        title: "",
        detail: "",
        image: ""
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

    const fetchDetailRoom = () => {
        axiosClient.get(`/detailRoom/${roomId}`)
            .then(
                res => {
                    let strings = res.data.address.split(",");
                    setRoom({
                        ...res.data,
                        city: strings[3],
                        district: strings[2],
                        ward: strings[1],
                        address: strings[0]
                    })
                    setUtilities(res.data.utilities)
                }
            )
            .catch(
                error => console.log(error)
            );
    }

    useEffect(() => {
        fetchDetailRoom();
    }, []);

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
        setRoom({
            ...room,
            image: pickerResult.uri
        })
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
            detail: "",
            image : ""
        }

        if (room.city === "" || room.city === undefined) {
            check = false;
            msg.city = "* Bắt buộc";
        }

        if (room.district === "" || room.district === undefined) {
            check = false;
            msg.district = "* Bắt buộc";
        }

        if (room.ward === "" || room.ward === undefined) {
            check = false;
            msg.ward = "* Bắt buộc";
        }
        if (room.address === "" || room.address === undefined) {
            check = false;
            msg.address = "* Bắt buộc";
        }

        if (room.price === null || room.price === undefined || room.price === "") {
            check = false;
            msg.price = "* Bắt buộc";
        }

        if (room.area === null || room.area === undefined || room.area === "") {
            check = false;
            msg.area = "* Bắt buộc";
        }

        if (room.title === "" || room.title === undefined) {
            check = false;
            msg.title = "* Bắt buộc";
        }

        if (room.detail === "" || room.detail === undefined) {
            check = false;
            msg.detail = "* Bắt buộc";
        }

        if (room.image === "") {
            check = false;
            msg.image = "* Bắt buộc";
        }

        if (check) {
            let postedRoom = {
                ...room,
                utilities,
                address: room.address + ", " + room.ward + ", " + room.district + ", " + room.city
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
                    data.append("id", roomId);
                    data.append("imageFile", {
                        name : "image.jpg",
                        uri : postedRoom.image,
                        type : "image/uri",
                        type : 'image/jpg'
                    });

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
                                navigation.goBack();
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
                value={room.city}
            />
            <Input
                label={"Chọn Quận/Huyện"}
                placeholder='Quận/Huyện'
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                onChange={(event) => enterValue(event, "district")}
                errorMessage={errorMsg.district}
                value={room.district}
            />
            <Input
                label={"Phường/Xã"}
                placeholder='Phường/Xã'
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                onChange={(event) => enterValue(event, "ward")}
                errorMessage={errorMsg.ward}
                value={room.ward}
            />
            <Input
                label={"Số nhà, tên đường"}
                placeholder='Nhập số nhà, tên đường'
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                onChange={(event) => enterValue(event, "address")}
                errorMessage={errorMsg.address}
                value={room.address}
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
                        value={"" + room.price}
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
                        value={"" + room.area}
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
                value={room.title}
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
                value={room.detail}
            />
            <TouchableOpacity
                style={styles.pickImage}
                onPress={openImagePickerAsync}
            >
                <Ionicons name="image" size={30} color="#4890E0" />
                <Text style={styles.text}>Chọn ảnh</Text>
            </TouchableOpacity>
            <View style={styles.pickedImageContainer}>
                <Image style={styles.pickedImage} source={{ uri: room.image }} />
            </View>
            <Text style={styles.error}>{errorMsg.image}</Text>
            <Button
                buttonStyle={styles.btn}
                title="Cập nhật"
                onPress={submit}
            />
        </ScrollView>
    )
}

export default UpdateRoom

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
    },
    pickImage : {
        width : "35%",
        flexDirection : 'row',
        alignItems : "center",
        marginLeft : 10,
        marginBottom : 10
    },
    text : {
        marginLeft : 5,
        color : "#4890E0"
    },
    pickedImageContainer: {
        height: 200,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        borderColor: "#B3B7C0",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 5
    },
    pickedImage: {
        height: 100,
        width: 70,
        margin: 10
    },
    error: {
        marginLeft: 15,
        color: "red",
        fontSize: 12
    }
})
