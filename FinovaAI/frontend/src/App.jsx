
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Income from "./pages/Income";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";



import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function Layout() {
  const location = useLocation();


  return (
    <>
      {/* {!hideNavbar && <Navbar />} */}

      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Login />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected */}
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard/></ProtectedRoute>
        }/>

        <Route path="/expenses" element={
          <ProtectedRoute><Expenses/></ProtectedRoute>
        }/>

        <Route path="/income" element={
          <ProtectedRoute><Income/></ProtectedRoute>
        }/>

        <Route path="/chat" element={
          <ProtectedRoute><Chat/></ProtectedRoute>
        }/>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    
    
    </>
  );
}

export default function App(){
  return (
    <BrowserRouter>
      <Layout/>
    </BrowserRouter>
  );
}