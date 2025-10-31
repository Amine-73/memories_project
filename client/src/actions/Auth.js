import * as api from "../API";
import { AUTH } from '../reducers/Posts'

export const signin=(formData,navigate)=>async(dispatch)=>{
    try {
        //Sign In the user
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const signup=(formData,navigate)=>async(dispatch)=>{
    try {
        //Sign Up the user
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}