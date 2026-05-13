
import { useState, useEffect } from "react";
import { API } from "../services/api";
import Layout from "../components/Layout";
import "../styles/expense.css";

export default function Income() {
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");

  // 🔥 Fetch from DB
  const fetchData = async () => {
    const res = await API.get("/income");
    setData(res.data);
  };

  // 🔥 Add income to DB
  const addIncome = async () => {
  if (!amount || !source) return;

  await API.post("/income", {
    amount,
    source,
    date: new Date() // optional (backend already handles)
  });

  setAmount("");
  setSource("");
  fetchData();
};

  // 🔥 Delete from DB
 const removeIncome = async (id) => {
  const res = await API.delete(`/income/${id}`);

  alert("Deleted at: " + new Date(res.data.deletedAt).toLocaleString());

  fetchData();
};

  // Load on page open
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
    <div className="p-6 max-w-2xl mx-auto">

      <h2 className="text-2xl font-bold mb-6 text-center">
        💰 Income Management
      </h2>

      {/* ADD FORM */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">

        <h3 className="text-lg font-semibold mb-3">Add Income</h3>

        <div className="flex gap-3 mb-3">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="flex-1"
          />

          <input
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Source"
            className="flex-1"
          />
        </div>

        <button
          onClick={addIncome}
          className="w-full bg-green-500 text-white"
        >
          ➕ Add Income
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white p-5 rounded-xl shadow">

        <h3 className="text-lg font-semibold mb-4">Income List</h3>
        <div className="income-color">
        {data.length === 0 ? (
          <p className="text-gray-500 text-center">No income found</p>
        ) : (
          data.map((item) => (
            <div
              key={item._id}
              className="income-lists flex justify-between items-center border-b py-3"
            >
              <div className="income-list">
                <p className="income-element font-semibold">{item.source}</p>
                <p className="income-element text-sm text-gray-500">₹{item.amount}</p>
              </div>

             
                <p className="income-element text-xs text-gray-400">
                 {new Date(item.date).toLocaleString()}
                </p>
    


              <button
                onClick={() => removeIncome(item._id)}
                className="income-element bg-red-500 text-white px-3 py-1"
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