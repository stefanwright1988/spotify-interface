import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Dashboard from "./Dashboard";

const accessCode = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    <div className="App">
      {accessCode ? <Dashboard code={accessCode} /> : <Login />}
    </div>
  );
}

export default App;
