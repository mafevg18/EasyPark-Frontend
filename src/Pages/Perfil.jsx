import Navbar from "../components/Navbar";
import { User, Mail, Phone, CreditCard, Shield } from "lucide-react";

function Perfil() {

  const usuario = {
    nombres: "Pedro",
    apellidos: "Gomez",
    correo: "pedro@email.com",
    telefono: "3001234567",
    documento: "1234567890",
    tipoDocumento: "CC",
    rol: "Conductor"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">

      <Navbar />

      <div className="max-w-5xl mx-auto p-10">

        {/* HEADER PERFIL */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex items-center gap-6">

          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
            {usuario.nombres.charAt(0)}
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              {usuario.nombres} {usuario.apellidos}
            </h1>

            <p className="text-gray-500">
              {usuario.correo}
            </p>
          </div>

        </div>

        {/* INFORMACIÓN */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-3 text-gray-700">
              <User />
              <span className="font-semibold">Nombre</span>
            </div>

            <p className="mt-2 text-gray-600">
              {usuario.nombres} {usuario.apellidos}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-3 text-gray-700">
              <Mail />
              <span className="font-semibold">Correo</span>
            </div>

            <p className="mt-2 text-gray-600">
              {usuario.correo}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-3 text-gray-700">
              <Phone />
              <span className="font-semibold">Teléfono</span>
            </div>

            <p className="mt-2 text-gray-600">
              {usuario.telefono}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-3 text-gray-700">
              <CreditCard />
              <span className="font-semibold">Documento</span>
            </div>

            <p className="mt-2 text-gray-600">
              {usuario.tipoDocumento} {usuario.documento}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow md:col-span-2">
            <div className="flex items-center gap-3 text-gray-700">
              <Shield />
              <span className="font-semibold">Rol en la plataforma</span>
            </div>

            <p className="mt-2 text-gray-600">
              {usuario.rol}
            </p>
          </div>

        </div>

        
        </div>


    </div>
  );
}

export default Perfil;