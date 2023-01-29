import React, {useEffect} from 'react';
import {useGetTodoQuery} from "../store/todo-api";


function Todos() {
    useEffect( ()=>{
    },[])
    const {data} = useGetTodoQuery({});

    return (
        <div>
            {data && data.slice(0,10).map((item: any) => <div key={item.title}>{item.title}</div>)}
        </div>
    );
}

export default Todos;
