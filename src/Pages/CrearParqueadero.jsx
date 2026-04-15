import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createParking } from "../services/parkingService";

function CrearParqueadero() {
    const navigate = useNavigate();

    const [address, setAddress] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [price, setPrice] = useState("");
    const [isCovered, setIsCovered] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            if (!address || !neighborhood || !price) {
                alert("Todos los campos son obligatorios");
                return;
            }

            setLoading(true);

            const data = {
                address,
                neighborhood,
                pricePerHour: Number(price),
                isCovered,
            };

            await createParking(data);

            alert("Parqueadero creado con éxito 🚗");

            navigate("/mis-parqueaderos");

        } catch (error) {
            alert("Error creando parqueadero");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="p-6 max-w-xl mx-auto mt-10 bg-white rounded-xl shadow">

                <h1 className="text-2xl font-bold mb-6">
                    Crear Parqueadero
                </h1>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="mb-6 text-blue-600 hover:underline"
                >
                    ← Atrás
                </button>

                <div className="space-y-4">

                    <input
                        type="text"
                        placeholder="Dirección"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-3 border rounded"
                    />

                    <input
                        type="text"
                        placeholder="Barrio"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        className="w-full p-3 border rounded"
                    />

                    <input
                        type="number"
                        placeholder="Precio por hora"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-3 border rounded"
                    />

                    <select
                        value={isCovered}
                        onChange={(e) => setIsCovered(e.target.value === "true")}
                        className="w-full p-3 border rounded"
                    >
                        <option value="false">No techado</option>
                        <option value="true">Techado</option>
                    </select>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                    >
                        {loading ? "Creando..." : "Crear parqueadero"}
                    </button>

                </div>
            </div>
        </>
    );
}

export default CrearParqueadero;