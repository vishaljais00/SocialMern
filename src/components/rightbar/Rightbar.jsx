import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import {useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../Utils/constant";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [friendList, setFriendList] = useState([])
  const {user: currUser} = useContext(AuthContext)
  const [followed, setFollowed] = useState(false)

   const checkFriend = async() =>{
      try {
          const checkAFriend = await axios.post(`${API_URL}user/${user._id}/status`,{"userID": currUser._id})
          if(checkAFriend.data.data){
            setFollowed(true)
          }else{
            setFollowed(false)
          }

      } catch (error) {
        console.log(error)
      }
    }

  useEffect(()=>{
    checkFriend()
  }, [user, currUser])

  useEffect(() => {
    
    const getFriends = async() =>{
      try {
          const friendList = await axios.get(`${API_URL}user/friend/${user?._id? user?._id: currUser._id}`)
          setFriendList(friendList.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getFriends()
  }, [user,currUser])

  const followHandler = async () =>{
    try {
          if(!followed){
            await axios.put(API_URL+`user/${user._id}/follow`, {"userID": currUser._id})
          }else{
            await axios.put(API_URL+`user/${user._id}/unfollow`, {"userID": currUser._id})
          }
          await checkFriend()
          
    } catch (error) {
      console.log(error)
    }
  }
  

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={`${PF}/gift.png`} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
      {currUser.username !== user.username && (
        <button className="rightbarFollowButton" onClick={followHandler}>
          {followed? "Unfollow": "follow"}
          {followed? " " : <Add/>}

        </button>
      )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? "Single": user.relationship === 2 ? "Married": "-"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
        {friendList?.map((item , i)=>
            <Link to={`/profile/${item?.username}`} style={{textDecoration:'none'}} key={i}>
          <div className="rightbarFollowing" key={item._id}>
              <img
                src={item.profilePicture!==""?`${PF}${item.profilePicture}`:`${PF}person/noAvatar.png`}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">{item.username}</span>
          
          </div>
            </Link>
        )}
         
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? ProfileRightbar() : HomeRightbar()}
      </div>
    </div>
  );
}