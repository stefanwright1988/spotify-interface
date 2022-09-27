import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Container, Nav } from "react-bootstrap";

const accessCode = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    <div className="container-fluid d-flex flex-column overflow-hidden vh-100">
      {accessCode ? <Dashboard code={accessCode} /> : <Login />}
    </div>
  );
}

export default App;
