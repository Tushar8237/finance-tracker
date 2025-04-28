// src/components/ClearErrorOnRouteChange.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { clearError } from "../features/auth/authSlice";

const ClearErrorOnRouteChange = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // Dispatch clearError whenever route changes
    dispatch(clearError());
  }, [location, dispatch]);

  return null;
};

export default ClearErrorOnRouteChange;
