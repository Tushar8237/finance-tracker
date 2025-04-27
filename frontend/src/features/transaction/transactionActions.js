import { createAsyncThunk } from "@reduxjs/toolkit";
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