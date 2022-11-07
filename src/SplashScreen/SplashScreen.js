import React from "react";
import {View, StyleSheet, Image} from "react-native";
import {ActivityIndicator, Text} from "react-native-paper";

const SplashScreen = () => {

    return(
        <View style={styles.body}>
            <Image source={require("../assets/logo.png")} style={styles.logo}/>
            <Text style={styles.title}>MeMeit</Text>
            <ActivityIndicator style={{marginTop: 20 }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    logo: {
        height: 210,
        width: 210,
        resizeMode: "contain",
        margin: 8,
    },
    title: {
        fontSize: 30,
        padding: 8,
    }
})

export default SplashScreen
