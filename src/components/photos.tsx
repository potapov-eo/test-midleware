import React, {useEffect, useState} from 'react';
import {currentPhotoEndpoints, useGetPhotosQuery} from "../store/api/posts-api";
import store from "../store/store";


function Photos() {
    const [init,setInit] = useState (false)
    useEffect( ()=>{
        if(!init) {
            store.injectEndpoints([
                {
                    endpoint: currentPhotoEndpoints,
                    name: 'getPhotos'
                }
            ], 'rootApi');
            setInit(true)
        }

    },[])
    const {data} = useGetPhotosQuery({});

    return (
        <div>
            {data && data.slice(0,10).map((item: any) => <div key={item.title}>{item.title}</div>)}
        </div>
    );
}

export default Photos;
