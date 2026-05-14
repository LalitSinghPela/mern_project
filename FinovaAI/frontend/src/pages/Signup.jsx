
import { useState } from "react";
import { API } from "../services/Api";
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  const signup = async () => {
    try {

     const res= await API.post("/auth/signup", {
        name,
        email,
        password,
      });
      console.log(res.data)
      alert("Signup successful");

      nav("/");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Signup failed"
      );
     
   
    }
  };

  return (
    <div className="signup-style p-6">

      <h2 className="text-2xl mb-4">
        Signup
      </h2>

      {/* NAME */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="border p-2 block mb-2 w-full"
      />

      {/* EMAIL */}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 block mb-2 w-full"
      />

      {/* PASSWORD */}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2 block mb-2 w-full"
      />

      <button
        onClick={signup}
        className="bg-green-500 text-white p-2 rounded"
      >
        Signup
      </button>

    </div>
  );
}