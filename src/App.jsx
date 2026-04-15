import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Recuperar from "./pages/Recuperar";
import Resetear from "./pages/Resetear";
import Dashboard from "./pages/Dashboard";
import Parqueaderos from "./Pages/Parqueaderos";
import Reservas from "./pages/Reservas";
import Perfil from "./pages/Perfil";
import Vehiculos from "./pages/Vehiculos";
import ReservarParqueadero from "./pages/ReservarParqueadero";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import CrearParqueadero from "./pages/CrearParqueadero";
import MisParqueaderos from "./pages/MisParqueaderos";

function Layout() {

  const location = useLocation();

  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/registro" ||
    location.pathname === "/recuperar" ||
    location.pathname === "/resetear";

  return (
    <>

      <Routes>

        {/* públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recuperar" element={<Recuperar />} />
        <Route path="/resetear" element={<Resetear />} />
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
          path="/vehiculos"
          element={
            <ProtectedRoute>
              <Vehiculos />
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


        <Route
          path="/reservar/:parkingId"
          element={
            <ProtectedRoute>
              <ReservarParqueadero />
            </ProtectedRoute>
          }
        />

        <Route
          path="/crear-parqueadero"
          element={
            <ProtectedRoute>
              <CrearParqueadero />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mis-parqueaderos"
          element={
            <ProtectedRoute>
              <MisParqueaderos />
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