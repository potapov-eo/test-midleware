import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {counterMinus, counterPlus, counterSlice, InitialState, selectCount} from "../store/slice/counter-slice";
import store from "../store/store";


function Counter() {
    const dispatch = useDispatch();
    useEffect(() => {
        // @ts-ignore
        store.injectReducers({[counterSlice.name]: counterSlice.reducer});
    }, []);
    const Count = useSelector(selectCount<{ [counterSlice.name]: InitialState }>);

    return (
        <div>

            <h3> {Count}</h3>

            <button onClick={() => {
                dispatch(counterPlus());
            }}>+
            </button>
            <button onClick={() => {
                dispatch(counterMinus());
            }}>-
            </button>

        </div>
    );
}

export default Counter;
