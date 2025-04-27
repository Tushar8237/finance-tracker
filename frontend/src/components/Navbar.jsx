import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { logout } from "../features/auth/authSlice";
import { logoutUser } from "../features/auth/authActions";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.auth.user);
    const [userAuthData, setUserAuthData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const currentPath = location.pathname;

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        setUserAuthData(user || userData);
    }, [user]);

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser());
            dispatch(logout());
            toast.success("Logged out successfully");
            navigate("/login");
        } catch (err) {
            toast.error("Logout failed");
        }
    };

    const shouldShowAuthControls = !["/login", "/register"].includes(currentPath);

    return (
        <nav className="bg-gray-800 text-white px-6 py-4 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center"> 
                <Link to="/" className="text-xl font-bold">
                    💰 Finance Tracker
                </Link>

                {/* Hamburger Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>

                {/* Desktop Menu */}
                {shouldShowAuthControls && (
                    <div className="hidden md:flex gap-6 items-center">
                        {userAuthData ? (
                            <>
                                <span className="text-sm">👤 {userAuthData.username}</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-600 cursor-pointer px-3 py-1 rounded"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hover:underline">
                                    Login
                                </Link>
                                <Link to="/register" className="hover:underline">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            {isOpen && shouldShowAuthControls && (
                <div className="md:hidden mt-4 flex flex-col gap-3 items-start px-4">
                    {userAuthData ? (
                        <>
                            <span className="text-sm">👤 {userAuthData.username}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:underline">
                                Login
                            </Link>
                            <Link to="/register" className="hover:underline">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
