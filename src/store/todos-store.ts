/* eslint-disable */
import {setupListeners} from '@reduxjs/toolkit/query';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {todoApi} from "./api/todo-api";


const reducers = {
    [todoApi.reducerPath]: todoApi.reducer,
};

const todoStore = configureStore({
    reducer: combineReducers({
        ...reducers,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(todoApi.middleware)
})

setupListeners(todoStore.dispatch);

export type RootState = ReturnType<typeof todoStore.getState>;

export type AppDispatch = typeof todoStore.dispatch;

export default todoStore;
