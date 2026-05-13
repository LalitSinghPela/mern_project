
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API } from "../services/Api";
import "../styles/login.css";



export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const nav = useNavigate();



const login = async () => {

  try {

    // API request
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    // store token
    localStorage.setItem("token", res.data.token);

    // store user info
    localStorage.setItem(
      "name",
      res.data.user?.name || "User"
    );

    localStorage.setItem(
      "email",
      res.data.user?.email || ""
    );

    localStorage.setItem(
      "userId",
      res.data.user?._id || ""
    );

    // ✅ success alert
    alert("Login successful");

    // redirect
    nav("/dashboard");

  } catch (error) {

    console.log(error);

    // ❌ error alert
    alert(
      error.response?.data?.message ||
      "Invalid email or password"
    );
  }
};


  // 👉 If URL is "/" → show landing page
  if (window.location.pathname === "/") {
    return (
      <div className=" h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">

        <h1 className="index-title text-4xl font-bold mb-6">
          Finova AI
        </h1>

        <div className="index-page flex gap-4">
          < Link  to="/login" className="landing-page bg-white text-blue-600 px-6 py-2 rounded-lg">
            Login
          </Link>

          < Link to="/signup" className="landing-page bg-green-400 px-6 py-2 rounded-lg">
            Signup
          </Link>
        </div>

      </div>
    );
  }

  // 👉 Otherwise show login form
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className=" login-style bg-white p-8 rounded-xl shadow w-96">

        <h2 className="login-style1 text-2xl font-bold mb-4">Login</h2>
        <p>User Name</p>
        <input onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full mb-3"/>
        <p>Password</p>
        <input type="password" onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full mb-3"/>

        <button onClick={login} className="login-style2 w-full bg-blue-500 text-white">
          Login
        </button>

        <p className="login-style1 mt-4">
          Don't have account?{" "}
          <Link to="/signup" className="text-blue-500">Signup</Link>
        </p>

      </div>
    </div>
  );
}