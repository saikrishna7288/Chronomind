import { Link, useNavigate } from "react-router-dom";
import { Headphones } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://chronomind-30ma.onrender.com/api/auth/signup",
        { name, email, password }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/Home");

    } catch (error) {
      alert(error.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 text-white">
      <div className="bg-slate-900 border border-white/10 rounded-3xl p-10 w-full max-w-md shadow-2xl">

        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-2 rounded-2xl">
            <Headphones className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Chronomind
          </span>
        </div>

        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account 🚀
        </h2>

        <form onSubmit={handleSignup} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-800 border border-white/10"
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-800 border border-white/10"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-800 border border-white/10"
          />

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-cyan-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;