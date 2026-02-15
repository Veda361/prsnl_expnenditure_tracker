import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const MonthlyBarChart = ({ transactions = [] }) => {
  // Group transactions by month (timezone safe)
  const monthlyData = transactions.reduce((acc, tx) => {
    if (!tx.date) return acc;

    const [year, month] = tx.date.split("-");
    const monthIndex = Number(month) - 1;
    const fullYear = Number(year);

    const monthKey = new Date(fullYear, monthIndex)
      .toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: monthKey,
        year: fullYear,
        monthIndex,
        income: 0,
        expense: 0,
      };
    }

    const amount = Number(tx.amount) || 0;

    if (tx.type === "Income") {
      acc[monthKey].income += amount;
    } else {
      acc[monthKey].expense += amount;
    }

    return acc;
  }, {});

  // Convert to array and SORT properly
  const chartData = Object.values(monthlyData).sort(
    (a, b) =>
      a.year - b.year || a.monthIndex - b.monthIndex
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full mt-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Monthly Income vs Expense
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            formatter={(value) =>
              `₹${Number(value).toLocaleString()}`
            }
          />
          <Legend />
          <Bar dataKey="income" fill="#16a34a" />
          <Bar dataKey="expense" fill="#dc2626" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyBarChart;