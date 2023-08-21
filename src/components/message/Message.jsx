import './messge.css'

export default function Message({own}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className={own?'message own':'message'}>
        <div className="messageTop">
            {!own && <img src={PF+ "person/10.jpeg"} alt="" className='messageImg'/>}
            <p className='messgeText'>Hello user , this is dummy message
            Hello user , this is dummy message Hello user
        </p>
            </div>
        <div className="messageBottom"> 1 Hour Ago</div>
    </div>
  )
}
