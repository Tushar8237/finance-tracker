import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const res = await dispatch(registerUser(form)).unwrap(); // cleaner with unwrap

            toast.success("Registration successful!");
            setForm({ username: "", email: "", password: "", confirmPassword: "" });
            navigate("/login");
        } catch (err) {
            toast.error(err?.message || "Registration failed!");
            console.error("Registration error:", err);
        }
    };

    // Redirect to Login page if the user doesn't have an account
    const redirectToLogin = () => {
        navigate("/login");
    };

    return (
        <div className="max-w-md mx-auto p-4 mt-10 border shadow rounded">
            <h2 className="text-xl font-bold mb-4">Register</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    name="username"
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="w-full border p-2 rounded"
                />
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
                <input
                    name="confirmPassword"
                    onChange={handleChange}
                    type="password"
                    placeholder="Confirm Password"
                    required
                    className="w-full border p-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded w-full"
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
            {/* Add a message with a link to the Login page */}
            <div className="mt-4 text-center">
                <p>
                    Already have an account?{" "}
                    <button
                        onClick={redirectToLogin}
                        className="text-blue-600 hover:underline cursor-pointer"
                    >
                        Login here
                    </button>
                </p>
            </div>
        </div>
    );
}
