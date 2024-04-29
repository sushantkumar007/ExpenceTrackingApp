import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    transections: [],
    isTransectionEditable: false,
    editableTransecton: null
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
        editTransection: (state, action) => {
            state.isTransectionEditable = true
            state.editableTransecton = action.payload
        }
    }
})

export const { addStatement, removeStatement, editTransection } = statementSlice.actions

export default statementSlice.reducer