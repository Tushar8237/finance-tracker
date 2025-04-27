import { createAsyncThunk } from "@reduxjs/toolkit"
import axios, { setAuthHeader } from "../../api/axiosInstance";

// Load from localStorage
const userFromStorage = JSON.parse(localStorage.getItem("user"));
const tokenFromStorage = localStorage.getItem("accessToken");

if (tokenFromStorage) {
    setAuthHeader(tokenFromStorage);
}

// Register user
export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            console.log("Sending POST /auth/register with:", userData, thunkAPI);
            const res = await axios.post("/auth/register", userData);
            console.log("Register success:", res.data);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Register failed"
            );
        }
    }
);

// Login user
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