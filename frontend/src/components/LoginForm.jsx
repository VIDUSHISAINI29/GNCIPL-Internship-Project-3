import React, { useState, useContext } from "react";
import { loginUser } from "../utils/auth.js";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const result = await loginUser(form);

      if (result.token) {
        login(result.token);
        navigate("/profile");
      } else if (result.message) {
        setMessage(result.message);
      } else {
        setMessage("Unexpected response from server.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-modernBgGradient p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-cardBackground p-8 rounded-2xl shadow-neonGlow w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-neonBlue text-center">Login</h2>

        {message && <p className="text-red-500 text-center">{message}</p>}

        <div className="flex flex-col space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="bg-[#2a3a52] placeholder-textSecondary text-textPrimary rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-neonBlue focus:ring-offset-1 transition"
          />

          <div className="relative  ">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="bg-[#2a3a52] placeholder-textSecondary text-textPrimary rounded-lg p-3 w-full pr-20 focus:outline-none focus:ring-2 focus:ring-neonBlue focus:ring-offset-1 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[35px] transform -translate-y-1/2 text-neonPink font-semibold hover:text-neonBlue transition"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-neonBlue hover:bg-neonPink text-cardBackground font-bold py-3 rounded-lg shadow-pinkGlow transition duration-300"
        >
          Login
        </button>

        <p className="text-textSecondary text-center">
          Don't have an account?{" "}
          <Link to='/signup' className="text-neonPink font-semibold cursor-pointer hover:text-neonBlue transition">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
