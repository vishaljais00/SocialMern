import { MoreVert } from '@material-ui/icons'
import './post.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../Utils/constant';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { AuthContext } from '../../context/AuthContext';


export default function Post({post}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({})
    const contextUser = useContext(AuthContext)
    // handle likes
    const handleLike = async() =>{
        try {
            await axios.put(`${API_URL}post/${post._id}/likedis`, {userId: contextUser.user._id })
        } catch (error) {
            
        }
        setLike(isLiked ? like-1 : like +1)
        setIsLiked(!isLiked)
    }

    useEffect(() => {
     setIsLiked(post.likes.includes(contextUser.user._id))
    }, [contextUser.user._id, post.likes])
    
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
              const res = await axios.get(API_URL + `user?userId=${post.userId}`);
              setUser(res.data.data);
            
            } catch (error) {
            
            }
          };
        fetchUser();
      }, [post.userId]);

return (
    <div className='post'id={post._id}>
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`/profile/${user?.username}`}>
                        <img 
                            className='postProfileImg' 
                            src={user?.profilePicture !== "" ? PF+user?.profilePicture : PF+ "person/noAvatar.png"} 
                            alt="" 
                        />
                    </Link>
                    <span className="postUsername">{user?.username}</span>
                    <span className="postDate"> {format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post.desc}</span>
                <img className='postImg' src={PF+post.img} alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img 
                        className='likeIcon' 
                        src={`${PF}like.png`} 
                        alt="" 
                        onClick={()=> handleLike()}
                    />
                    <img 
                        className='likeIcon' 
                        src={`${PF}heart.png`} 
                        alt=""
                        onClick={()=> handleLike()}
                     />
                    <span className="likeCounter">{like} people like it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText"> {like} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}
