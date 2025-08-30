import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/ResetPassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    
    if (!email || !newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

   
    try {
      const response = await axios.post(
        "http://localhost:8080/api/members/reset-password",
        { email, newPassword },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 5000,
        }
      );

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(response.data.message || "Password reset failed");
      }
    } catch (error) {
      console.error("Reset error:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to reset password. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <form className="reset-box" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>

        {error && <div className="error-message">{error}</div>}
        {success && (
          <div className="success-message">
            Password reset successful! Redirecting to login...
          </div>
        )}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading || success}
        />

        <input
          type="password"
          placeholder="Enter new password (min 8 characters)"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          disabled={isLoading || success}
          minLength="8"
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isLoading || success}
          minLength="8"
        />

        <button
          type="submit"
          className="reset-btn"
          disabled={isLoading || success}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span> Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
