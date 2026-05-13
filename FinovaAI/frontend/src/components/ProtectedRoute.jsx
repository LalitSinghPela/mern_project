import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children }) {
//   return localStorage.getItem("token") ? children : <Navigate to="/" />;
// }


export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}