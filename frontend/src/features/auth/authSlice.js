import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { setAuthHeader } from "../../api/axiosInstance";

// Load from localStorage
const userFromStorage = JSON.parse(localStorage.getItem("user"));
const tokenFromStorage = localStorage.getItem("accessToken");

// Set auth header if token exists on app load
if (tokenFromStorage) {
    setAuthHeader(tokenFromStorage);
}

// Register User
export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            const res = await axios.post("/auth/register", userData);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Register failed"
            );
        }
    }
);

// Login User
export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials, thunkAPI) => {
        try {
            const res = await axios.post("/auth/login", credentials);
            
            const { accessToken, user } = res.data;

            // Save both in localStorage
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("user", JSON.stringify(user));

            // Set token globally in axios
            setAuthHeader(accessToken);

            return { user };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);

// Logout
export const logoutUser = createAsyncThunk("auth/logout", async () => {
    await axios.post("/auth/logout");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: userFromStorage || null,
        isLoading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                // localStorage.setItem("user", JSON.stringify(action.payload.user));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
