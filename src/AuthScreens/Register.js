import React, {useContext, useState} from "react";
import {Alert, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {Text, TextInput} from "react-native-paper";
import MyButton from "../component/MyButton";
import {ThemeContext} from "../context/ThemeContext";
import {AuthContext} from "../context/AuthService";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const Register = ({navigation}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')

    const [isVisible, setIsVisible] = useState(false)

    const themeValue = useContext(ThemeContext)

    const handlePress = () => {
        setIsVisible(prevState => !prevState)
    }

    const {register} = useContext(AuthContext)
    const usersCollection = firestore().collection('Users');

    const registerUser = () => {
        if (validateFields()) {
            addUser().then((res) => {
                if (res) {
                    usersCollection.doc(auth().currentUser.uid).set({
                        Name: name,
                        Email: email
                    }).then(() => console.log("Added"))
                }
            })
        } else {
            Alert.alert("Error", "Please Enter Valid Details")
        }
    }

    const addUser = async () => {
        await register(email.trim(), password.trim())
        return true
    }

    const validateFields = () => {
        const emailRegx = new RegExp('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\u0001-\b\u000B\f\u000E-\u001F!#-[]-\u007F]|\\\\[\u0001-\t\u000B\f\u000E-\u007F])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\u0001-\b\u000B\f\u000E-\u001F!-ZS-\u007F]|\\\\[\u0001-\t\u000B\f\u000E-\u007F])+)])')
        return !(!emailRegx.test(email) || email === '' || password === '' || password.length < 8 || password !== confPassword || name === '');
    }

    return (
        <View style={styles.body}>
            <View style={styles.header}>
                <Text style={styles.title}>Register</Text>
            </View>
            <TextInput mode={'outlined'}
                       label={"Name"}
                       placeholder={"Enter Name"}
                       error={false}
                       onChangeText={(txt) => setName(txt)}
                       value={name}
                       returnKeyType={'next'}
                       theme={themeValue.theme}/>

            <TextInput mode={'outlined'}
                       label={"Email"}
                       placeholder={"Enter Email"}
                       error={false}
                       onChangeText={(txt) => setEmail(txt)}
                       value={email}
                       keyboardType={'email-address'}
                       returnKeyType={'next'}
                       theme={themeValue.theme}/>

            <TextInput mode={'outlined'}
                       label={"Password"}
                       placeholder={"Enter Password"}
                       error={false}
                       onChangeText={(txt) => setPassword(txt)}
                       value={password}
                       returnKeyType={'done'}
                       secureTextEntry={!isVisible}
                       right={isVisible ? <TextInput.Icon name="eye-off"
                                                          onPress={handlePress}/> :
                           <TextInput.Icon name="eye"
                                           onPress={handlePress}/>}
                       theme={themeValue.theme}/>

            <TextInput mode={'outlined'}
                       label={"Confirm Password"}
                       placeholder={"Enter Password"}
                       error={false}
                       onChangeText={(txt) => setConfPassword(txt)}
                       value={confPassword}
                       returnKeyType={'done'}
                       secureTextEntry={!isVisible}
                       right={isVisible ? <TextInput.Icon name="eye-off"
                                                          onPress={handlePress}/> :
                           <TextInput.Icon name="eye"
                                           onPress={handlePress}/>}
                       theme={themeValue.theme}/>

            <View style={{marginTop: 8}}>
                <MyButton theme={themeValue.theme} text={"Register"} onPress={registerUser}/>
            </View>

            <View style={styles.bottom}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <Text style={styles.label}>Login</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    body: {
        flex: 1,
        margin: 8,
        justifyContent: "center",
    },
    header: {
        alignItems: "center",
        margin: 8,
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
    },
    bottom: {
        alignItems: "center",
        marginTop: 16,
        marginBottom: 16,
    },
    label: {
        fontSize: 18,
        padding: 8,
    },
})

export default Register
