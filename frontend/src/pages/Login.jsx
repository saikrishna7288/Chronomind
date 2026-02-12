import { Link, useNavigate } from "react-router-dom";
import { Headphones } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // TEMP: direct navigation (backend later)
    navigate("/Home");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 text-white">
      <div className="bg-slate-900 border border-white/10 rounded-3xl p-10 w-full max-w-md shadow-2xl">
        
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-2 rounded-2xl">
            <Headphones className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Chronomind
          </span>
        </div>

        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-4 rounded-xl bg-slate-800 border border-white/10 focus:border-cyan-500 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-4 rounded-xl bg-slate-800 border border-white/10 focus:border-cyan-500 outline-none"
          />

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold hover:scale-105 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6">
          Don’t have an account?{" "}
          <Link to="/Signup" className="text-cyan-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
