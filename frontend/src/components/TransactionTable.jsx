import React from 'react';

export default function TransactionTable({
  transactions,
  loading,
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (loading) return <p>Loading transactions...</p>;
  if (transactions.length === 0) return <p>No transactions found.</p>;

  // console.log(totalPages, currentPage, transactions);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Title</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Type</th>
            <th className="p-2">Category</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id} className="border-t">
              <td className="p-2">{t.title}</td>
              <td className="p-2">₹{t.amount}</td>
              <td className="p-2">{t.type.charAt(0).toUpperCase() + t.type.slice(1)}</td>
              <td className="p-2">{t.category}</td>
              <td className="p-2">{new Date(t.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === index + 1 ? 'bg-blue-500 text-white cursor-pointer' : 'bg-white cursor-pointer'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}