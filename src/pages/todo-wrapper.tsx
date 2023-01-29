import React, {useEffect, useState} from 'react';
import {currentEndpoints, postsApi, useGetPostsQuery} from "../store/posts-api";
import store from "../store/store";
import Posts from "./posts";
import Todos from "./todos";
import {todoApi} from "../store/todo-api";
import {Provider, useDispatch} from "react-redux";
import todoStore from "../store/todos-store";

function TodoWrapper() {
    const [showTodo, setShowTodo] = useState(false)
    const [init, setInit] = useState(false)
    const dispatch = useDispatch();
    /* useEffect( ()=>{
         if(!init) {

             setInit(true)
             // @ts-ignore
             store.injectReducers(todoApi);
             // @ts-ignore


         }

     },[])*/

    console.log(store.getState())
    return (
        <Provider store={todoStore}>
            <div>
                <button onClick={() => {
                    setShowTodo(!showTodo)
                }}>{showTodo ? 'HIDE Todo2' : 'SHOW Todo2'}</button>
                {showTodo && <Todos/>}
            </div>
        </Provider>
    );
}

export default TodoWrapper;
