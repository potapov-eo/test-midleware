import React, {useEffect, useState} from 'react';
import {currentEndpoints} from "../store/posts-api";
import store from "../store/store";
import Posts from "./posts";

function PostsWrapper() {
    const [showPosts,setShowPosts] = useState (true)
    const [init,setInit] = useState (false)

    useEffect( ()=>{
        if(!init) {
            // @ts-ignore
            store.injectEndpoints(currentEndpoints);
            setInit(true)
        }

    },[])


    return (
        <div>
            <button onClick={()=>{setShowPosts(!showPosts)}}>{showPosts?'HIDE POSTS2': 'SHOW POSTS2'}</button>
            {  showPosts && <Posts/>   }
        </div>
    );
}

export default PostsWrapper;
