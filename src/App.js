import React, { useContext, useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Messanger from "./pages/messanger/Messanger";
import './App.css'; // Import your CSS file for styling

function App() {
  const [cookies] = useCookies();
  const { user, dispatch } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (cookies.user) {
      dispatch({ type: "LOGIN_SUCCESS", payload: cookies.user });
    }
    setIsLoading(false);
  }, [cookies, dispatch]);

  return (
    <Router>
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/messenger" element={!user ? <Register /> : <Messanger />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
