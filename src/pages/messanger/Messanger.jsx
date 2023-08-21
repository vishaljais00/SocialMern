import React from 'react'
import './messanger.css'
import Topbar from '../../components/topbar/topbar'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'

export default function Messanger() {
  return (
    <>
      <Topbar />
      <div className='messenger'>
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" className="chatMenuInput" placeholder='search for friends'/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message/>
              <Message own={true}/>
              <Message/>
              <Message own={true}/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
            </div>
            <div className="chatBoxBottom">
                <textarea className="chatMesasgeInput" placeholder='write something' id=""></textarea>
                <button className='chatSubmitButton'>Send</button>
            </div>
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
