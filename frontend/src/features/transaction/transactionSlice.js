import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosInstance';

// Fetch Transactions
export const fetchTransactions = createAsyncThunk(
  'transaction/fetchAll',
  async (params = {}, thunkAPI) => {
    try {
      const { page = 1, limit = 10, type = '', category = '', search = '' } = params;
      const query = new URLSearchParams({ page, limit, type, category, search });
      const res = await axios.get(`/transactions?${query.toString()}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

// Create Transaction
export const createTransaction = createAsyncThunk(
  'transaction/create',
  async (transactionData, thunkAPI) => {
    try {
      console.log('Transaction Data:', transactionData); // Debugging line
      const res = await axios.post('/transactions/create', transactionData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    transactions: [],
    loading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default transactionSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from '../../api/axiosInstance';

// // Fetch Transactions with support for pagination, filters, and search
// export const fetchTransactions = createAsyncThunk(
//   'transaction/fetchAll',
//   async (params = {}, thunkAPI) => {
//     try {
//       const { page = 1, limit = 10, type = '', category = '', search = '' } = params;
//       const query = new URLSearchParams({ page, limit, type, category, search });
//       const res = await axios.get(`/transactions?${query.toString()}`);
//       return res.data; // expects { transactions, totalPages, currentPage }
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message);
//     }
//   }
// );

// const transactionSlice = createSlice({
//   name: 'transaction',
//   initialState: {
//     transactions: [],
//     loading: false,
//     error: null,
//     totalPages: 1,
//     currentPage: 1,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTransactions.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchTransactions.fulfilled, (state, action) => {
//         state.loading = false;
//         state.transactions = action.payload.transactions;
//         state.totalPages = action.payload.totalPages;
//         state.currentPage = action.payload.currentPage;
//       })
//       .addCase(fetchTransactions.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default transactionSlice.reducer;