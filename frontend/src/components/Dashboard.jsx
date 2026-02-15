import { useState } from "react";
import MonthlyCategoryPieChart from "./MonthlyCategoryPieChart";

const Dashboard = ({ transactions }) => {
  const today = new Date();

  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  //  NEXT MONTH
  const handleNextMonth = () => {
    setSelectedMonth((prev) => {
      if (prev === 11) {
        setSelectedYear((year) => year + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  // PREVIOUS MONTH
  const handlePrevMonth = () => {
    setSelectedMonth((prev) => {
      if (prev === 0) {
        setSelectedYear((year) => year - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  return (
    <div className="w-full">

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          ← Previous
        </button>

        <button
          onClick={handleNextMonth}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next →
        </button>
      </div>

      <MonthlyCategoryPieChart
        transactions={transactions}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />
    </div>
  );
};

export default Dashboard;