import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authService";

function Resetear() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await resetPassword({
        email,
        newPassword: password
      });

      alert("Contraseña actualizada correctamente");

      navigate("/"); 

    } catch (error) {
      alert("Error al cambiar contraseña");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >

        <h2 className="text-2xl font-bold text-center mb-6">
          Nueva contraseña
        </h2>

        <p className="text-sm text-gray-500 mb-4 text-center">
          Ingresa tu nueva contraseña
        </p>

        <div className="relative">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁"}
          </span>

        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Cambiar contraseña
        </button>

      </form>

    </div>
  );
}

export default Resetear;