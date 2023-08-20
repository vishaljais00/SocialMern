import { useContext, useEffect, useState } from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import axios from 'axios';
import { API_URL } from "../../Utils/constant";
import { AuthContext } from '../../context/AuthContext';

export default function Feed({username}) {

  const [posts , setPosts] = useState([])
  const {user} = useContext(AuthContext)
 
  const fetchPosts = async (u_name) => {
    try {
      const res = u_name 
      ? await axios.get(`${API_URL}post/profile/${u_name}`) 
      : await axios.get(`${API_URL}post/timeline/${user._id}`);
      setPosts(res.data.data);
    } catch (error) {
      // Handle error if the API call fails
    }
  };
  useEffect(() => {
    fetchPosts(username);
  }, [username, user._id]);
  return (
    <div className='feed'>
      <div className="feedWrapper">
          <Share fetchPosts={fetchPosts} />
          {posts?.map((post, i)=>
           <div key={i}>
            <Post post={post} />
          </div>
          
          )}
         
      </div>
    </div>
  )
}
