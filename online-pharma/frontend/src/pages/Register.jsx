import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

const Registration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    role: "MEMBER",
    approved: false,
    disabled: false,
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    return regex.test(password);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must include upper, lower, number, symbol, and 8+ characters";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Invalid mobile number (10 digits required)";
    }

    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage("Please fix the validation errors");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/members/register",
        {
          ...formData,
          dob: new Date(formData.dob).toISOString().split("T")[0],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setMessage("Registered successfully! Wait for admin approval.");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      console.error("Registration error:", error.response?.data);

      if (error.response?.status === 400) {
        if (error.response.data?.errors) {
          setErrors(error.response.data.errors);
          setMessage("Please correct the highlighted errors");
        } else {
          setMessage(error.response.data || "Registration failed");
        }
      } else {
        setMessage("Server error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reg-container container mt-5">
      <h2 className="text-center mb-4">Member Registration</h2>
      <form onSubmit={handleSubmit} className="reg-form mx-auto">
        <div className="mb-3">
          <label>Name *</label>
          <input
            type="text"
            name="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label>Date of Birth *</label>
          <input
            type="date"
            name="dob"
            className={`form-control ${errors.dob ? "is-invalid" : ""}`}
            value={formData.dob}
            onChange={handleChange}
          />
          {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
        </div>

        <div className="mb-3">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label>Password *</label>
          <input
            type="password"
            name="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={formData.password}
            onChange={handleChange}
          />
         
        </div>

        <div className="mb-3">
          <label>Mobile *</label>
          <input
            type="text"
            name="mobile"
            className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
            value={formData.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
        </div>

        <div className="mb-3">
          <label>Address *</label>
          <textarea
            name="address"
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            value={formData.address}
            onChange={handleChange}
            rows={3}
          />
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>

        <button
          type="submit"
          className="btn btn-success w-100 mt-3"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Registering...
            </>
          ) : (
            "Register"
          )}
        </button>
      </form>

      {message && (
        <div
          className={`alert mt-4 text-center ${
            message.includes("successfully") ? "alert-success" : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Registration;
