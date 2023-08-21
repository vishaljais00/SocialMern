import React from 'react'
import './conversation.css'
export default function Conversation() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className='conversation'>
        <img  className='conversationImg' src={PF+ "person/10.jpeg"} alt="" />
        <span className="conversationName">Jhon Doe</span>
    </div>
  )
}
