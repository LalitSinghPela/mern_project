
import "../styles/layout.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const username = localStorage.getItem("name") || "U";
import "../styles/dashboard.css";
// localStorage.setItem("name", res.data.user.name);

export default function Topbar({ isMobile, setOpen }) {
  const location = useLocation();
  const getPageTitle = () => {

  switch (location.pathname) {

    case "/dashboard":
      return "Dashboard";

    case "/income":
      return "Income";

    case "/expenses":
      return "Expenses";

    case "/profile":
      return "Profile";

    case "/chat":
      return "AI Chat";

    default:
      return "FinPilot";
  }
};
  return (
    <div className="topbar">

      {/* ☰ HAMBURGER */}
      {isMobile && (
        <button
          className="hamburger"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      )}

      {/* <h3>FinPilot</h3> */}
      <h1 className="text-2xl font-bold">
  {getPageTitle()}
</h1>

      {/* <div className="profile">
        <img src="https://i.pravatar.cc/40" alt="profile" />
      </div> */}
      <Link to="/profile">

  <div className="topbar-icon w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold cursor-pointer">

    {username.charAt(0).toUpperCase()}

  </div>

</Link>
    </div>
  );
}