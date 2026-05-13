
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getProfile, updateProfile } from "../services/Api";
import "../styles/profile.css";

export default function Profile() {
  const [form, setForm] = useState({
   
    name: "",
    email: "",
    password: "",
  });
 const [userData, setUserData] = useState(null);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  try {
    const userId = localStorage.getItem("userId");

    await updateProfile({
      
      ...form,
    });

    alert("Profile updated successfully");

  } catch (err) {
    console.error(err);
    alert("Update failed");
  }
};

useEffect(() => {
  fetchProfile();
}, []);

const fetchProfile = async () => {
  try {
    const email = localStorage.getItem("email");

    const res = await getProfile(email);

    setUserData(res.data);

    setForm({
      name: res.data.name || "",
      email: res.data.email || "",
      password: "",
    });

  } catch (error) {
    console.log(error);
  }
};

  return (
    <Layout>
      {userData && (
        
  <div className="mb-6 bg-gray-100 p-4 rounded">
    <h2 className="text-xl font-bold mb-2">
      User Information
    </h2>
    <div className="userdata">
    
    <p>
      <strong>Name:</strong> {userData.name || "No Name"}
    </p>

    <p>
      <strong>Email:</strong> {userData.email}
    </p>

    <p>
      <strong>Joined:</strong>{" "}
      {new Date(userData.createdAt).toLocaleDateString()}
    </p>
   </div>
  </div>
)}
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
        
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

      <div className="form">
       <input 
  type="email"
  name="email"
  placeholder="Email"
  value={form.email}
  onChange={(e) =>
    setForm({ ...form, email: e.target.value })
  }
  className="form-profile w-full border p-2 mb-3"
/>

       <input
  type="password"
  name="password"
  placeholder="New Password"
  value={form.password}
  onChange={(e) =>
    setForm({ ...form, password: e.target.value })
  }
  className="form-profile w-full border p-2 mb-3"
/>

        <button
          onClick={handleSubmit}
          className="form-profile bg-blue-500 text-white px-4 py-2 w-full"
        >
          Update Profile
        </button>
      </div>
      </div>
    </Layout>
  );
}