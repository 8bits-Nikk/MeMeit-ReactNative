import React from "react";
import {View, StyleSheet, Image, TouchableOpacity, ImageBackground} from "react-native";
import {Text} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {addToFavorite, removeFavorite} from "../context/FavoriteService";

const MeMeCard = ({meme, themeValue, favPage}) => {

    const handleSave = () => {
       if(favPage){
           removeFavorite(auth().currentUser.uid, meme)
       }else {
           let post  = {
               author: meme.author,
               postLink: meme.postLink,
               subreddit: meme.subreddit,
               url: meme.url,
               title: meme.title,
               ups: meme.ups,
               timeStamp: firestore.FieldValue.serverTimestamp()
           }
           addToFavorite(auth().currentUser.uid, post)
       }
    }
    return (
        <View style={styles.cardBody}>
            <View style={[styles.cardHeader, {backgroundColor: themeValue.isDarkMode ? "#222" : '#fff'}]}>
                <View style={styles.cardHeaderTitle}>
                    <Text>{meme.author}</Text>
                    <Text>{meme.title}</Text>
                </View>
                <TouchableOpacity style={styles.cardHeaderIcon}>
                    <Ionicons name={"alert-circle"} size={30}
                              color={themeValue.isDarkMode ? "#fff" : themeValue.theme.colors.enabled}/>
                </TouchableOpacity>
            </View>
            <View style={{backgroundColor: themeValue.isDarkMode ? "#000" : '#eee'}}>
                <ImageBackground source={require("../assets/imagePlaceHolder.png")}>
                    <Image style={styles.cardImg}
                           source={{uri: meme.url}}/>
                </ImageBackground>
            </View>
            <View style={[styles.cardFooter, {backgroundColor: themeValue.isDarkMode ? "#222" : '#fff'}]}>
                <TouchableOpacity style={{margin: 8}} onPress={()=>{}}>
                    <Ionicons name={"share-social"} size={30}
                              color={themeValue.isDarkMode ? "#fff" : themeValue.theme.colors.enabled}/>
                </TouchableOpacity>
                <TouchableOpacity style={{margin: 8}} onPress={handleSave}>
                    <Ionicons name={"heart"} size={30}
                              color={favPage ? "#f54287" : themeValue.theme.colors.enabled}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardBody: {
        marginBottom: 8,
        elevation: 6,
    },
    cardHeader: {
        flexDirection: "row",
        flex: 1,
        padding: 16,
        elevation: 3,
    },
    cardHeaderTitle: {
        flex: 0.9,
        justifyContent: "center",
    },
    cardHeaderIcon: {
        flex: 0.1,
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
    },
    cardImg: {
        flex: 1,
        width: "100%",
        height: 300,
        resizeMode: "contain",
    },
    cardFooter: {
        flexDirection: "row",
        padding: 8,
        elevation: 3,
    },
})

export default MeMeCard
