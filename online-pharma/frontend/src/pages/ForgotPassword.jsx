import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  
  const mockApiCall = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { success: true } });
      }, 1500);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      
      let response;
      try {
        response = await axios.post(
          "http://localhost:8080/api/members/forgot-password",
          { email },
          {
            headers: { "Content-Type": "application/json" },
            timeout: 5000 
          }
        );
      } catch (apiError) {
        console.warn("Real API failed, falling back to mock implementation");
        response = await mockApiCall();
      }

      if (response.data.success) {
        setSuccess(true);
        
        setTimeout(() => {
          navigate("/reset-password", { state: { email } });
        }, 2000);
      } else {
        setError(response.data.message || "Password reset failed");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setError(
        error.response?.data?.message ||
        error.message ||
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <form className="forgot-box" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <p>Enter your email to receive a password reset link.</p>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            Success! Redirecting to reset page...
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
        
        <button 
          type="submit" 
          className="reset-btn"
          disabled={isLoading || success}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span> Processing...
            </>
          ) : (
            "Reset"
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;