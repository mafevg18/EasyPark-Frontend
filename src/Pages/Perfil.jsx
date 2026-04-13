import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getMyProfile } from "../services/profileService";
import { User, Mail, Phone, CreditCard, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";


function Perfil() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loadProfile = async () => {
    try {
      const data = await getMyProfile();
      setUser(data);
    } catch (error) {
      console.error("Error cargando perfil:", error);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (!user) return <p className="p-6">Cargando...</p>;

  const initial = user.nombres?.charAt(0)?.toUpperCase();

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <div className="max-w-5xl mx-auto space-y-6">

          <button
            onClick={() => navigate("/dashboard")}
            className="mb-6 text-blue-600 hover:underline"
          >
            ← Atrás
          </button>

          <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-6">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 text-white text-2xl font-bold">
              {initial}
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {user.nombres} {user.apellidos}
              </h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-white rounded-2xl shadow p-5 flex items-start gap-4">
              <User className="text-gray-600 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Nombre</p>
                <p className="font-semibold text-gray-800">
                  {user.nombres} {user.apellidos}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-5 flex items-start gap-4">
              <Mail className="text-gray-600 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Correo</p>
                <p className="font-semibold text-gray-800">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-5 flex items-start gap-4">
              <Phone className="text-gray-600 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="font-semibold text-gray-800">
                  {user.telefono || "No disponible"}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-5 flex items-start gap-4">
              <CreditCard className="text-gray-600 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Documento</p>
                <p className="font-semibold text-gray-800">
                  {user.documento || "No disponible"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-5 flex items-start gap-4">
            <Shield className="text-gray-600 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Rol en la plataforma</p>
              <p className="font-semibold text-gray-800">
                {user.rol}
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Perfil;