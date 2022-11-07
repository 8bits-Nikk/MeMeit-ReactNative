import React, {useContext, useEffect, useState} from "react";
import {FlatList, View} from "react-native";
import MeMeCard from "../component/MeMeCard";
import {ThemeContext} from "../context/ThemeContext";
import {ActivityIndicator} from "react-native-paper";
import {api} from "../api/APIs";


const Home = () => {

    const [meme, setMeme] = useState([])
    const [refresh, setRefresh] = useState(false)

    const themeValue = useContext(ThemeContext)

    useEffect(() => {
        api.get("/gimme/10").then(value => {
            setMeme(value.data.memes)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const handleLoad = () => {
        api.get("/gimme/10").then(value => {
            setMeme(meme.concat(value.data.memes))
        }).catch(error => {
            console.log(error)
        })
    }

    const handleRefresh = () => {
        setRefresh(true)
        api.get("/gimme/10").then(value => {
            setMeme(value.data.memes)
            setRefresh(false)
        }).catch(error => {
            console.log(error)
        })
    }

    const _renderItem = ({item}) => <MeMeCard meme={item} favPage={false}/>
    return (
        <View>
            <FlatList data={meme}
                      ListFooterComponent={<ActivityIndicator/>}
                      onEndReached={handleLoad}
                      renderItem={_renderItem}
                      refreshing={refresh}
                      onRefresh={handleRefresh}
            />
        </View>
    )
}


export default Home
