import React from "react";
import firestore from "@react-native-firebase/firestore";

const addToFavorite = (uid, post) =>{
    let docId = post.postLink.substring(16)
    const favoriteCollection = firestore().collection("Users").doc(uid).collection("Favorites")
    favoriteCollection.doc(docId).set(post).then(()=> {
        console.log('Post added!');
    })
}

export default addToFavorite
