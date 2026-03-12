import { Link, useNavigate } from "react-router-dom";
import { MapPin, Calendar, User, Car } from "lucide-react";


function Dashboard() {
    const usuario = "Pedro"
    const navigate = useNavigate();
    const cerrarSesión = () => {
        navigate("/")
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">

            {/* HEADER */}
            <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Car size={32} className="text-blue-600" />
                    <span className="text-2xl font-bold text-gray-800">
                        EasyPark
                    </span>
                </div>

                {/* Logout */}
                <button
                    onClick={cerrarSesión}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Cerrar sesión
                </button>

            </div>


            {/* SALUDO */}
            <div className="max-w-7xl mx-auto px-6 mt-6">

                <h1 className="text-4xl font-bold text-gray-800">
                    Bienvenido <span className="text-black-600">{usuario}</span> 👋
                </h1>

                <p className="text-gray-500 mt-2">
                    Encuentra parqueaderos, gestiona tus reservas y administra tu cuenta.
                </p>

            </div>


            {/* ESTADISTICAS */}
            <div className="max-w-7xl mx-auto px-6 mt-10 grid md:grid-cols-3 gap-6">

                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <p className="text-gray-500">Reservas activas</p>
                    <h2 className="text-3xl font-bold text-blue-600">0</h2>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <p className="text-gray-500">Parqueaderos cerca</p>
                    <h2 className="text-3xl font-bold text-blue-600">--</h2>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <p className="text-gray-500">Reservas totales</p>
                    <h2 className="text-3xl font-bold text-blue-600">0</h2>
                </div>

            </div>


            {/* ACCIONES */}
            <div className="max-w-7xl mx-auto px-6 mt-12 grid md:grid-cols-3 gap-8">

                <Link
                    to="/parqueaderos"
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
                >
                    <MapPin size={42} className="text-blue-600 mb-4" />

                    <h2 className="text-xl font-bold">
                        Buscar parqueaderos
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Encuentra espacios disponibles cerca de ti.
                    </p>
                </Link>


                <Link
                    to="/reservas"
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
                >

                    <Calendar size={42} className="text-blue-600 mb-4" />

                    <h2 className="text-xl font-bold">
                        Mis reservas
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Consulta y administra tus reservas.
                    </p>

                </Link>

                <Link
                    to="/perfil"
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
                >
                    <User size={42} className="text-blue-600 mb-4" />

                    <h2 className="text-xl font-bold">
                        Mi perfil
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Edita tu información personal.
                    </p>
                </Link>    
                

            </div>


            {/* ACTIVIDAD */}
            <div className="max-w-7xl mx-auto px-6 mt-16 mb-16">

                <div className="bg-white p-8 rounded-2xl shadow">

                    <h2 className="text-xl font-bold mb-4">
                        Actividad reciente
                    </h2>

                    <p className="text-gray-500">
                        Aquí aparecerán tus últimas reservas y parqueaderos visitados.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;