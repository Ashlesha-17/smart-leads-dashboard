import { useState } from "react";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "sales", // default role
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerUser(form);
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "auto" }}>
      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <select
        onChange={(e) =>
          setForm({ ...form, role: e.target.value })
        }
      >
        <option value="sales">Sales</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}