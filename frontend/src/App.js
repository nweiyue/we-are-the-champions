import "./App.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Register from "./pages/register/register";
import Home from "./pages/home/home";
import Results from "./pages/results/results";
import Rank from "./pages/rank/rank";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/results" element={<Results />} />
          <Route exact path="/rank" element={<Rank />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
