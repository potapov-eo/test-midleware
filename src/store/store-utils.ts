/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
    combineReducers,
    configureStore,
    Middleware,
    Reducer,
    ReducersMapObject
} from '@reduxjs/toolkit';
import {Api} from "@reduxjs/toolkit/query";


export type InjectedReducers = ReducersMapObject<unknown, any>;
export type InjectReducers = (injectedReducers: Api<any, any, any, any>) => void;
export type InjectEndpoints = (injectedEndpoints: any) => void;


export function configuredStore<T>(reducers: ReducersMapObject<T, any>, middleware: Middleware[], rootApi: Api<any, any, any, any>) {
    function createReducer(asyncReducers: Reducer<object>) {
        return combineReducers<T>({
            ...reducers,
            ...asyncReducers,
        });
    }

    const store = configureStore({
        reducer: createReducer({} as Reducer<object>),
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)
    });
    type CurrentStoreType =
        typeof store
        & { injectReducers: InjectReducers, asyncReducers: Reducer<object>, asyncMiddleware?: Middleware[], injectEndpoints: InjectEndpoints, injectApi: (injectedReducers: Api<any, any, any, any>) => void };
    let currentStore = store as CurrentStoreType;


    type ReturnCurrentStoreType = typeof currentStore;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    let returnCurrentStoreType = currentStore as ReturnCurrentStoreType;

    currentStore.injectReducers = (injectedReducers: InjectedReducers) => {
        // @ts-ignore
        const asyncReducers: Reducer<object> = {[injectedReducers.reducerPath]: injectedReducers.reducer} as Reducer<object>;
        currentStore.asyncReducers = {...currentStore.asyncReducers, ...asyncReducers} as Reducer<object>;
        // @ts-ignore
        currentStore.replaceReducer(createReducer(currentStore.asyncReducers));

    };
    currentStore.injectEndpoints = (injectEndpoints: any) => {
        const addedApi = rootApi.injectEndpoints({endpoints: injectEndpoints})
        // @ts-ignore
        currentStore.replaceReducer(combineReducers({...reducers, [addedApi.reducerPath]: addedApi.reducer}));
    };


   /* currentStore.injectApi = (injectedApi: Api<any, any, any, any>) => {
        if (currentStore.asyncReducers && Object.keys(currentStore.asyncReducers).find(key => key === injectedApi.reducerPath)) {
            return
        }
        // @ts-ignore
        const asyncReducer: Reducer<object> = {[injectedApi.reducerPath]: injectedApi.reducer}
        // @ts-ignore
        currentStore.asyncReducers = {...currentStore.asyncReducers, ...asyncReducer} as Reducer<object>;
        currentStore.asyncMiddleware = [...currentStore.asyncMiddleware ? currentStore.asyncMiddleware : [], injectedApi.middleware]

        const initialState = currentStore.getState()
        const store = configureStore({
            reducer: combineReducers({
                ...reducers,
                ...currentStore.asyncReducers
            }),
            preloadedState: initialState,
            middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware).concat(currentStore.asyncMiddleware ? currentStore.asyncMiddleware : [])
        })

        // @ts-ignore
        store.asyncReducers = currentStore.asyncReducers
        // @ts-ignore
        store.asyncMiddleware = currentStore.asyncMiddleware
        // @ts-ignore
        currentStore = store

        currentStore.replaceReducer(combineReducers({...reducers,  ...currentStore.asyncReducers}));
    };*/

    return returnCurrentStoreType;
}


export default configuredStore;
