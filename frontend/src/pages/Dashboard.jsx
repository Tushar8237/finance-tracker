import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SummaryBox from './../components/SummaryBox';
import PieChart from './../components/PieChart';
import { fetchTransactions } from "../features/transaction/transactionActions";
import TransactionPage from "./TransactionPage";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { transactions, loading } = useSelector((state) => state.transaction);


  useEffect(() => {
    dispatch(fetchTransactions()); // default fetch
  }, [dispatch]);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <SummaryBox transactions={transactions} />
      <PieChart transactions={transactions} />
      <TransactionPage />
    </div>
  );
}