import { useContext, useRef, useState } from 'react';
import './share.css';
import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons";
import { AuthContext } from '../../context/AuthContext';
import { API_URL } from '../../Utils/constant';
import axios from 'axios';

export default function Share({fetchPosts}) {

    const {user} =  useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const desc = useRef()
    const [file, setFile] = useState(null)
    const [imgFile, setImgFile] = useState("");


     const UploadImgFun = (e) => {
        let ImagesArray = Object.entries(e.target.files).map((e) =>
            URL.createObjectURL(e[1])
        );
        setFile(e.target.files[0])
        setImgFile(ImagesArray);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const newPost = {
            userId:user._id,
            desc: desc.current.value,
        }

        if(file){
            const data = new FormData();
            data.append('file', file)
            data.append('userId', user._id)
            data.append('desc', newPost.desc)

            var requestOptions = {
                method: 'POST',
                body: data,
                redirect: 'follow'
              };
                fetch(API_URL+"post", requestOptions)
                .then(response => {
                    fetchPosts()
                    setImgFile("")
                    setFile(null)
                })
                .catch(error => console.log('error', error));
        }
    }
  return (
    <div className='share'>
        <div className="shareWrapper">
            <div className="shareTop">
                <img className='shareProfileImg' src={user.profilePicture? PF+user.profilePicture: PF+"person/noAvatar.png"} alt="" />
                <input 
                    placeholder={`whats in your mind `+user.username+ " ?"}
                    className="shareInput"
                    ref={desc}
                />
            </div>
            {imgFile ?
            <div className="shareMid">
                <div className="shareCenter">
                    <img className='shareImg' src={imgFile} alt="" />
                </div> 
            </div>
            : null }
            <hr className='shareHr'/>
            <form className="shareBottom" onSubmit={handleSubmit}>
                <div className="shareOptions">
                    <label htmlFor='file' className="shareOption">
                        <PermMedia htmlColor="tomato" className="shareIcon"/>
                        <span className="shareOptionText">Photo or Video</span>
                    </label>
                    <input 
                        style={{display:'none'}} 
                        type="file" id="file" 
                        accept=".png,.jepg,.jpg" 
                        onChange={UploadImgFun}
                    />
                    <div className="shareOption">
                        <Label htmlColor="blue" className="shareIcon"/>
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <Room htmlColor="green" className="shareIcon"/>
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                        <span className="shareOptionText">Feelings</span>
                    </div>
                </div>
                <button type='submit' className="shareButton">Share</button>
            </form>
        </div>
    </div>
  )
}
