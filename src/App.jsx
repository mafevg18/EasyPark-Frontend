import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Recuperar from "./pages/Recuperar";
import Dashboard from "./pages/Dashboard";
import Parqueaderos from "./Pages/Parqueaderos";
import Reservas  from "./pages/Reservas";
import Perfil from "./pages/Perfil";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function Layout() {

  const location = useLocation();

  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/registro" ||
    location.pathname === "/recuperar";

  return (
    <>

      <Routes>

        {/* públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recuperar" element={<Recuperar />} />

        {/* protegidas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/parqueaderos"
          element={
            <ProtectedRoute>
              <Parqueaderos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reservas"
          element={
            <ProtectedRoute>
              <Reservas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;