import React, { useEffect, useState } from 'react'
import './conversation.css'
import axios from 'axios'
import { API_URL } from '../../Utils/constant'
export default function Conversation({friend, user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const [data, setData] = useState(null)
    useEffect(()=>{

      const friendDetail = async()=>{
        try {
            const res = await axios.get(API_URL+`user?userId=${friend.members.find((ele)=> ele !== user._id )}`) 
            setData(res.data.data)
        
        } catch (error) {
          console.log(error)
        }
      } 

      friendDetail()
    }, [friend])
  return (
    <div className='conversation' >
        <img  className='conversationImg' src={data?.profilePicture ? PF+ data.profilePicture: PF+ "person/10.jpeg"} alt="" />
        <span className="conversationName">{data?.username}</span>
    </div>
  )
}
