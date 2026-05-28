import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styles from '../styles/Login.css';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate=useNavigate();
   const submit = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login",
      {
        email,
        password
      }
    );
    console.log("LOGIN response",res.data);
    
        login(res.data.token);
        navigate("/Dashboard" );
   } catch (error) {
    alert("Login failed. Check email or password.");
    console.log("error",error);
  }
  // navigate("/Dashboard" );
};
// navigate("/Dashboard" );
 
return (
    <>
    <div className="loginContainer">
      <form  className="loginForm" >
      <h2 className="title">Login</h2>
      <input className="input1" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input className ="input1" type="password" placeholder="Password"
             onChange={e => setPassword(e.target.value)} />
      <button className="input1" onClick={submit}>Login</button>
      </form>
    </div>
    </>

  );
};

export default Login;
