import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { getMyParkings, updateParking } from "../services/parkingService";


function MisParqueaderos() {
    const [parkings, setParkings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const toggleStatus = async (parking) => {
        try {
            const updated = {
                address: parking.address,
                neighborhood: parking.neighborhood,
                pricePerHour: parking.pricePerHour,
                isCovered: parking.isCovered,
                isActive: !parking.isActive,
            };

            await updateParking(parking.id, updated);

            setParkings((prev) =>
                prev.map((p) =>
                    p.id === parking.id
                        ? { ...p, isActive: !p.isActive }
                        : p
                )
            );

        } catch (error) {
            console.error(error);
        }
    };
    const loadData = async () => {
        try {
            const data = await getMyParkings();
            setParkings(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <Navbar />

            <div className="p-6 max-w-4xl mx-auto mt-6">
                <h1 className="text-2xl font-bold mb-6">
                    Mis Parqueaderos
                </h1>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="mb-6 text-blue-600 hover:underline"
                >
                    ← Atrás
                </button>

                {loading ? (
                    <p>Cargando...</p>
                ) : parkings.length === 0 ? (
                    <p>No tienes parqueaderos aún.</p>
                ) : (
                    <div className="space-y-4">
                        {parkings.map((p) => (
                            <div
                                key={p.id}
                                className="border rounded-xl p-4 shadow"
                            >
                                <p className="font-semibold">
                                    {p.address}
                                </p>

                                <p className="text-gray-500">
                                    ${p.pricePerHour} / hora
                                </p>

                                <button
                                    onClick={() => toggleStatus(p)}
                                    className={`px-4 py-2 rounded-lg text-white ${p.isActive
                                        ? "bg-red-500"
                                        : "bg-green-600"
                                        }`}
                                >
                                    {p.isActive ? "Desactivar" : "Activar"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default MisParqueaderos;