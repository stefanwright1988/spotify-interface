import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { Default, Home, Playlists } from "./pages";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Default />}>
            <Route index element={<Home />} />
            <Route path="playlists" element={<Playlists />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
