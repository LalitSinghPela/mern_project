
import { Link } from "react-router-dom";
import "../styles/layout.css";

export default function Sidebar({ isMobile, open, setOpen }) {
  return (
    <div
      className={`sidebar ${isMobile ? "mobile" : ""} ${
        open ? "open" : ""
      }`}
    >
      <h2>Finova AI</h2>

      <ul>
        <li className="sidebar-style"><Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link></li>
        <li className="sidebar-style"><Link to="/expenses" onClick={() => setOpen(false)}>Expenses</Link></li>
        <li className="sidebar-style"><Link to="/income" onClick={() => setOpen(false)}>Income</Link></li>
        <li className="sidebar-style"><Link to="/chat" onClick={() => setOpen(false)}>AI Chat</Link></li>
        <li className="sidebar-style"><Link to="/profile" onClick={() => setOpen(false)}>Profile</Link></li>
        <li className="sidebar-style"><Link to="/" onClick={() => setOpen(false)}>Logout</Link></li>
      </ul>
    </div>
  );
}
