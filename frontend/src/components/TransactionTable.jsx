import React from "react";

export default function TransactionTable({
  transactions,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  onDelete,
  onEdit,
}) {
  if (loading) return <p>Loading transactions...</p>;
  if (transactions.length === 0) return <p>No transactions found.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Title</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Type</th>
            <th className="p-3">Category</th>
            <th className="p-3">Date</th>
            <th className="p-3 text-center">Actions</th> 
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id} className="border-t hover:bg-gray-50">
              <td className="p-3">{t.title}</td>
              <td className="p-3">₹{t.amount}</td>
              <td className="p-3 capitalize">{t.type}</td>
              <td className="p-3">{t.category}</td>
              <td className="p-3">{new Date(t.date).toLocaleDateString()}</td>
              <td className="p-3">
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => onEdit(t)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white cursor-pointer px-3 py-1 rounded text-sm font-medium transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => onDelete(t._id)}
                    className="bg-red-500 hover:bg-red-600 text-white cursor-pointer px-3 py-1 rounded text-sm font-medium transition"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`px-3 py-1 border cursor-pointer rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}