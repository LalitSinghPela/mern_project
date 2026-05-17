import axios from "axios";
import {useState} from "react";

export default function Register(){

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const submit=async(e)=>{
        e.preventDefault();

        await axios.post(
          "https://ecommerce-ur3e.onrender.com/api/users/register",
          {name,email,password}
        );

        alert("Registered");
    };

    return(
        <form className="logincontainer" onSubmit={submit}>

            <input className="logininput" placeholder="Name"
            onChange={e=>setName(e.target.value)}/>

            <input className="logininput" placeholder="Email"
            onChange={e=>setEmail(e.target.value)}/>

            <input className="logininput" type="password"
            placeholder="Password"
            onChange={e=>setPassword(e.target.value)}/>

            <button className="logininput">Register</button>

        </form>
    );
}