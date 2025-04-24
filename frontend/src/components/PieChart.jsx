import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

export default function PieChart({ transactions }) {
  const categories = ['Food', 'Travel', 'Bills', 'Salary', 'Entertainment', 'Other'];
  const categoryTotals = categories.map(cat =>
    transactions
      .filter(t => t.category === cat && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses by Category',
        data: categoryTotals,
        backgroundColor: ['#f87171', '#facc15', '#60a5fa', '#34d399', '#20B9F0', '#a78bfa'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-2 text-center">Expense Breakdown</h3>
      <Pie data={data} />
    </div>
  );
}