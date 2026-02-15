import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#f59e0b",
  "#9333ea",
  "#14b8a6",
];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MonthlyCategoryPieChart = ({
  transactions = [],
  selectedMonth,
  selectedYear,
}) => {
  if (!Array.isArray(transactions)) {
    return <p className="text-center py-10">Loading...</p>;
  }

  // FILTER BY MONTH & YEAR
  const filteredTransactions = transactions.filter((t) => {
    if (!t.date) return false;

    const [year, month] = t.date.split("-");
    return Number(month) - 1 === selectedMonth && Number(year) === selectedYear;
  });

  // GROUP BY CATEGOR..y
  const categoryData = filteredTransactions.reduce((acc, tx) => {
    const category = tx.category || "Others";
    const amount = Number(tx.amount) || 0;

    if (!acc[category]) {
      acc[category] = 0;
    }

    acc[category] += amount;
    return acc;
  }, {});

  const chartData = Object.entries(categoryData).map(([category, value]) => ({
    name: category,
    value,
  }));

  const monthLabel = MONTH_NAMES[selectedMonth] + " " + selectedYear;

  const totalAmount = chartData.reduce((sum, item) => sum + item.value, 0);
  return (
    <div className="pie-parent mt-6">
      <div className="pie-card">
        <div className="pie-content">
          <h2 className="pie-title text-center">
            {monthLabel} Category Distribution
          </h2>

          <p className="pie-total text-center mb-6">
            Total: ₹{totalAmount.toLocaleString()}
          </p>

          {chartData.length === 0 ? (
            <p className="text-center text-gray-400 py-10">
              No transactions for {monthLabel}
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => `₹${Number(value).toLocaleString()}`}
                />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthlyCategoryPieChart;
