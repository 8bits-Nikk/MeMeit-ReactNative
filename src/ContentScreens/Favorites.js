import React, {useContext, useEffect, useState} from "react";
import {FlatList, useColorScheme, View} from "react-native";
import {ActivityIndicator} from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import MeMeCard from "../component/MeMeCard";


const Favorites = () => {
    const [favorites, setFavorites] = useState([])

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
            })
        return () => getDataSubscriber()
    }, [])

    const _renderItem = ({item}) => <MeMeCard meme={item} favPage={true}/>
    return (
        <View>
            <FlatList data={favorites}
                      ListEmptyComponent={<ActivityIndicator/>}
                      renderItem={_renderItem}
            />
        </View>
    )
}

export default Favorites
