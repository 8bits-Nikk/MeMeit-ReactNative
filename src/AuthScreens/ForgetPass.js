import React, {useContext, useState} from "react";
import {Alert, StyleSheet,View} from "react-native";
import {ThemeContext} from "../context/ThemeContext";
import {Text, TextInput} from "react-native-paper";
import MyButton from "../component/MyButton";
import auth from "@react-native-firebase/auth";

const ForgetPass = ({navigation}) => {
    const [email, setEmail] = useState('')
    const themeValue = useContext(ThemeContext)

    const validateFields = () => {
        const emailRegx = new RegExp('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\u0001-\b\u000B\f\u000E-\u001F!#-[]-\u007F]|\\\\[\u0001-\t\u000B\f\u000E-\u007F])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\u0001-\b\u000B\f\u000E-\u001F!-ZS-\u007F]|\\\\[\u0001-\t\u000B\f\u000E-\u007F])+)])')
        return !(!emailRegx.test(email) || email === '');
    }

    const sendEmail = () => {
        if(validateFields()){
            try {
                auth().sendPasswordResetEmail(email).then( () => {
                    Alert.alert("Successful", "Email has been sent")
                    navigation.goBack()
                }).catch(() => {
                    Alert.alert("Error", "User Not Found")
                })
            }catch (e) {

            }
        }else {
            Alert.alert("Error", "Please Enter Valid Details")
        }
    }

    return(
        <View style={styles.body}>
            <View style={styles.header}>
                <Text style={styles.title}>Forgot Password</Text>
            </View>
            <TextInput mode={'outlined'}
                       label={"Email"}
                       placeholder={"Enter Email"}
                       error={false}
                       onChangeText={(txt) => setEmail(txt)}
                       value={email}
                       keyboardType={'email-address'}
                       returnKeyType={'next'}
                       theme={themeValue.theme}/>

            <View style={{marginTop: 8}}>
                <MyButton theme={themeValue.theme} text={"Forgot Password"} onPress={sendEmail}/>
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
})

export default ForgetPass
