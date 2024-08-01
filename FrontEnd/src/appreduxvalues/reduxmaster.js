import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Statevalue: "",
    Statevaluetwo: []
}

const reduxmaster = createSlice({

    name: "namevalue",
    initialState,

    reducers: {
        setStatevalu: (state, action) => {
            state.Statevalue = action.payload
        },
        setStatevaluetwo: (state, action) => {
            state.Statevaluetwo = action.payload
        }
    }

})
export const { setStatevalu, setStatevaluetwo } = reduxmaster.actions
export default reduxmaster.reducer 