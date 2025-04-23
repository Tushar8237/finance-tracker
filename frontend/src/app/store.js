import { configureStore } from '@reduxjs/toolkit';



// Configure Redux store will all the slices
export const store = configureStore({
    reducer: {
        auth : {},
        transaction : {} 
    }
})