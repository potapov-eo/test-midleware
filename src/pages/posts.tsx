import React, {useEffect} from 'react';
import {useGetPostsQuery} from "../store/posts-api";


function Posts() {
    useEffect( ()=>{
    },[])
    const {data} = useGetPostsQuery({});

    return (
        <div>
            {data && data.slice(0,10).map((item: any) => <div key={item.title}>{item.title}</div>)}
        </div>
    );
}

export default Posts;
