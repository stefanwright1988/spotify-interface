import React from "react";
import { FaSpotify } from "react-icons/fa";

const Login = () => {
  const AUTH_URL = import.meta.env.VITE_AUTH_URL;
  return (
    <div className="login flex items-center align-middle content-center justify-center">
      <div
        id="card"
        className="flex flex-col bg-white rounded-md w-10/12 justify-center items-center align-middle self-center p-5 border-black border-2"
        style={{ boxShadow: "5px 5px black" }}
      >
        <div className="boxContainer m-4">
          <div className="box box1"></div>
          <div className="box box2"></div>
          <div className="box box3"></div>
          <div className="box box4"></div>
          <div className="box box5"></div>
        </div>
        <a
          id="user"
          href={AUTH_URL}
          className="loginButton flex bg-yellow-200 w-11/12 rounded-md text-center h-10 items-center border-black border-2"
          style={{ boxShadow: "4px 4px black" }}
        >
          <span className="font-bold text-center w-full ">
            Authorise via Spotify <FaSpotify className="inline-block" />
          </span>
        </a>
      </div>
    </div>
  );
};

export default Login;
