import React from "react";
import {Pressable,StyleSheet} from "react-native";
import {Text} from "react-native-paper";

const MyButton = (props) => {
    return(
        <Pressable style={({pressed})=>[{backgroundColor : pressed? "#fff": props.theme.colors.primary},
            {elevation: pressed? 1 : 6},
            styles.button]} onPress={props.onPress}>
            <Text style={styles.text}>{props.text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        alignItems: "center",
    },
    text: {
        padding: 15,
        fontSize: 22,
        fontWeight: "bold",
    }
})

export default MyButton
