import { createSlice } from "@reduxjs/toolkit";
import { createTransaction, deleteTransaction, fetchTransactions, updateTransaction } from "./transactionActions";

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
