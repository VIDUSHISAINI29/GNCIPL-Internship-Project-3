import React, { useState } from "react";
import { signupUser } from "../utils/auth.js";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await signupUser(form);
      navigate("/login");
    } catch (err) {
        console.log("err = ", err.response?.data.code);
        
      if (err.response?.data?.code?.includes("invalid_signup")) {
        setMessage("Email already exists. Please login.");
      } else {
        setMessage("Signup failed. Try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Signup</button>
    </form>
  );
}
