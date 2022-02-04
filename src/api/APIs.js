import {create} from "apisauce";

export const api = create({
    baseURL: "https://meme-api.herokuapp.com",
    headers: {
        'Content-type': 'application/json',
        'Accept' : 'application/json',
    }
})
