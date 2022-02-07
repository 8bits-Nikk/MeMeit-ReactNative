import React, {useContext, useEffect, useState} from "react";
import {View, StyleSheet} from "react-native";
import {ActivityIndicator, Text} from "react-native-paper";
import MyButton from "../component/MyButton";
import {ThemeContext} from "../context/ThemeContext";
import {AuthContext} from "../context/AuthService";
import {UserContext} from "../context/UserContext";
import firestore from "@react-native-firebase/firestore";

const Profile = () => {

    const {theme} = useContext(ThemeContext)
    const {logout} = useContext(AuthContext)
    const {user} = useContext(UserContext)

    const [loading, setLoading] = useState(true)
    const [userName, setUserName] = useState('')

    useEffect(()=> {
        firestore().collection('Users').doc(user.uid).get().then(result =>{
            setUserName(result.data().Name)
            setLoading(false)
        } )
    },[])

    return (
        <View style={styles.body}>
            <View style={styles.header}>
                <Text style={styles.title}>Profile</Text>
            </View>
            {
                loading ? <ActivityIndicator/> :
                    <View style={styles.container}>
                    <Text style={styles.label}>User Id: {user.uid}</Text>
                    <Text style={styles.label}>User Name: {userName}</Text>
                    <Text style={styles.label}>User Email: {user.email}</Text>
                </View>
            }
            <View style={styles.button}>
                <MyButton theme={theme} text={"Logout"} onPress={() => {
                    logout()
                }}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        marginTop: 16,
        margin: 8,
    },
    header: {
        alignItems: "center",
        margin: 16
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
    },
    container: {
        marginTop: 16,
        padding: 8,
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
    },
    button: {
        marginTop: 8,
    },
})

export default Profile
