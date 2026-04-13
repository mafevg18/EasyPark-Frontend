import { Link, useNavigate } from "react-router-dom";
import { MapPin, Calendar, User, Car } from "lucide-react";
import { useEffect, useState } from "react";
import { getMyReservations } from "../services/reservationService";
import { getMyVehicles } from "../services/vehicleService";

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const usuario = `${user.nombres || ""}`;
    const rol = user.rol;
    const [reservas, setReservas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadReservas = async () => {
            try {
                const data = await getMyReservations();
                setReservas(data || []);
            } catch (error) {
                console.error("Error cargando reservas:", error);
            }
        };

        loadReservas();
    }, []);

    const [stats, setStats] = useState({
        vehiculos: 0,
        reservasActivas: 0,
        totalReservas: 0
    });

    const cerrarSesión = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    const loadStats = async () => {
        try {
            let reservas = [];
            let vehiculos = [];

            try {
                reservas = await getMyReservations();
            } catch (e) {
                console.error("Error reservas", e);
            }

            try {
                vehiculos = await getMyVehicles();
            } catch (e) {
                console.error("Error vehiculos", e);
            }

            const reservasList = Array.isArray(reservas) ? reservas : [];
            const vehiculosList = Array.isArray(vehiculos) ? vehiculos : [];

            setStats({
                vehiculos: vehiculosList.length,
                totalReservas: reservasList.length,
                reservasActivas: reservasList.filter(
                    r => r.status?.toLowerCase() === "active"
                ).length
            });

        } catch (error) {
            console.error("Error general:", error);
        }
    };

    useEffect(() => {
        loadStats();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">

            <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">

                <div className="flex items-center gap-2">
                    <Car size={32} className="text-blue-600" />
                    <span className="text-2xl font-bold text-gray-800">
                        EasyPark
                    </span>
                </div>

                <button
                    onClick={cerrarSesión}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Cerrar sesión
                </button>

            </div>

            <div className="max-w-7xl mx-auto px-6 mt-6">
                <h1 className="text-4xl font-bold text-gray-800">
                    Bienvenido <span>{usuario}</span> 😄
                </h1>

                <p className="text-gray-500 mt-2">
                    Encuentra parqueaderos, gestiona tus reservas y administra tu cuenta.
                </p>
            </div>

            {rol === "conductor" && (
                <>
                    <div className="max-w-7xl mx-auto px-6 mt-10 grid md:grid-cols-3 gap-6">

                        <div className="bg-white p-6 rounded-2xl shadow-md">
                            <p className="text-gray-500">Vehiculos registrados</p>
                            <h2 className="text-3xl font-bold text-blue-600">
                                {stats.vehiculos}
                            </h2>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-md">
                            <p className="text-gray-500">Reservas activas</p>
                            <h2 className="text-3xl font-bold text-blue-600">
                                {stats.reservasActivas}
                            </h2>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-md">
                            <p className="text-gray-500">Reservas totales</p>
                            <h2 className="text-3xl font-bold text-blue-600">
                                {stats.totalReservas}
                            </h2>
                        </div>

                    </div>

                    <div className="max-w-7xl mx-auto px-6 mt-12 grid md:grid-cols-3 gap-8">

                        <Link to="/vehiculos" className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
                            <Car size={42} className="text-blue-600 mb-4" />
                            <h2 className="text-xl font-bold">Mis vehículos</h2>
                            <p className="text-gray-500 mt-2">
                                Registra y administra tus vehículos.
                            </p>
                        </Link>

                        <Link to="/parqueaderos" className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
                            <MapPin size={42} className="text-blue-600 mb-4" />
                            <h2 className="text-xl font-bold">Buscar parqueaderos</h2>
                            <p className="text-gray-500 mt-2">
                                Encuentra espacios disponibles cerca de ti.
                            </p>
                        </Link>

                        <Link to="/reservas" className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
                            <Calendar size={42} className="text-blue-600 mb-4" />
                            <h2 className="text-xl font-bold">Mis reservas</h2>
                            <p className="text-gray-500 mt-2">
                                Consulta y administra tus reservas.
                            </p>
                        </Link>

                        <Link to="/perfil" className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
                            <User size={42} className="text-blue-600 mb-4" />
                            <h2 className="text-xl font-bold">Mi perfil</h2>
                            <p className="text-gray-500 mt-2">
                                Edita tu información personal.
                            </p>
                        </Link>

                    </div>

                    <div className="max-w-7xl mx-auto px-6 mt-16 mb-16">
                        <div className="bg-white p-8 rounded-2xl shadow">

                            <h2 className="text-xl font-bold mb-4">
                                Actividad reciente
                            </h2>

                            {reservas.length === 0 ? (
                                <p className="text-gray-500">
                                    No tienes actividad reciente.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {reservas.slice(0, 5).map((r) => (
                                        <div
                                            key={r.id}
                                            className="border-b pb-2 flex justify-between"
                                        >
                                            <div>
                                                <p className="font-semibold text-gray-700">
                                                    {r.address}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(r.startTime).toLocaleString()}
                                                </p>
                                            </div>

                                            <span
                                                className={`text-sm font-bold ${r.status === "Active"
                                                        ? "text-green-600"
                                                        : "text-red-500"
                                                    }`}
                                            >
                                                {r.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Dashboard;