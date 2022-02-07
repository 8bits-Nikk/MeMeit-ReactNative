import React, {useContext, useEffect, useState} from "react";
import {FlatList, View} from "react-native";
import {ActivityIndicator} from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import MeMeCard from "../component/MeMeCard";
import {ThemeContext} from "../context/ThemeContext";


const Favorites = () => {
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(true)
    const themeValue = useContext(ThemeContext)

    useEffect(() => {
        const getDataSubscriber = firestore().collection('Users')
            .doc(auth().currentUser.uid)
            .collection('Favorites')
            .orderBy('timeStamp', "asc")
            .onSnapshot(querySnapShot => {
                const favMeMe = []
                querySnapShot.forEach(documentSnapshot => {
                    favMeMe.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    })
                })
                setFavorites(favMeMe)
                setLoading(false)
            })
        return () => getDataSubscriber()
    }, [])

    const _renderItem = ({item}) => <MeMeCard meme={item} themeValue={themeValue} favPage={true}/>
    if (loading) {
        return <ActivityIndicator/>

    } else {
        return (
            <View>
                <FlatList data={favorites}
                          renderItem={_renderItem}
                />
            </View>
        )
    }
}

export default Favorites
