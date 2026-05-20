import { useState } from "react";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await loginUser({ email, password });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("user", JSON.stringify(user));

      login({ token, user });

      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}