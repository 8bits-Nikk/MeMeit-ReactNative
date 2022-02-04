import React, {useContext} from "react";
import {View} from "react-native";
import {Text} from "react-native-paper";
import MyButton from "../component/MyButton";
import {ThemeContext} from "../context/ThemeContext";
import {AuthContext} from "../context/AuthService";
import {UserContext} from "../context/UserContext";

const Profile = () => {

    const {theme} = useContext(ThemeContext)
    const {logout} = useContext(AuthContext)
    const {user} = useContext(UserContext)

    return(
        <View>
            <Text>Profile</Text>
            <Text>{user.email}</Text>
            <View style={{marginTop: 8}}>
                <MyButton theme={theme} text={"Logout"} onPress={()=> {logout()}}/>
            </View>
        </View>
    )
}

export default Profile
