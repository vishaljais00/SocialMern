import { useRef } from "react";
import "./register.css";
import axios from "axios";
import { API_URL } from "../../Utils/constant";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const email = useRef();
  const password = useRef();
  const usename = useRef();
  const passwordagain = useRef();
  const navigate = useNavigate()

  const handleClick = async(e) =>{
    e.preventDefault();
    console.log(email.current.value, password.current.value)
    if(password.current.value !== passwordagain.current.value){
      password.current.setCustomValidity("Password does not match")
    }else{
      const user = {
        username: usename.current.value,
        password: password.current.value,
        email: email.current.value
      }
      try {
        await axios.post(`${API_URL}auth`,user);
        navigate('/login')
      } catch (error) {
        console.log(error)
      }
      
    }
  }
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
            <input placeholder="Username" type="text" className="loginInput" name="username" required ref={usename}/>
            <input placeholder="Email" type="email" className="loginInput"  name="email" required ref={email}/>
            <input placeholder="Password" type="password" className="loginInput"  name="password" required minLength='6'  ref={password}/>
            <input placeholder="Password Again" className="loginInput" minLength='6'  name="passwordagain" ref={passwordagain} />
            <button className="loginButton" type="submit">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}