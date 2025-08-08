import React from "react";

const Input = ({
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
  label,
  error,
  required = false,
}) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Input;
