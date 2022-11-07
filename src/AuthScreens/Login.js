import React, {useContext, useState} from "react";
import {View, StyleSheet, TouchableWithoutFeedback, Alert} from "react-native";
import {Text, TextInput} from "react-native-paper";
import {ThemeContext} from "../context/ThemeContext";
import MyButton from "../component/MyButton";
import {AuthContext} from "../context/AuthService";


const Login = ({navigation}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isVisible, setIsVisible] = useState(false)

    const themeValue = useContext(ThemeContext)
    const {login} = useContext(AuthContext)

    const handlePress = () => {
        setIsVisible(prevState => !prevState)
    }

    const validateFields = () => {
        const emailRegx = new RegExp('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\u0001-\b\u000B\f\u000E-\u001F!#-[]-\u007F]|\\\\[\u0001-\t\u000B\f\u000E-\u007F])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\u0001-\b\u000B\f\u000E-\u001F!-ZS-\u007F]|\\\\[\u0001-\t\u000B\f\u000E-\u007F])+)])')
        return !(!emailRegx.test(email) || email === '' || password === '' || password.length < 8);
    }


    const loginUser = () => {
        if(validateFields()){
            login(email.trim(), password.trim())
        }else {
            Alert.alert("Error", "Please Enter Valid Details")
        }
    }

    return (
        <View style={styles.body}>
           <View style={styles.header}>
               <Text style={styles.title}>Login</Text>
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
            <View style={{marginTop: 8}}>
                <MyButton theme={themeValue.theme} text={"Login"} onPress={loginUser}/>
            </View>
            <View style={styles.bottom}>
                <TouchableWithoutFeedback onPress={()=> navigation.navigate("Register")}>
                    <Text style={styles.label}>Create New User</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigation.navigate("ForgotPass")}>
                    <Text style={styles.label}>Forgot PassWord ?</Text>
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

export default Login
