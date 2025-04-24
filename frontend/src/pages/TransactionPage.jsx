import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchTransactions } from '../redux/slices/transactionSlice';
// import TransactionTable from '../components/TransactionTable';
import TransactionTable from './../components/TransactionTable';
import { fetchTransactions } from '../features/transaction/transactionSlice';
import TransactionForm from '../components/TransactionForm';

export default function TransactionPage() {
    const dispatch = useDispatch();
    const { transactions, loading, currentPage, totalPages } = useSelector((state) => state.transaction);

    // Local state for filters and search
    const [page, setPage] = useState(1);
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Local state for add transaction form
    const [showForm, setShowForm] = useState(false);


    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(handler);
    }, [search]);

    // Fetch transactions on param change
    useEffect(() => {
        dispatch(fetchTransactions({ page, type, category, search: debouncedSearch }));
    }, [dispatch, page, type, category, debouncedSearch]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Transactions</h1>

            {/* Add new transaction */}
            
            <button
                onClick={() => setShowForm(true)}
                className="mb-4 bg-blue-600 text-white px-4 py-2 cursor-pointer rounded"
            >
                + Add Transaction
            </button>

            {showForm && (
                <div className="mb-6 border p-4 rounded shadow bg-white">
                    <TransactionForm onClose={() => setShowForm(false)} />
                </div>
            )}
            
            {/* Filters & Search */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search title..."
                    className="border px-3 py-2 rounded"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="border px-3 py-2 rounded"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

                <select
                    className="border px-3 py-2 rounded"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Food">Food</option>
                    <option value="Salary">Salary</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Travel">Travel</option>
                    <option value="Bills">Bills</option>
                    <option value="Other">Other</option>
                    {/* Add more categories as needed */}
                </select>

                <button
                    className="bg-gray-500 text-white cursor-pointer px-4 py-2 rounded"
                    onClick={() => {
                        setType('');
                        setCategory('');
                        setSearch('');
                    }}
                >
                    Reset
                </button>
            </div>

            {/* Table */}
            <TransactionTable
                transactions={transactions}
                loading={loading}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
