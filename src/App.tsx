import React, {useEffect, useState} from 'react';
import './App.css';
import {useGetUsersQuery} from "./store/api/main-api";
import {useGetAlbumsQuery} from "./store/api/root-api";
import TodoWrapper from "./components/todo-wrapper";
import {useDispatch} from "react-redux";
import Posts from "./components/posts";
import Counter from "./components/counter";
import Photos from "./components/photos";

function App() {
    const dispatch = useDispatch();
    const [showPosts, setShowPosts] = useState(false)
    const [showPhotos, setShowPhotos] = useState(false)
    const [showTodos, setShowTodos] = useState(false)
    const {data} = useGetUsersQuery({});
    const {data: Albums} = useGetAlbumsQuery({});
    return (
        <>
            <div className="App2">
                <div className="App">
                    <h1>Users</h1>
                    <h3>mainApi</h3>
                    {data && data.map((item: any) => <div key={item.name}>{item.name}</div>)}
                </div>
                <div className="App">
                    <h1>Albums</h1>
                    <h3>rootApi</h3>
                    {Albums && Albums.slice(0, 10).map((item: any) => <div key={item.title}>{item.title}</div>)}
                </div>
            </div>


            <hr></hr>
            <div className="App2">
                <div>
                    <h1>posts</h1>
                    <h4>подключение с помощью injectEndpoints(currentPostsEndpoints) и базового редюсера(rootApi)</h4>
                    <button onClick={() => {
                        setShowPosts(!showPosts)
                    }}>{showPosts ? 'HIDE POSTS' : 'SHOW POSTS'}</button>
                    {showPosts && <Posts/>}
                </div>
                <div>
                    <h1>Photos</h1>
                    <h4>подключение с помощью injectEndpoints(currentPhotoEndpoints) и базового редюсера(rootApi)</h4>
                    <button onClick={() => {
                        setShowPhotos(!showPhotos)
                    }}>{showPhotos ? 'HIDE Photos' : 'SHOW Photos'}</button>
                    {showPhotos && <Photos/>}
                </div>


            </div>
            <hr></hr>
            <div>
                <h1>Todos</h1>
                <h4>подключение с помощью создания второго стора</h4>
                <button onClick={() => {
                    setShowTodos(!showTodos)
                }}>{showTodos ? 'HIDE Todos' : 'SHOW Todos'}</button>
                {showTodos && <TodoWrapper/>}
            </div>

            <hr></hr>
            <div>
                <h4>подключение слайс с помощью injectReducers</h4>
                <Counter/>
            </div>
            <button onClick={() => dispatch({type: '@@INIT'})}> init</button>
        </>
    );
}

export default App;
