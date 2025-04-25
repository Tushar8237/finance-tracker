import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    createTransaction,
    updateTransaction,
    fetchTransactions,
} from "../features/transaction/transactionSlice";
import { toast } from "react-toastify";

export default function TransactionForm({ onClose, transactionToEdit, isEdit = false }) {
    // initialValues = {}
    const dispatch = useDispatch();
    
    const initialState = {
        title: "",
        amount: "",
        type: "income",
        date: "",
        category: "", 
        notes: "",
    };

    // const [formData, setFormData] = useState(initialValues._id ? initialValues : initialState);
    const [formData, setFormData] = useState(transactionToEdit?._id ? transactionToEdit : initialState);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (transactionToEdit?._id) {
            setFormData(transactionToEdit);
        }
    }, [transactionToEdit]);

    // Validation
    const formValidation = () => {
        const newErrors = {};
        if (!formData.title) newErrors.title = "Title is required";
        if (!formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
            newErrors.amount = "Enter a valid amount";
        }
        if (!formData.date) newErrors.date = "Date is required";
        if (!formData.category.trim()) newErrors.category = "Category is required";
        return newErrors;
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = formValidation();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            if (transactionToEdit) {
                const { _id, createdAt, updatedAt, userId, __v, ...cleanData } = formData;
                await dispatch(updateTransaction({ id: formData._id, transactionData: cleanData })).unwrap();
                toast.success("Transaction updated successfully!");
            } else {
                await dispatch(createTransaction(formData)).unwrap();
                toast.success("Transaction added successfully!");
            }

            dispatch(fetchTransactions({ page: 1 }));
            onClose();
            setErrors({});

        } catch (err) {
            console.error("Transaction error:", err);
            toast.error(err?.message || "Failed to save transaction");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-2 border rounded"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

            <input
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="w-full p-2 border rounded"
            />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}

            <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>

            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

            <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full p-2 border rounded"
            />
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

            <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Notes (optional)"
                className="w-full p-2 border rounded"
            />

            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border cursor-pointer rounded"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded"
                >
                    {isEdit ? "Update" : "Add"}
                </button>
            </div>
        </form>
    );
}