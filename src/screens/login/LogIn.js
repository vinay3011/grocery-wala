import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase/firebaseConfig/firebase-config';

const LogIn = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerUserData, setRegisteredUserData] = useState([]);
    let currentUserUid;
    let currentUserIndex;

    // Whenever you run your project for first time, always try to configure google sign in 
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '597473505066-5k2pupnvtdvuua95kfura52vacaq2m5n.apps.googleusercontent.com',
        })
    }, [])

    const navToSignUp = () => {
        navigation.navigate('signupScreen')
    }

    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setuserInfo(userInfo);
            const currentUserInfo = {
                id: Number(new Date()),
                name: userInfo.user.name,
                email: userInfo.user.email,
                photo: userInfo.user.photo,
            }
            db.ref('CurrentUser').update({ [currentUserInfo.id]: currentUserInfo }).then(() => {
            }).catch((error) => {
            })
            navToDashboard();
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    const signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          setloggedIn(false);
          setuserInfo([]);
        } catch (error) {
          console.error(error);
        }
      };
    const navToDashboard = () => {
        navigation.navigate('drawer');
    }


 
    // reading data from realtime db
    useEffect(() => {
        db.ref("RegisteredUsers")
            .once("value")
            .then((item) => {
                let user = [];
                item.forEach((childSnapshot) => {
                    user.push(childSnapshot.val());
                });
                setRegisteredUserData(user);
            })
    }, []);
    // getting details of current user
    function getInfoOfEnteredData() {
        for (let i = 0; i < registerUserData.length; i++) {
            if (email == registerUserData[i].email && password == registerUserData[i].password) {
                currentUserUid = registerUserData[i].id;
                currentUserIndex = i;
                return true;
            }
        }
        return false;
    }
    let isUserExist = getInfoOfEnteredData();

    const updateCurrentUser = () => {
        const currentUserInfo = {
            id: registerUserData[currentUserIndex].id,
            name: registerUserData[currentUserIndex].name,
            email: registerUserData[currentUserIndex].email,
            phone: registerUserData[currentUserIndex].phone,
            password: registerUserData[currentUserIndex].password,
        };
        db.ref('CurrentUser').update({ [currentUserInfo.id]: currentUserInfo }).then(() => {
        }).catch((error) => {
        })

    }

    const settingValuesEmpty = () =>{
        setEmail('');
        setPassword('');
    }


    const validateAndSignIn = () => {
        let dot = email.indexOf(".");
        let atrate = email.indexOf("@");
        if (!email) {
            Alert.alert("Please enter the email.")
        } else if (!password) {
            Alert.alert("Please enter the password")
        }
        else if (dot < 1 || dot - atrate < 2) {
            Alert.alert("Wrong email format!");
        }
        else if (isUserExist == false) {
            Alert.alert("No such user found");
        }
        else if (password != registerUserData[currentUserIndex].password) {
            Alert.alert("Entered the wrong password")
        }
        else {
            settingValuesEmpty();
            updateCurrentUser();
            navToDashboard();
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.bigCircle}></View>
                <View style={styles.smallCircle}></View>
                <View style={styles.centerizedView}>
                    <View style={styles.authBox}>
                        <View style={styles.logoBox}>
                            <Image
                                style={{ height: 100, width: 100, borderRadius: 25 }}
                                source={require('../../assets/images/logo.jpeg')}
                            />
                        </View>
                        <Text style={styles.loginTitleText}>Login</Text>
                        <View style={styles.hr}></View>
                        <View style={styles.inputBox}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize={false}
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                value={email}
                                onChangeText={(email) => setEmail(email)}
                            />
                        </View>
                        <View style={styles.inputBox}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize={false}
                                secureTextEntry={true}
                                textContentType='password'
                                value={password}
                                onChangeText={(password) => setPassword(password)}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                validateAndSignIn();
                            }}
                            style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navToSignUp();
                            }}
                        >
                            <Text style={styles.registerText}>
                                Don't have an account? Register Now
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.socialMediaText} >OR</Text>
                        <View style={styles.socialLogInView}  >
                            <TouchableOpacity
                                onPress={() => {
                                    signInWithGoogle();
                                }}
                            >
                                <Image
                                    source={require('../../assets/icons/googleIcon.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    signOut();
                                }}
                            >
                                <Image
                                    source={require('../../assets/icons/metaIcon.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    bigCircle: {
        width: Dimensions.get('window').height * 0.7,
        height: Dimensions.get('window').height * 0.7,
        backgroundColor: '#EEBC1D',
        borderRadius: 1000,
        position: 'absolute',
        right: Dimensions.get('window').width * 0.25,
        top: -50,
    },
    smallCircle: {
        width: Dimensions.get('window').height * 0.4,
        height: Dimensions.get('window').height * 0.4,
        backgroundColor: '#1B1212',
        borderRadius: 1000,
        position: 'absolute',
        bottom: Dimensions.get('window').width * -0.2,
        right: Dimensions.get('window').width * -0.3,
    },
    centerizedView: {
        width: '100%',
        top: '15%',
    },
    authBox: {
        width: '80%',
        backgroundColor: '#fafafa',
        borderRadius: 20,
        alignSelf: 'center',
        paddingHorizontal: 14,
        paddingBottom: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logoBox: {
        width: 100,
        height: 100,
        backgroundColor: '#eb4d4b',
        borderRadius: 1000,
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: -50,
        marginBottom: -50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    loginTitleText: {
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 10,
    },
    hr: {
        width: '100%',
        height: 0.5,
        backgroundColor: '#444',
        marginTop: 6,
    },
    socialLogInView: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    inputBox: {
        marginTop: 10,
    },
    inputLabel: {
        fontSize: 18,
        marginBottom: 6,
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#dfe4ea',
        borderRadius: 4,
        paddingHorizontal: 10,
    },
    loginButton: {
        backgroundColor: '#ff4757',
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 4,
    },
    loginButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    registerText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    forgotPasswordText: {
        textAlign: 'center',
        marginTop: 12,
        fontSize: 16,
    },
    socialMediaText: {
        textAlign: 'center',
        paddingTop: 15,

    }
});
export default LogIn;