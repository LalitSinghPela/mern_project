// import Sidebar from "./Sidebar";
// import Topbar from "./Topbar";

// export default function Layout({ children }) {
//   return (
//     <div className="layout">

//       <Sidebar />
//       <Topbar />

//       <div className="main">
//         {children}
//       </div>

//     </div>
//   );
// }
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
// import { useLocation } from "react-router-dom";
import "../styles/layout.css";

export default function Layout({ children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const [open, setOpen] = useState(false);
  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="layout">

      {/* 🔥 SIDEBAR */}
      <Sidebar isMobile={isMobile} open={open} setOpen={setOpen} />

      {/* 🔝 TOPBAR */}
      <Topbar isMobile={isMobile} setOpen={setOpen} />

      {/* 📄 MAIN */}
      <div
        className="main"
        style={{
          marginLeft: isMobile ? "0" : "240px",
          marginTop: "60px",
        }}
      >
        {children}
      </div>

      {/* 🌑 OVERLAY */}
      {isMobile && open && (
        <div
          className="overlay"
          onClick={() => setOpen(false)}
        ></div>
      )}

    </div>
  );
}