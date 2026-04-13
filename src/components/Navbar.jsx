import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Car } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [open, setOpen] = useState(false);

  const nombre = user.nombres || "U";
  const inicial = nombre.charAt(0).toUpperCase();
  const rol = user.rol || "Usuario";

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">

      <div className="flex items-center gap-2">
        <Car size={32} className="text-blue-600" />
        <span className="text-2xl font-bold text-gray-800">
          EasyPark
        </span>
      </div>

      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
      </div>

      <div className="relative">

        <div
          onClick={() => setOpen(!open)}
          className="w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold cursor-pointer"
        >
          {inicial}
        </div>

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg p-4">

            <p className="font-semibold">{user.nombres} {user.apellidos}</p>
            <p className="text-sm text-gray-500 mb-3">{rol}</p>

            <button
              onClick={cerrarSesion}
              className="w-full bg-red-500 text-white py-1 rounded-lg hover:bg-red-600"
            >
              Cerrar sesión
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default Navbar;