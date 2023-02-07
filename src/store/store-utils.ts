/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {combineReducers, configureStore, Middleware, Reducer, ReducersMapObject, Store} from '@reduxjs/toolkit';
import {Api, QueryDefinition} from "@reduxjs/toolkit/query";
import {EndpointBuilder} from "@reduxjs/toolkit/dist/query/endpointDefinitions";

export type InjectedReducers = ReducersMapObject<unknown, any>;
export type InjectReducers = (injectedReducers: InjectedReducers)=> void;
export type InjectEndpoints = (injectedEndpoints: { name: string,

    endpoint: (build: EndpointBuilder<any, any, any>) => any } [], reducerPath: string) => void;
export type AdditionStoreType = { injectReducers : InjectReducers, asyncReducers: Reducer<object>, injectEndpoints: InjectEndpoints };
export type EndpointItem = { name: string,
    endpoint: (builder: EndpointBuilder<any, any, any>) => { [key: string]: QueryDefinition<any, any, any, any, any> } };
export type StoreType = Store & AdditionStoreType;
// todo разобраться почему выдает ошибку (при (rootApis: { [key: string]: Api<any, any, any, any> }) , при подключении в приложение
export function configuredStore<T>(reducers: ReducersMapObject<T, any>, middleware: (getDefaultMiddleware: any) => any, rootApis: { [key: string]: any } = {}) {
    // выделяем из объекта rootApis  редюсеры для создания стора( ReducersMapObject<T, any>)
    let rootApisReducers = {};
    Object.keys(rootApis).forEach((key) => {
        rootApisReducers = { ...rootApisReducers, [rootApis[key].reducerPath]: rootApis[key].reducer };
    });
    //--------------------------------------------------------------------------------------------
    // функция созданя корневого редюсера для создания стора
    function createReducer(asyncReducers: Reducer<object>) {
        return combineReducers<T>({
            ...reducers,
            ...asyncReducers,
            ...rootApisReducers,
        });
    }
    //--------------------------------------------------------------------------------------------
    // создание стора
    const store = configureStore({ reducer: createReducer({} as Reducer<object>),
        middleware });
    //--------------------------------------------------------------------------------------------
    // определение типа стора
    type CurrentStoreType = typeof store & AdditionStoreType;
    const currentStore = store as CurrentStoreType;
    //--------------------------------------------------------------------------------------------

    // добавление метода стора (injectReducers) для добавления слайсов
    currentStore.injectReducers = (injectedReducers: InjectedReducers) => {
        // формирование объекта injectReducers ( ReducersMapObject) для добавления к стору
        const asyncReducers: Reducer<object> = {} as Reducer<object>;
        Object.keys(injectedReducers).forEach((key) => {
            Object.keys(currentStore.getState()).forEach((k) => {
                // @ts-expect-error разобраться с типизацией
                if (k !== key && key in injectedReducers) asyncReducers[key] = injectedReducers[key];
                /* else console.error('Такой редюсер уже есть', key); */
            });
        }, injectedReducers);
        // сохранение добавленных редюсеров в asyncReducers (стора)
        // todo попробовать убрать
        currentStore.asyncReducers = { ...currentStore.asyncReducers, ...asyncReducers } as Reducer<object>;

        // добавление редюсеров
        currentStore.replaceReducer(createReducer(currentStore.asyncReducers));

        return Object.keys({ ...reducers, ...asyncReducers }).length;
    };

    // добавление метода injectEndpoints (injectReducers) для добавления эндпоинтов в текущие Api
    currentStore.injectEndpoints = (endpoints: EndpointItem [], reducerPath: string) => {
        // находим апи для расширения
        const rootApi = rootApis[reducerPath];
        if (!rootApi) {
            console.error('ошибка injectEndpoints, редюсер reducerPath не подключен к строу');
            return;
        }
        // добавляем эндпоинты к Апи
        endpoints.forEach((endpoint) => {
            if (rootApi && Object.keys(rootApi.endpoints).includes(endpoint.name)) {
                console.log('такой эндпоинт уже есть', endpoint.name);
                return;
            }

            rootApi.injectEndpoints({ endpoints: endpoint.endpoint });
        });
        currentStore.replaceReducer(combineReducers({ ...reducers, ...currentStore.asyncReducers, [rootApi.reducerPath]: rootApi.reducer }));
    };
    // возвращаем сконфигурированный стор
    type ReturnCurrentStoreType = typeof currentStore;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const returnCurrentStoreType = currentStore as ReturnCurrentStoreType;
    return returnCurrentStoreType;
}

export default configuredStore;
