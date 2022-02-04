import React from "react";
import {View, StyleSheet, Image, TouchableOpacity, ImageBackground, Share} from "react-native";
import {Text} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

const MeMeCard = ({meme, themeValue}) => {

    // const sharePost = () => {
    //     let imagePath = ''
    //     RNFetchBlob.config({
    //         fileCache: true,
    //     }).fetch('GET', meme.url)
    //         .then((resp) => {
    //             imagePath = resp.path()
    //             return resp.readFile('base64')
    //         })
    //         .then( async base64Data => {
    //             let base64_Data = `data:image/png;base64,` + base64Data;
    //             // here's base64 encoded image
    //             await Share.open({ url: base64_Data });
    //             // remove the file from storage
    //             return fs.unlink(imagePath);
    //         })
    // }
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
                <TouchableOpacity style={{margin: 8}}>
                    <Ionicons name={"heart"} size={30}
                              color={themeValue.isDarkMode ? "#fff" : themeValue.theme.colors.enabled}/>
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
