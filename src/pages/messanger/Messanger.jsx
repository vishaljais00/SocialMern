import React, { useContext, useEffect, useRef, useState } from 'react'
import './messanger.css'
import Topbar from '../../components/topbar/topbar'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { AuthContext } from '../../context/AuthContext'
import { API_URL } from "../../Utils/constant";
import axios from 'axios'
import { io } from 'socket.io-client'

export default function Messanger() {

  const [conversation, setConversation] = useState([])
  const [currentChat, setCurentChat] = useState(null)
  const [messages, setMessages] = useState(null)
  const [newMessage, setNewMessages] = useState(null)
  const [arrivalMessage, setArraivalMessages] = useState(null)
  const [friend, setFriend] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const scrollRef = useRef();
  const {user} = useContext(AuthContext)
  const socket = useRef()

  useEffect(()=>{
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", ({senderId, text})=>{
   
      setArraivalMessages({
        sender:senderId,
        text: text,
        createdAt: Date.now()
      })
    })
  },[])

  useEffect(()=>{

    if(arrivalMessage && arrivalMessage.sender === friend._id  ){
      const tempMessage = [...messages]
      tempMessage.push(arrivalMessage)
      setMessages(tempMessage)
    } 
  },[arrivalMessage,friend])


  useEffect(()=>{
    socket.current.emit("addUser", user._id)
    socket.current.on("getUsers", users=>{
      console.log(users)
      setOnlineUsers(users)
    })
  },[user]);


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
    

    // send message

    const handleSendMessage = async(e)=>{
      e.preventDefault();
      const message = {
        sender: user._id,
        text: newMessage,
        conversationId : currentChat
      }

      const recevieId = friend._id

      socket.current.emit("sendMessage", {
        senderId: user._id,
        recevierId: recevieId,
        text: newMessage
      })

      try {
            let responce = await axios.post(API_URL+"message", message);
            if(responce.status === 200){
              const tempMessage = [...messages]
              tempMessage.push(responce.data.data)
              setMessages(tempMessage)
              setNewMessages("")

            }
  

      } catch (error) {
        console.log(error)
      }

    }

    

  return (
    <>
      <Topbar />
      <div className='messenger'>
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" className="chatMenuInput" placeholder='search for friends'/>
            {conversation?.map((item, i)=> 
            <div key={i} onClick={()=>{setCurentChat(item._id);  
            friendDetail(item.members.find((ele)=> ele !== user._id )) 
            }}>
              <Conversation friend={item} user={user}  />
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
            <form className="chatBoxBottom" onSubmit={handleSendMessage}>
                <textarea className="chatMesasgeInput" 
                placeholder='write something' 
                id="sendMessage" 
                value={newMessage}
                onChange={(e)=>{setNewMessages(e.target.value)}}
                ></textarea>
                <button className='chatSubmitButton' type='sybmit'>Send</button>
            </form>
            </> ): (<span className='noConversation'>Open a Conversation to start a chat</span>)}
           
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
              <ChatOnline onlineUsers={onlineUsers} currUser={user._id} setCurentChat={setCurentChat} friendDetail={friendDetail} conversation={conversation} />
            </div> 
        </div>
      </div>
    </>
    
  )
}






