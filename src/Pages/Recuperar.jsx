import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

function Recuperar() {
  return (
    <AuthLayout>

      <div className="bg-white p-10 rounded-2xl shadow-2xl w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          Recuperar contraseña
        </h2>

        <form className="space-y-4">

          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full border p-3 rounded-lg"
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
            Enviar recuperación
          </button>

        </form>

        <p className="text-center text-sm mt-4">
          <Link to="/" className="text-blue-600">
            Volver al login
          </Link>
        </p>

      </div>

    </AuthLayout>
  );
}

export default Recuperar;