import React from "react";
import "./spinner.css";

const Spinner = () => {
  return (
    <div className="flex flex-col justify-center items-center align-middle content-center h-full">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
