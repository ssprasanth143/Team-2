import React from "react";

const Loader = ({ type = "spinner", size = "medium", color = "#007bff" }) => {
  if (type === "spinner") {
    return (
      <div
        className="loader"
        style={{ width: size, height: size, borderColor: color }}
      >
        <div className="loader-spinner"></div>
      </div>
    );
  } else if (type === "progress") {
    return (
      <div className="progress-loader">
        <div
          className="progress-bar"
          style={{ width: `${size}%`, backgroundColor: color }}
        ></div>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default Loader;
