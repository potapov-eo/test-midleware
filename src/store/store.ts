/* eslint-disable */
import {setupListeners} from '@reduxjs/toolkit/query';
import {configureStore} from '@reduxjs/toolkit';
import {mainApi} from "./api/main-api";
import {rootApi} from "./api/root-api";
import configuredStore from "./store-utils";


const reducers = {
    [mainApi.reducerPath]: mainApi.reducer,
    [rootApi.reducerPath]: rootApi.reducer,
};
const mainStore = configureStore({reducer: reducers})
type MainState = ReturnType<typeof mainStore.getState>


const store = configuredStore<MainState>(reducers,
    // @ts-ignore
    [mainApi.middleware, rootApi.middleware], rootApi
)

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
