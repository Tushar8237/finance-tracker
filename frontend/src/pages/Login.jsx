import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(loginUser(form)).unwrap(); // unwrap gives direct access to payload or throws error
      toast.success("Login successful!");
      navigate("/"); // Navigate to the home page after successful login
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err?.message || "Login failed!");
    }
  };

  // Redirect to Register page if the user doesn't have an account
  const redirectToRegister = () => {
    navigate("/register");
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

      {/* Add a message with a link to the Register page */}
      <div className="mt-4 text-center">
        <p>
          Don't have an account?{" "}
          <button
            onClick={redirectToRegister}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}
