import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import transactionReducer from '../features/transaction/transactionSlice';



// Configure Redux store will all the slices
export const store = configureStore({
    reducer: {
        auth : authReducer,
        transaction : transactionReducer,
    }
})