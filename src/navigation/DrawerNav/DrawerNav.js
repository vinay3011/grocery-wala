import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet } from "react-native";
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import UserDetails from "../../screens/userDetails/UserDetail";
import Home from "../../screens/home/Home";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase/firebaseConfig/firebase-config";
import AboutApp from "../../screens/aboutApp/AboutApp";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
    const [currentUserInfo, setcurrentUserInfo] = useState([]);
    const navigation = useNavigation();
    let isLoggedInThroughGoogle = false;
    const navToLoginPage = () => {
        navigation.navigate('loginScreen');
    }

    useEffect(() => {
        db.ref("CurrentUser")
            .once("value")
            .then((item) => {
                let data = [];
                item.forEach((childSnapshot) => {
                    data.push(childSnapshot.val());
                });
                setcurrentUserInfo(data);
            })

        for (let i = 0; i < currentUserInfo.length; i++) {
            if (currentUserInfo[i].isSignInWithGoole) {
                isLoggedInThroughGoogle = true;
            }
        }
    }, [])


    const signOutGoogle = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
        } catch (error) {
            console.error(error);
        }
        db.ref('CurrentUser').remove().then(() => {
            navToLoginPage();
        }).catch((error) => {
            Alert.alert(error)
        })
    };


    const logOut = async () => {
        db.ref('CurrentUser').remove().then(() => {
            navToLoginPage();
        }).catch((error) => {
            Alert.alert(error);
        })
    }
    return (
        <Drawer.Navigator initialRouteName="Grocery Wala"
            drawerContent={props => {
                return (
                    <DrawerContentScrollView>
                        <DrawerItemList{...props} />
                        {(isLoggedInThroughGoogle == true) ? <DrawerItem label="Logout" onPress={() => { signOutGoogle() }} /> : <DrawerItem label="Logout" onPress={() => { logOut() }} />}
                    </DrawerContentScrollView>
                )
            }}

            screenOptions={{
                drawerLabelStyle: { marginLeft: -10, fontSize: 18 },
                drawerActiveBackgroundColor: "#FA0309",
                drawerInactiveBackgroundColor: "#33333",
                drawerActiveTintColor: "#fff",
                drawerInactiveTintColor: "#33333",
            }}
        >
            <Drawer.Screen
                name="Your Profile"
                component={UserDetails}
                options={{
                    drawerIcon: () =>
                        !currentUserInfo ? <Image style={styles.imgProfile} source={{ uri: currentUserInfo[0].image }} /> :
                            <Image style={styles.imgProfile} source={{ uri: 'https://www.sketchappsources.com/resources/source-image/profile-illustration-gunaldi-yunus.png' }} />

                }}
            />
            <Drawer.Screen
                name="Grocery Wala"
                component={Home}
                options={{
                    drawerIcon: () => (
                        <Image style={styles.imgIcon} source={{ uri: 'https://img.icons8.com/glyph-neue/344/home.png' }}
                        />
                    )
                }}
            />

            <Drawer.Screen
                name="About App"
                component={AboutApp}
                options={{
                    drawerIcon: () => (
                        <Image style={styles.imgIcon} source={{ uri: 'https://img.icons8.com/dotty/344/about.png' }}
                        />
                    )
                }}
            />
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    imgIcon: {
        height: 20,
        width: 20
    },
    imgProfile: {
        height: 200,
        width: '100%',
        borderRadius: 15
    }
})

export default DrawerNav;
