import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Parqueaderos from "./Pages/Parqueaderos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/parqueaderos" element={<Parqueaderos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;