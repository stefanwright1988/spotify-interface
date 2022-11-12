import React from "react";
import "./spinner.css";

const Spinner = () => {
  return (
    <div className="flex flex-col justify-center align-middle content-center">
      <div className="spinner">
        <div className="r1"></div>
        <div className="r2"></div>
        <div className="r3"></div>
        <div className="r4"></div>
        <div className="r5"></div>
      </div>
    </div>
  );
};

export default Spinner;
