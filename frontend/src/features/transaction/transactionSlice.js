import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axiosInstance";

// Fetch Transactions
export const fetchTransactions = createAsyncThunk(
    "transaction/fetchAll",
    async (params = {}, thunkAPI) => {
        try {
            const {
                page = 1,
                limit = 10,
                type = "",
                category = "",
                search = "",
            } = params;
            const query = new URLSearchParams({
                page,
                limit,
                type,
                category,
                search,
            });
            const res = await axios.get(`/transactions?${query.toString()}`);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message);
        }
    }
);

// Create Transaction
export const createTransaction = createAsyncThunk(
    "transaction/create",
    async (transactionData, thunkAPI) => {
        try {
            const res = await axios.post("/transactions/create", transactionData);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message);
        }
    }
);

// Update Transaction
export const updateTransaction = createAsyncThunk(
    "transaction/update",
    async ({ id, transactionData }, thunkAPI) => {
        try {
            const res = await axios.put(`/transactions/${id}`, transactionData);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to update transaction"
            );
        }
    }
);

// Delete Transaction
export const deleteTransaction = createAsyncThunk(
    "transaction/delete",
    async (id, thunkAPI) => {
        try {
            await axios.delete(`/transactions/${id}`);
            return id; // Return the delete id for the reducer to handle
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to delete transaction"
            );
        }
    }
);

const transactionSlice = createSlice({
    name: "transaction",
    initialState: {
        transactions: [],
        loading: false,
        error: null,
        totalPages: 1,
        currentPage: 1,
    },
    extraReducers: (builder) => {
        builder
            //  Fetch Transactions
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload.transactions;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create Transactions
            .addCase(createTransaction.pending, (state) => {
                state.loading = true;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions.unshift(action.payload);
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Transactions
            .addCase(updateTransaction.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.transactions.findIndex(
                    (transaction) => transaction._id === action.payload._id
                );
                if (index !== -1) {
                    state.transactions[index] = action.payload;
                }
            })
            .addCase(updateTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete Transactions
            .addCase(deleteTransaction.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = state.transactions.filter(
                    (transaction) => transaction._id !== action.payload
                );
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default transactionSlice.reducer;
