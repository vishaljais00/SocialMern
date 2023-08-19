import { useReducer, createContext } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user: {
        "_id": "64605ee9a7eec0dd9afda493",
        "username": "shiva",
        "email": "shiva@gmail.com",
        "password": "$2b$10$BFcEm0iL3U8HZRUmZOA2.OqazLscykBX6sVx3ernJP906cUq5XsaG",
        "profilePicture": "person/2.jpeg",
        "coverPicture": "post/7.jpeg",
        "followers": [
            "644d0a813249fa0207291411",
            "644d62e80e89e48d97352f5e",
            "644d62ca0e89e48d97352f5b"
        ],
        "following": [],
        "isAdmin": false,
        "createdAt": "2023-05-14T04:09:13.328Z",
        "updatedAt": "2023-05-21T16:43:50.349Z",
        "__v": 0,
        "desc": "it my updated description",
        "relationship": 1
    },
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE);
export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    return (
        <AuthContext.Provider 
        value={{
            user: state.user, 
            isFetching:state.isFetching, 
            error: state.error,
            dispatch
        }}
        >{children}</AuthContext.Provider>
    )
}