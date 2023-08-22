import React, { useContext, useEffect, useRef, useState } from 'react'
import './messanger.css'
import Topbar from '../../components/topbar/topbar'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { AuthContext } from '../../context/AuthContext'
import { API_URL } from "../../Utils/constant";
import axios from 'axios'

export default function Messanger() {

  const [conversation, setConversation] = useState([])
  const [currentChat, setCurentChat] = useState(null)
  const [messages, setMessages] = useState(null)
  const [friend, setFriend] = useState(null)
  const scrollRef = useRef();
  const {user} = useContext(AuthContext)

  useEffect(()=>{
    const getConversations = async ()=>{
      try {
        const response = await axios.get(API_URL+`conv/${user._id}`)
        setConversation(response.data.data)
      } catch (error) {
        console.log(error)
      }     
    }
    getConversations()
  }, [user._id])

  useEffect(()=>{
    const getMessages = async ()=>{
      try {
        const response = await axios.get(API_URL+`message/${currentChat}`)
        setMessages(response.data.data)
      } catch (error) {
        console.log(error)
      }   
    }
    currentChat && getMessages()
  }, [currentChat])

    const friendDetail = async(id)=>{
      try {
          const res = await axios.get(API_URL+`user?userId=${id}`)
          setFriend(res.data.data)
      } catch (error) {
        console.log(error)
      }
    } 

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])
    

   

  console.log("messages", messages)
  return (
    <>
      <Topbar />
      <div className='messenger'>
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" className="chatMenuInput" placeholder='search for friends'/>
            {conversation?.map((item, i)=> 
            <div key={i} onClick={()=>{setCurentChat(item._id);  friendDetail(item.members[1]) }}>
              <Conversation friend={item}  />
            </div>)}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (<>
              <div className="chatBoxTop">
                {messages?.map((item, i)=>
                <div ref={scrollRef}>
                  <Message own={item.sender === user._id ? true: false} msg={item} friend={friend}/>
                </div>)}
            </div>
            <div className="chatBoxBottom">
                <textarea className="chatMesasgeInput" placeholder='write something' id=""></textarea>
                <button className='chatSubmitButton'>Send</button>
            </div>
            </> ): (<span className='noConversation'>Open a Conversation to start a chat</span>)}
           
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
              <ChatOnline />
              <ChatOnline />
              <ChatOnline />
              <ChatOnline />
              <ChatOnline />
            </div> 
        </div>
      </div>
    </>
    
  )
}
