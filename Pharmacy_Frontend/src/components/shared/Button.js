import React from "react";
import Button from "react-bootstrap/Button";

const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
  variant = "primary",
  size = "medium",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button ${className} ${variant} ${size}`}
    >
      {children}
    </button>
  );
};

export default Button;
