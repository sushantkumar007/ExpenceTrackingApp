import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    transections: []
}

const statementSlice = createSlice({
    name: "statement",
    initialState,
    reducers: {
        addStatement: (state, action) => {
            state.transections = action.payload.transections
        },
        removeStatement: (state) => {
            state.transections = []
        },
        addTransection: (state, action) => {
            state.transections.push(action.payload)
        }
    }
})

export const { addStatement, removeStatement, addTransection } = statementSlice.actions

export default statementSlice.reducer