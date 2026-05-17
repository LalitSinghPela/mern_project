import axios from "axios";
import {useState} from "react";
import "./Home.css";

export default function Login(){

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const submit=async(e)=>{
        e.preventDefault();

        try {
            const res = await axios.post(
              "https://ecommerce-ur3e.onrender.com//api/users/login",
              {email,password}
            );

            localStorage.setItem("token",res.data.token);
            alert("Login Success");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("Invalid email or password");
            } else {
                alert("An error occurred. Please try again.");
            }
        }
    };

    return(
         <>
         <div >
        <form className="logincontainer"onSubmit={submit}>

            <input className="logininput"
              placeholder="Email"
              onChange={e=>setEmail(e.target.value)}
            />

            <input className="logininput"
              type="password"
              placeholder="Password"
              onChange={e=>setPassword(e.target.value)}
            />

            <button className="logininput">Login</button>

        </form>
        </div>
        </>
    );
}