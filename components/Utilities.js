import React from 'react'
import { Image, View } from 'react-native';
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
import { StyleSheet } from 'react-native';

const Utilities = ({ utilities }) => {

    const defaultUtilities = [
        {
            utility: "Wifi",
            icon: Wifi,
            activeIcon: ActiveWifi
        },
        {
            utility: "WC riêng",
            icon: WC,
            activeIcon: ActiveWC
        },
        {
            utility: "Giữ xe",
            icon: GiuXe,
            activeIcon: ActiveGiuXe
        },
        {
            utility: "Tự do",
            icon: Free,
            activeIcon: ActiveFree
        },
        {
            utility: "Bếp",
            icon: Bep,
            activeIcon: ActiveBep
        },
        {
            utility: "Điều hòa",
            icon: DieuHoa,
            activeIcon: ActiveDieuHoa
        },
        {
            utility: "Tủ lạnh",
            icon: Tulanh,
            activeIcon: ActiveTulanh
        },
        {
            utility: "Máy giặt",
            icon: MayGiat,
            activeIcon: ActiveMayGiat
        }
    ];

    const firstRow = defaultUtilities.slice(0, 4);
    const secondRow = defaultUtilities.slice(4, 8);


    return (
        <View>
            <View style={styles.rowIcons}>
                {
                    firstRow.map((item, index) => {
                        if (utilities.indexOf(item.utility) !== -1) {
                           return <Image key={index} style={styles.icon} source={item.activeIcon} />
                        }
                        return <Image style={styles.icon} source={item.icon} />
                    })
                }
            </View>
            <View style={styles.rowIcons}>
                {
                    secondRow.map((item, index) => {
                        if (utilities.indexOf(item.utility) !== -1) {
                           return <Image key={index} style={styles.icon} source={item.activeIcon} />
                        }
                        return <Image style={styles.icon} source={item.icon} />
                    })
                }
            </View>
        </View>
    )
}

export default Utilities

const styles = StyleSheet.create({
    rowIcons: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    icon: {
        height: 75,
        marginBottom: 10
    }
});
