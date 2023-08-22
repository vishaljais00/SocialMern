import "./profile.css";
import Topbar from "../../components/topbar/topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../Utils/constant";
import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [user, setUser] = useState(null)
  const username = useParams().username;
  const fetchPosts = async (u_name) => {
    try {
      const res = await axios.get(`${API_URL}user?username=${u_name}`) 
      setUser(res.data.data);
    } catch (error) {
      // Handle error if the API call fails
    }
  };
  useEffect(() => {
    fetchPosts(username);
  }, [username]);

  return (   
    <>
      <Topbar />
      {user !== null  ?
      <div className="profile">
        <Sidebar /> 
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user?.coverPicture !== "" ? PF+user?.coverPicture : PF+ "person/noCover.png"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user?.profilePicture !== "" ? PF+user?.profilePicture : PF+ "person/noAvatar.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          {user !== null  ?
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user}/>
          </div>
          : null }
        </div>
      </div>
      : null}
    </>
  );
}