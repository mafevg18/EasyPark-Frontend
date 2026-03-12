import { Link, useNavigate } from "react-router-dom";
import { Car } from "lucide-react";

function Navbar() {

  const navigate = useNavigate();

  const cerrarSesion = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">

      {/* Logo */}
      <Link to="/dashboard" className="flex items-center gap-2">
        <Car size={30} className="text-blue-600" />
        <span className="text-2xl font-bold text-gray-800">
          EasyPark
        </span>
      </Link>

      {/* Botón logout */}
      <button
        onClick={cerrarSesion}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Cerrar sesión
      </button>

    </div>
  );
}

export default Navbar;