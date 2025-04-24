import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import axios, { setAuthHeader } from '../../api/axiosInstance'

// Auth Api calls
// Register User
export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
      const res = await axios.post('/auth/register', userData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
});
  
// Login User
export const loginUser = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/auth/login', credentials);
      localStorage.setItem('accessToken', res.data.accessToken); // Store token securely
      setAuthHeader(res.data.accessToken);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

// logout User
export const logoutUser = createAsyncThunk('auth/logout', async () => {
    await axios.post('/auth/logout');
    localStorage.removeItem('user');
});
  


const authSlice = createSlice({
    name : 'auth',
    initialState : {
        user : null,
        isLoading : false,
        error : null,
    },

    reducers : {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('accessToken'); // Remove token on logout
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Login User
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
})

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;