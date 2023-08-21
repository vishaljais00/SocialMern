import axios from "axios";
import { API_URL } from "./Utils/constant";


export const loginCall = async (userCredentail, dispatch, setCookie)=>{

    dispatch({type: "LOGIN_START"});
    try {
        const res = await axios.post(`${API_URL}auth/login`, userCredentail)
        setCookie('user', JSON.stringify(res.data.data.user));
        setCookie('token', res.data.data.acesstoken);
        dispatch({type: "LOGIN_SUCCESS", payload: res.data.data.user})
    } catch (error) {
        dispatch({type: "LOGIN_FAILURE", payload: error})
    }
}