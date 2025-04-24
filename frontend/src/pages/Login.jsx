import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form)).then((res) => {
      if (!res.error) navigate("/");
    });
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-10 border shadow rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email"
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
