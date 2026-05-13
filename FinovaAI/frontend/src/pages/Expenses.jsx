import { useState, useEffect } from "react";
import { API } from "../services/api";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Layout from "../components/Layout";
import "../styles/expense.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Expenses() {
  const [allData, setAllData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const [isRangeMode, setIsRangeMode] = useState(false);

  // 🔥 Fetch all
  const fetchAll = async () => {
    const res = await API.get("/expenses");
    setAllData(res.data);
  };

  // 🔥 Filter by selected date
  const filterByDate = (date, data) => {
    const result = data.filter(
      (item) =>
        new Date(item.date).toDateString() ===
        date.toDateString()
    );
    setFiltered(result);
  };

  // 🔥 Filter by range
  const filterByRange = () => {
    if (!fromDate || !toDate) return;

    const start = new Date(fromDate);
    const end = new Date(toDate);

    const result = allData.filter((item) => {
      const d = new Date(item.date);
      return d >= start && d <= end;
    });

    setFiltered(result);
    setIsRangeMode(true);
  };

  // 🔥 Reset filter
  const resetFilter = () => {
    setIsRangeMode(false);
    filterByDate(selectedDate, allData);
  };

  // 🔥 Add expense
  const addExpense = async () => {
    if (!amount || !category) return;

    await API.post("/expenses", {
      amount,
      category,
      date: selectedDate
    });

    setAmount("");
    setCategory("");
    fetchAll();
  };

  // 🔥 Delete expense
  const removeExpense = async (id) => {
    await API.delete(`/expenses/${id}`);
    fetchAll();
  };

   const getMonthlyData = () => {
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const result = months.map((month, index) => {
    const total = allData
      .filter((item) => {
        const d = new Date(item.date);
        return d.getMonth() === index;
      })
      .reduce((sum, item) => sum + item.amount, 0);

    return { name: month, total };
  });

  return result;
};
  // 🔥 Calendar daily total
  const getDailyTotal = (date) => {
    return allData
      .filter(
        (item) =>
          new Date(item.date).toDateString() ===
          date.toDateString()
      )
      .reduce((sum, item) => sum + item.amount, 0);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    if (!isRangeMode) {
      filterByDate(selectedDate, allData);
    }
  }, [selectedDate, allData, isRangeMode]);

  return (
    <Layout>
    <div className=" p-6">
      <div className="charts">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
      {/* barchart */}
      <div className="charts-box bg-white p-5 rounded-xl shadow mb-6">
        {/* <h2 className="font-bold mb-4">📊 Monthly Expenses</h2> */}

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={getMonthlyData()}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* RIGHT SIDE */}
      {/* ➕ ADD */}
          <div className=" expense-form bg-white p-5 rounded-xl shadow mb-4">
            <h2 className="font-bold mb-3">Add Expense</h2>

            <p className="text-sm text-gray-500 mb-2">
              Adding for: <b>{selectedDate.toDateString()}</b>
            </p>

            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="w-full mb-2"
            />

            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
              className="w-full mb-2"
            />

            <button
              onClick={addExpense}
              className="add-btn w-full bg-red-500 text-white"
            >
              ➕ Add Expense
            </button>
          </div>
      </div>
      

      {/* 📅 CALENDAR */}
        <div className="calender bg-white p-4 rounded-xl shadow">
          <h2 className="font-bold mb-3">📅 Select Date</h2>

          <Calendar
            value={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setIsRangeMode(false); // switch back to date mode
            }}

            tileContent={({ date, view }) => {
              if (view === "month") {
                const total = getDailyTotal(date);

                return total > 0 ? (
                  <p className="text-[9px] text-red-500 text-center">
                    ₹{total}
                  </p>
                ) : null;
              }
            }}
          />

          <p className="mt-3 text-sm text-gray-600">
            Selected: {selectedDate.toDateString()}
          </p>
        </div>
      </div>
      
      

      <div className="expense-list grid md:grid-cols-2 gap-6">

        

        

          {/* 🔥 MANUAL RANGE FILTER */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-3 items-center">
         <h2 className="font-bold mb-3">
              {isRangeMode
                ? "Expenses (Selected Range)"
                : "Expenses (Selected Date)"}
            </h2>

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-2 rounded"
        />

        <span>to</span>

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={filterByRange}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Filter
        </button>

        <button
          onClick={resetFilter}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

          {/* 📋 LIST */}
          <div className="  bg-white p-5 rounded-xl shadow">
           
            {filtered.length === 0 ? (
              <p className="text-gray-500">No expenses</p>
            ) : (
              filtered.map((item) => (
                <div
                  key={item._id}
                  className=" expense-lists flex justify-between items-center border-b py-2"
                >
                  <div className="expense-box" >
                    <p className="expense-date">{item.category}</p>
                    <p className="expense-date text-sm text-gray-500">
                      ₹{item.amount}
                    </p>
                    <p className="expense-date text-xs text-gray-400">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>

                  <button
                    onClick={() => removeExpense(item._id)}
                    className="expense-btn bg-red-500 text-white px-2 py-1 text-xs rounded"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    
    </Layout>
    
  );
}

