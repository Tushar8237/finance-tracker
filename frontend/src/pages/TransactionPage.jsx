import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TransactionTable from "./../components/TransactionTable";
import {
  deleteTransaction,
  fetchTransactions,
} from "../features/transaction/transactionActions";
import TransactionForm from "../components/TransactionForm";
import { toast } from "react-toastify";

export default function TransactionPage() {
  const dispatch = useDispatch();
  const { transactions, loading, currentPage, totalPages } = useSelector(
    (state) => state.transaction
  );

  // Local state
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null); // 🔧 edit support
  
  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch transactions
  useEffect(() => {
    dispatch(
      fetchTransactions({ page, type, category, search: debouncedSearch })
    );
  }, [dispatch, page, type, category, debouncedSearch]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTransaction(id)).unwrap();
      toast.success("Transaction deleted successfully!");
    } catch (error) {
      toast.error(error || "Failed to delete transaction. Please try again.");
      console.error("Failed to delete transaction:", error);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Transactions</h1>

      {/* Add new transaction */}
      <button
        onClick={() => {
          setShowForm(true);
          setEditTransaction(null); // 🔄 reset edit mode
        }}
        className="mb-4 bg-blue-600 text-white px-4 py-2 cursor-pointer rounded"
      >
        + Add Transaction
      </button>

      {/* Form */}
      {showForm && (
        <div className="mb-6 border p-4 rounded shadow bg-white">
          <TransactionForm
            onClose={() => {
              setShowForm(false);
              setEditTransaction(null);
            }}
            transactionToEdit={editTransaction} // 🔧 pass transaction to edit 
          />
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
        </select>

        <button
          className="bg-gray-500 text-white cursor-pointer px-4 py-2 rounded"
          onClick={() => {
            setType("");
            setCategory("");
            setSearch(""); 
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
        onDelete={handleDelete}
        onEdit={(transaction) => {
          setEditTransaction(transaction); // ✏️ set transaction to edit
          setShowForm(true);              // open form in edit mode
        }}
      />
    </div>
  );
}