import {createSlice} from '@reduxjs/toolkit';


export type InitialState = {
    count: number,
};

const initialState: InitialState = {
    count: 0,
};

export const counterSlice = createSlice({
    name: 'counter-slice',
    initialState,
    reducers: {
        counterPlus(state) {
            state.count = state.count + 1
        },

        counterMinus(state) {
            state.count = state.count - 1
        },
    },
});

export function selectCount<T extends { [counterSlice.name]: InitialState }>(state: T): number {
    return state[counterSlice.name] ? state[counterSlice.name].count : 0
}

export const {counterPlus, counterMinus} = counterSlice.actions;
