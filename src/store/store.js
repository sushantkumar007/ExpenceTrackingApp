import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice';
import statementSlice from './statementSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        statement: statementSlice        
    }
})

export default store;