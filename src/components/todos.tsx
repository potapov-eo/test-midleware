import React from 'react';
import {useGetTodoQuery} from "../store/api/todo-api";


function Todos() {

    const {data} = useGetTodoQuery({});

    return (
            <div>
                {data && data.slice(0, 10).map((item: any) => <div key={item.title}>{item.title}</div>)}
            </div>
    );
}

export default Todos;
