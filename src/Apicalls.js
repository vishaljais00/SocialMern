import axios from "axios";
import { API_URL } from "./Utils/constant";



export const loginCall = async (userCredentail, dispatch)=>{
    dispatch({type: "LOGIN_START"});
    try {
        const res = await axios.post(`${API_URL}auth/login`, userCredentail)
        dispatch({type: "LOGIN_SUCCESS", payload: res.data.data})
    } catch (error) {
        dispatch({type: "LOGIN_FAILURE", payload: error})
    }
}