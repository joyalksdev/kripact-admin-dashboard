import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../utils/toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
       toastSuccess("Login successful");

      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
      toastError("Invalid credentials");

    }
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-8 rounded-xl w-[380px] space-y-5 border border-zinc-800"
      >
        <h2 className="text-2xl font-semibold text-white">Login</h2>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 rounded bg-zinc-800 text-white outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 rounded bg-zinc-800 text-white outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-emerald-500 py-2 rounded font-medium">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
