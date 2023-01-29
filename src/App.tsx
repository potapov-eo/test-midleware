import React, {useEffect, useState} from 'react';
import './App.css';
import {useGetUsersQuery} from "./store/main-api";
import PostsWrapper from "./pages/posts-wrapper";
import store from "./store/store";
import {useGetAlbumsQuery} from "./store/root-api";
import TodoWrapper from "./pages/todo-wrapper";
import {useDispatch} from "react-redux";

function App() {
    const dispatch = useDispatch();
    const [showPosts,setShowPosts] = useState (true)
    const [showTodos,setShowTodos] = useState (false)
    const {data} = useGetUsersQuery({});
    const {data: Albums} = useGetAlbumsQuery({});
    return (
        <>
            <div className="App2">
            <div className="App">
                <h1>Users</h1>
                {data && data.map((item: any) => <div key={item.name}>{item.name}</div>)}
            </div>
            <div className="App">
                <h1>Albums</h1>
                {Albums && Albums.slice(0,10).map((item: any) => <div key={item.title}>{item.title}</div>)}
            </div>
            </div>
            <div className="App2">
                <div>
            <h1>posts</h1>
            <button onClick={()=>{setShowPosts(!showPosts)}}>{showPosts?'HIDE POSTS': 'SHOW POSTS'}</button>
            {showPosts && <PostsWrapper/>}
                </div>
                <div>
                    <h1>Todos</h1>
                    <button onClick={()=>{setShowTodos(!showTodos)}}>{showTodos?'HIDE Todos': 'SHOW Todos'}</button>
                    {showTodos && <TodoWrapper/>}
                </div>
            </div>
            <button onClick={()=>dispatch({type: '@@INIT' })}> init </button>
        </>
    );
}

export default App;
