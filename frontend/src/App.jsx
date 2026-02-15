import { useState, useEffect } from "react";
import Dropdown from "./components/Dropdown";
import axios from "axios";
import MonthlyBarChart from "./components/MonthlyBarChart";
import MonthlyCategoryPieChart from "./components/MonthlyCategoryPieChart";

const API = import.meta.env.VITE_API_URL;

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

const App = () => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [transactions, setTransactions] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState("");

  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const categories = {
    "🏠 Essential Living": [
      "Rent",
      "Utilities",
      "Internet",
      "Groceries",
      "Dining Out",
    ],
    "🚗 Transport": [
      "Fuel",
      "Public Transport",
      "Cab / Ride Sharing",
      "Vehicle Maintenance",
    ],
    "🏥 Health & Insurance": [
      "Medicines",
      "Doctor Visit",
      "Health Insurance",
      "Gym",
    ],
    "🎓 Education & Career": [
      "Books",
      "Online Courses",
      "College Fees",
      "Skill Development",
    ],
    "🎮 Lifestyle & Entertainment": [
      "Movies / OTT",
      "Gaming",
      "Shopping",
      "Events",
    ],
    "💰 Financial": ["Credit Card Bill", "Loan EMI", "Investments", "Savings"],
    "🌍 Travel": ["Flights", "Hotel", "Vacation", "Train Tickets"],
  };
  const types = ["Expense", "Income"];

  // MONTH NAVIGATION

  const handleNextMonth = () => {
    setSelectedMonth((prev) => {
      if (prev === 11) {
        setSelectedYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const handlePrevMonth = () => {
    setSelectedMonth((prev) => {
      if (prev === 0) {
        setSelectedYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  // FETCH ALL TRANSACTIONS

  useEffect(() => {
    axios
      .get(`${API}/transactions/`)
      .then((res) => setTransactions(res.data))
      .catch((err) => console.log(err));
  }, []);

  // FETCH MONTHLY SUMMARY

  useEffect(() => {
    axios
      .get(
        `${API}/transactions/summary?month=${selectedMonth + 1}&year=${selectedYear}`,
      )
      .then((res) => setSummary(res.data))
      .catch((err) => console.log(err));
  }, [selectedMonth, selectedYear, transactions]);

  // FILTER MONTHLY TRANSACTIONS

  const monthlyTransactions = transactions.filter((t) => {
    if (!t.date) return false;

    const [year, month] = t.date.split("-");
    return Number(year) === selectedYear && Number(month) - 1 === selectedMonth;
  });

  // ADD TRANSACTION

  const addTransactions = async () => {
    if (!type || !amount || !category) {
      alert("Please fill all fields");
      return;
    }

    const newTransaction = {
      amount: Number(amount),
      category,
      type,
      date: selectedDate || new Date().toISOString().split("T")[0],
      note: note || "No additional notes",
    };

    try {
      const res = await axios.post(`${API}/transactions/`, newTransaction)

      setTransactions((prev) => [...prev, res.data]);

      setAmount("");
      setCategory("");
      setType("");
      setNote("");
      setSelectedDate("");
    } catch (error) {
      console.log(error);
      alert("Error saving transaction");
    }
  };

  // DELETE TRANSACTION

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/transactions/${id}`);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.log(err);
      alert("Error deleting transaction");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1120] text-white p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-wide bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Personal Analytics Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Track • Analyze • Optimize
          </p>
        </div>

        <div className="text-lg font-semibold bg-gray-800 px-6 py-2 rounded-xl border border-gray-700">
          {MONTH_NAMES[selectedMonth]} {selectedYear}
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl border border-gray-700 shadow-xl">
          <p className="text-gray-400 text-sm">Total Income</p>
          <h2 className="text-3xl font-bold text-green-400 mt-2">
            ₹{summary.income}
          </h2>
        </div>

        <div className="bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl border border-gray-700 shadow-xl">
          <p className="text-gray-400 text-sm">Total Expense</p>
          <h2 className="text-3xl font-bold text-red-400 mt-2">
            ₹{summary.expense}
          </h2>
        </div>

        <div className="bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl border border-gray-700 shadow-xl">
          <p className="text-gray-400 text-sm">Net Balance</p>
          <h2
            className={`text-3xl font-bold mt-2 ${
              summary.balance >= 0 ? "text-cyan-400" : "text-rose-400"
            }`}
          >
            ₹{summary.balance}
          </h2>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT PANEL */}
        <div className="lg:col-span-1 space-y-8">
          {/* MONTH NAVIGATION */}
          <div className="flex justify-between items-center bg-gray-800/60 backdrop-blur-lg p-4 rounded-xl border border-gray-700">
            <button onClick={handlePrevMonth} className="month-btn ">
              <svg className="arr-1" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" />
              </svg>

              <span className="text">Prev</span>

              <span className="circle"></span>

              <svg className="arr-2" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <span className="font-medium">
              {MONTH_NAMES[selectedMonth]} {selectedYear}
            </span>

            <button onClick={handleNextMonth} className="month-btn">
              {/* Left Arrow (slides in) */}
              <svg className="arr-2" viewBox="0 0 24 24">
                <path d="M9 6l6 6-6 6" />
              </svg>

              <span className="text">Next</span>

              <span className="circle"></span>

              {/* Right Arrow (slides out) */}
              <svg className="arr-1" viewBox="0 0 24 24">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
          {/* ADD TRANSACTION */}
          <div className="neo-card">
            <div className="neo-content">
              <h2 className="neo-title">Add Transaction</h2>

              <Dropdown
                className="w-full"
                options={types}
                value={type}
                onChange={setType}
              />

              <Dropdown
                className="w-full"
                options={categories}
                value={category}
                onChange={setCategory}
              />

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="neo-input w-full"
              />

              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add note"
                className="neo-input w-full"
              />

              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="neo-input w-full"
              />

              <button onClick={addTransactions} className="glow-btn">
                Add Transaction
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:col-span-2 space-y-8">
          {/* TRANSACTION LIST */}
          <div className="bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl border border-gray-700 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Monthly Transactions</h3>

            {monthlyTransactions.length === 0 && (
              <p className="text-gray-400 text-sm">
                No transactions this month
              </p>
            )}

            {monthlyTransactions.map((t) => (
              <div
                key={t.id}
                className="flex justify-between py-2 border-b border-gray-700 text-sm"
              >
                <span>
                  {t.type} • {t.category}
                </span>

                <div className="flex gap-4">
                  <span>₹{t.amount}</span>
                  <button
                    onClick={() => deleteTransaction(t.id)}
                    className="delete-btn"
                  >
                    <span className="hover-text" data-text="Delete"></span>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CHARTS */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl border border-gray-700 shadow-xl">
              <MonthlyBarChart transactions={transactions} />
            </div>

            <div className="bg-gray-800/60 backdrop-blur-lg p-6 rounded-2xl border border-gray-700 shadow-xl">
              <MonthlyCategoryPieChart
                transactions={transactions}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
