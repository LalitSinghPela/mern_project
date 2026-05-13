import { useEffect, useState } from "react";
import { API } from "../services/Api";
import Layout from "../components/Layout";
import "../styles/dashboard.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";


export default function Dashboard() {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [trendType, setTrendType] = useState("yearly");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  // const [insights, setInsights] = useState("");

  // 🔥 Fetch data
  const fetchData = async () => {
    const inc = await API.get("/income");
    const exp = await API.get("/expenses");

    setIncome(inc.data);
    setExpenses(exp.data);

    const incomeSum = inc.data.reduce((a, b) => a + b.amount, 0);
    const expenseSum = exp.data.reduce((a, b) => a + b.amount, 0);

    setTotalIncome(incomeSum);
    setTotalExpense(expenseSum);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const balance = totalIncome - totalExpense;
  const savingRate = totalIncome
    ? ((balance / totalIncome) * 100).toFixed(1)
    : 0;

  // 📊 Monthly trend
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const getTrendData = () => {
  if (trendType === "yearly") {
    // 👉 FULL YEAR (Jan–Dec)
    return months.map((m, i) => {
      const inc = income
        .filter(item => new Date(item.date).getMonth() === i)
        .reduce((sum, item) => sum + item.amount, 0);

      const exp = expenses
        .filter(item => new Date(item.date).getMonth() === i)
        .reduce((sum, item) => sum + item.amount, 0);

      return { name: m, income: inc, expense: exp };
    });
  } else {
    // 👉 SINGLE MONTH DATA
    const inc = income
      .filter(item => new Date(item.date).getMonth() === selectedMonth)
      .reduce((sum, item) => sum + item.amount, 0);

    const exp = expenses
      .filter(item => new Date(item.date).getMonth() === selectedMonth)
      .reduce((sum, item) => sum + item.amount, 0);

    return [
      {
        name: months[selectedMonth], // only one month name
        income: inc,
        expense: exp
      }
    ];
  }
};
 

  // 🥧 Category Pie
  const getCategoryData = () => {
    const map = {};

    expenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + e.amount;
    });

    return Object.keys(map).map((key) => ({
      name: key,
      value: map[key]
    }));
  };

  // 📋 Recent transactions
  const recentTransactions = [
    ...income.map(i => ({...i, type: "income"})),
    ...expenses.map(e => ({...e, type: "expense"}))
  ]
    .sort((a,b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // 🧠 Smart Insights (simple AI logic)
  const getInsights = () => {
    if (totalExpense > totalIncome) {
      return "⚠️ You are spending more than you earn.";
    }
    if (savingRate < 20) {
      return "💡 Try to save at least 20% of your income.";
    }
    return "✅ Your financial health looks good!";
  };

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f"];

  return (
    <Layout>
    <div className="p-6 space-y-6">

      {/* 🔥 STATUS CARDS */}
      <div className=" cards grid md:grid-cols-4 gap-4">
         
        <Card title="Total Income" value={`₹${totalIncome}`} />
        <Card title="Total Expense" value={`₹${totalExpense}`} />
        <Card title="Balance" value={`₹${balance}`} />
        <Card title="Saving Rate" value={`${savingRate}%`} />
      </div>
      
      <div className="filter-bar flex gap-3 mb-3">

  {/* Trend Type */}
  <select
    value={trendType}
    onChange={(e) => setTrendType(e.target.value)}
    className="border p-2 rounded"
  >
    <option value="yearly">Yearly Trend</option>
    <option value="monthly">Monthly Trend</option>
  </select>

  {/* Month Selector (only for monthly) */}
  {trendType === "monthly" && (
    <select
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(Number(e.target.value))}
      className="border p-2 rounded"
    >
      {months.map((m, i) => (
        <option key={i} value={i}>{m}</option>
      ))}
    </select>
  )}

</div>
      
      {/* 📊 CHARTS */}
      <div className=" charts grid md:grid-cols-2 gap-6">

        {/* Line Chart */}
        <div className=" colorcharts dcharts-box bg-white p-4 rounded-xl shadow">
          <h2 className="font-bold mb-3">Income vs Expense</h2>

          <ResponsiveContainer width="100%" height={250}>
  <LineChart data={getTrendData()}>
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />

    {/* Income Line */}
    <Line
      type="monotone"
      dataKey="income"
      stroke="#22c55e"
      strokeWidth={2}
    />

    {/* Expense Line */}
    <Line
      type="monotone"
      dataKey="expense"
      stroke="#ef4444"
      strokeWidth={2}
    />

  </LineChart>
</ResponsiveContainer>
          
        </div>

        {/* Pie Chart */}
        <div className=" chart-box bg-white p-4 rounded-xl shadow">
          <h2 className="font-bold mb-3">Expense Categories</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={getCategoryData()}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
              >
                {getCategoryData().map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* 📋 RECENT + INSIGHTS */}
      <div className=" bottom grid md:grid-cols-2 gap-6">

        {/* Recent Transactions */}
        <div className=" transactions bg-white p-4 rounded-xl shadow">
          <h2 className="font-bold mb-3">Recent Transactions</h2>

        
          <div className="overflow-x-auto">

  <table className="w-full border-collapse">

    <thead>
      <tr className="bg-gray-100 text-left">

        <th className="p-3 border-b">
          Type
        </th>

        <th className="p-3 border-b">
          Category
        </th>

        <th className="p-3 border-b">
          Date
        </th>

        <th className="p-3 border-b text-right">
          Amount
        </th>

      </tr>
    </thead>

    <tbody>

      {recentTransactions.map((t, i) => (

        <tr
          key={i}
          className="hover:bg-gray-50"
        >

          <td className="p-3 border-b">

            <span
              className={
                t.type === "income"
                  ? "text-green-500 font-medium"
                  : "text-red-500 font-medium"
              }
            >
              {t.type}
            </span>

          </td>

          <td className="p-3 border-b">
            {t.category || t.source}
          </td>

          <td className="p-3 border-b">
            {new Date(t.date).toLocaleDateString()}
          </td>

          <td
            className={
              `p-3 border-b text-right font-semibold ${
                t.type === "income"
                  ? "text-green-500"
                  : "text-red-500"
              }`
            }
          >
            ₹{t.amount}
          </td>

        </tr>
      ))}

    </tbody>

  </table>

</div>
        </div>

        {/* AI Insights */}
       <div className="insights bg-white p-4 rounded-xl shadow">
          <h2 className="font-bold mb-3">Smart Insights</h2>

          <p className="text-gray-600">
            {getInsights()}
          </p>
        </div>
      </div>

    </div>
    </Layout>
  );
}

// 🔥 Card Component

function Card({ title, value, color }) {

  return (
    <div
      style={{
        background: "#386b87",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        color: "white"
      }}
    >

      <p style={{ fontSize: "14px", opacity: 0.9 }}>
        {title}
      </p>

      <h2
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          marginTop: "10px"
        }}
      >
        {value}
      </h2>

    </div>
  );
}