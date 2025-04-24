import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTransaction, fetchTransactions } from '../features/transaction/transactionSlice';
import { toast } from 'react-toastify'

export default function TransactionForm({ onClose }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        type: 'income',
        date: '',
        category: '',
        notes: '',
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await dispatch(createTransaction(formData)).unwrap();
          dispatch(fetchTransactions({ page: 1 })); // refresh transactions
          onClose(); // close modal/form
          toast.success('Transaction added successfully!');
        //   setFormData(initialState);
        } catch (err) {
          console.error('Transaction creation failed:', err);
          toast.error(err || 'Failed to add transaction');
        }
      };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required className="w-full p-2 border rounded" />
            <input name="amount" type="number" value={formData.amount} onChange={handleChange} placeholder="Amount" required className="w-full p-2 border rounded" />

            <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>

            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-2 border rounded" />
            <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" required className="w-full p-2 border rounded" />
            <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes (optional)" className="w-full p-2 border rounded" />

            <div className="flex justify-end gap-4">
                <button type="button" onClick={onClose} className="px-4 py-2 border cursor-pointer rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded">Add</button>
            </div>
        </form>
    );
}
