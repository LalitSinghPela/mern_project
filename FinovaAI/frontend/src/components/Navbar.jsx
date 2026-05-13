import { Link } from "react-router-dom";
import '../styles/home.css';


export default function Navbar() {
  return (
    
    <div className=" navbar bg-gray-800 text-white p-4 flex gap-4">
      <Link className="navElement" to="/dashboard">Dashboard</Link>
      <Link  className="navElement" to="/expenses">Expenses</Link>
      <Link className="navElement" to="/income">Income</Link>
      <Link className="navElement" to="/chat">AI Chat</Link>
      <Link className="navElement" to="/login">Login</Link>
      <Link className="navElement" to="/signup">Signup</Link>
    </div>

  );
  
}

