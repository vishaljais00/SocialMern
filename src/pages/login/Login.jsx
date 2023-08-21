import { useEffect, useRef } from "react";
import "./login.css";
import { loginCall } from "../../Apicalls";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { useCookies } from 'react-cookie';

export default function Login() {
    const [cookies, setCookie, removeCookie] = useCookies();
    const email = useRef();
    const password = useRef();
    const {user, isFetching, dispatch} = useContext(AuthContext)

 

  const handleClick = (e) =>{
    e.preventDefault();
    console.log(email.current.value, password.current.value)
    loginCall({email:email.current.value, password:password.current.value},dispatch,setCookie)
  }

  console.log("user",user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Email" type="email" className="loginInput"  ref={email}/>
            <input placeholder="Password" type="password" className="loginInput"  ref={password}/>
            <button className="loginButton" type="submit" >{isFetching? 
              <CircularProgress color="white" size='20px'/>: "Log In" }
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
            {isFetching? 
              <CircularProgress color="white" size='20px'/>: "Create a New Account" }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}