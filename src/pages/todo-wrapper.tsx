import React from 'react';
import Todos from "./todos";
import {Provider} from "react-redux";
import todoStore from "../store/todos-store";

function TodoWrapper() {

    return (
        <Provider store={todoStore}>
            <Todos/>
        </Provider>
    );
}

export default TodoWrapper;
