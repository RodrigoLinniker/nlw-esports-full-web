import { Routes, Route } from "react-router-dom";
import { Game } from "./pages/Game";
import { Home } from "./pages/Home";

import "./styles/main.css";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Game />} path="/game/:id" />
      </Routes>
    </>
  );
}

export default App;
