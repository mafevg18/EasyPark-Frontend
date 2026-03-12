import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function Login() {

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    localStorage.setItem("token", "usuario_logueado");

    navigate("/dashboard");
  };

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validarPassword = (value) => {

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#]).{8,}$/;

    if (!regex.test(value)) {
      setError(
        "Debe tener mayúscula, minúscula, número y carácter especial"
      );
    } else {
      setError("");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/f1/4b/8c/f14b8ce2bafbcdfa22f01c5142e48e7c.jpg')"
      }}
    >

      {/* overlay oscuro */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* card login */}
      <div className="relative bg-white p-10 rounded-2xl shadow-2xl w-96">

        <h2 className="text-3xl font-bold text-center mb-6">
          EasyPark
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full border p-3 rounded-lg"
          />

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validarPassword(e.target.value);
              }}
              className={`w-full p-3 rounded-lg border ${error ? "border-red-500" : "border-green-500"
                }`}
            />

            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>

          </div>

          {error && (
            <p className="text-red-500 text-sm mt-1">
              {error}
            </p>
          )}

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
            Ingresar
          </button>

        </form>

        <div className="text-center text-sm mt-4">

          <Link to="/registro" className="text-blue-600 hover:underline">
            Crear cuenta
          </Link>

          <span className="mx-2">•</span>

          <Link to="/recuperar" className="text-blue-600 hover:underline">
            Olvidé mi contraseña
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;