import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authActions";

// Load from localStorage
const userFromStorage = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: userFromStorage || null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            state.success = false; // Reset success state on logout
        },
        clearError: (state) => {
            state.error = null; 
        },
        clearSuccess: (state) => {
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })

            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, clearError, clearSuccess } = authSlice.actions; 
export default authSlice.reducer;