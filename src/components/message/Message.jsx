import './messge.css'
import { format } from 'timeago.js';

export default function Message({own, msg, friend}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className={own?'message own':'message'}>
        <div className="messageTop">
            {!own && <img src={friend?.profilePicture !=="" ? PF+ friend?.profilePicture: PF+ "person/10.jpeg"} alt="" className='messageImg'/>}
            <p className='messgeText'>{msg.text}</p>
            </div>
        <div className="messageBottom"> {format(msg.createdAt)}</div>
    </div>
  )
}
