import * as api from "../API";
import { AUTH } from '../reducers/Posts'

export const signin=(formData,navigate)=>async(dispatch)=>{
    try {
        //log in the user
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const signup=(formData,navigate)=>async(dispatch)=>{
    try {
        //log in the user
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}