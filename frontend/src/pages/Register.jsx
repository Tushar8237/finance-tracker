import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { registerUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) return alert('Passwords do not match!');
        dispatch(registerUser(form)).then((res) => {
            if (!res.error) navigate('/login');
        });
    };

    return (
        <div className="max-w-md mx-auto p-4 mt-10 border shadow rounded">
            <h2 className="text-xl font-bold mb-4">Register</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-3">
                <input name="username" onChange={handleChange} placeholder="Name" required className="w-full border p-2 rounded" />
                <input name="email" onChange={handleChange} type="email" placeholder="Email" required className="w-full border p-2 rounded" />
                <input name="password" onChange={handleChange} type="password" placeholder="Password" required className="w-full border p-2 rounded" />
                <input name="confirmPassword" onChange={handleChange} type="password" placeholder="Confirm Password" required className="w-full border p-2 rounded" />
                <button type="submit" className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded w-full">
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
}
