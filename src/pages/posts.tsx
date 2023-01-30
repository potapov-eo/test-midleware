import React, {useEffect, useState} from 'react';
import {currentEndpoints, useGetPostsQuery} from "../store/posts-api";
import store from "../store/store";


function Posts() {
    const [init,setInit] = useState (false)
    useEffect( ()=>{
        if(!init) {
            store.injectEndpoints(currentEndpoints);
            setInit(true)
        }

    },[])
    const {data} = useGetPostsQuery({});

    return (
        <div>
            {data && data.slice(0,10).map((item: any) => <div key={item.title}>{item.title}</div>)}
        </div>
    );
}

export default Posts;
