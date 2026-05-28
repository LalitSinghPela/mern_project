import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../styles/Register.css';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const navigate=useNavigate();
  const submit = async () => {
    await axios.post("http://localhost:5000/api/auth/register", {
      name, email, password
    });
    
    alert("Registered!");
  };
 

  return (
    <>
    <div className="registerContainer">
        <form className="registerForm">
          <h2 className="title1 ">Register</h2>
      <input className="input1" placeholder="Name" onChange={e => setName(e.target.value)} />
      <input className="input1" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input  className="input1" type="password" placeholder="Password"
             onChange={e => setPassword(e.target.value)} />
      <button className="input1" onClick={submit}>Register</button>
      </form>
    </div>
      
    </>
  );
};

export default Register;
