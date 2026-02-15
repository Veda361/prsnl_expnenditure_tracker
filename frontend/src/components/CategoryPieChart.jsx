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
  "#2563eb", // blue
  "#16a34a", // green
  "#dc2626", // red
  "#f59e0b", // yellow
  "#9333ea", // purple
];

const CategoryPieChart = ({ transactions }) => {
  // Group by category
  const categoryData = transactions.reduce((acc, tx) => {
    if (!acc[tx.category]) {
      acc[tx.category] = 0;
    }

    acc[tx.category] += tx.amount;
    return acc;
  }, {});

  const chartData = Object.entries(categoryData).map(([category, value]) => ({
    name: category,
    value,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full mt-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Category Distribution
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
