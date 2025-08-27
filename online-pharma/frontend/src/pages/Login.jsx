import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/members/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const user = await response.json();

                if (!user.disabled) {
                    localStorage.setItem("memberId", user.id);
                    localStorage.setItem("role", user.role);

                  
                    if (user.role === "ADMIN" || user.role === "A") {
                        navigate("/admin");
                    } else {
                        navigate("/member");
                    }
                } else {
                    alert("Your account is pending approval by the admin.");
                }
            } else if (response.status === 401) {
                alert("Invalid password");
            } else if (response.status === 403) {
                alert("Your account is disabled or pending approval.");
            } else if (response.status === 404) {
                alert("User not found");
            } else {
                alert("Login failed with status: " + response.status);
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Backend is not reachable. Is your server running?");
        }
    };

    return (
        <div className="login-container">
            <form className="login-box" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="login-grid">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="login-btn">Login</button>
                <p className="fpass">
                    <a href="/ForgotPassword">Forgot password?</a>
                </p>
                <p className="register-link">
                    Not registered? <a href="/register">Register now</a>
                </p>
            </form>
        </div>
    );
}

export default Login;
