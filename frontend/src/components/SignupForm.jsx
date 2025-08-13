import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { signupUser } from '../utils/auth.js';
import { AuthContext } from '../context/AuthContext';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // ✅ new state
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signupUser({ name, email, password, role });

      if (result.message) {
        setMessage(result.message);
        return;
      }
      if (result.token) {
        login(result.token);
        setMessage('Signup successful!');
      } else {
        setMessage('No token received from server.');
      }
      navigate("/");
    } catch (err) {
      console.error('Signup error:', err);
      setMessage('Account already exists. Please Login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-modernBgGradient p-4">
      <form 
        onSubmit={handleSubmit} 
        className="bg-cardBackground p-8 rounded-2xl shadow-neonGlow w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-neonBlue text-center">Sign Up</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="p-3 rounded-lg bg-[#2a3a52] placeholder-textSecondary text-textPrimary focus:outline-none focus:ring-2 focus:ring-neonBlue transition"
        />

        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
          className="p-3 rounded-lg bg-[#2a3a52] placeholder-textSecondary text-textPrimary  focus:outline-none focus:ring-2 focus:ring-neonBlue transition"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
          className="p-3 rounded-lg bg-[#2a3a52] placeholder-textSecondary text-textPrimary focus:outline-none focus:ring-2 focus:ring-neonBlue transition"
        />

        {/* Password field with show/hide toggle */}
        <div className="relative">
          <input
            value={password}
            type={showPassword ? "text" : "password"} // ✅ toggle type
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="p-3 rounded-lg w-full bg-[#2a3a52] placeholder-textSecondary text-textPrimary focus:outline-none focus:ring-2 focus:ring-neonBlue transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[35px] transform -translate-y-1/2 text-textSecondary"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="bg-neonPink text-textPrimary font-semibold py-3 rounded-lg shadow-pinkGlow hover:bg-neonBlue hover:shadow-neonGlow transition"
        >
          Signup
        </button>

        {message && <p className="text-textSecondary text-center">{message}</p>}
      </form>
    </div>
  );
}
