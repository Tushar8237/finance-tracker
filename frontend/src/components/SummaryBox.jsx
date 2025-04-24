

export default function SummaryBox({ transactions }) {
  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;
  
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-green-100 p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Income</h3>
        <p className="text-xl font-bold text-green-700">₹{income}</p>
      </div>
      <div className="bg-red-100 p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Expenses</h3>
        <p className="text-xl font-bold text-red-700">₹{expense}</p>
      </div>
      <div className="bg-blue-100 p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Balance</h3>
        <p className="text-xl font-bold text-blue-700">₹{balance}</p>
      </div>
    </div>
  );
}

