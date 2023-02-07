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
    (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [
                'warnings/pushWarning',
                'warnings/deleteWarning',
            ],
            ignoredPaths: ['warnings.data'],
        },
    }).concat(rootApi.middleware).concat(mainApi.middleware)
  , {rootApi : rootApi}
)

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
