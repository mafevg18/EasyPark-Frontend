import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createReservation } from "../services/reservationService";

function ReservarParqueadero() {
    const { parkingId } = useParams();
    const navigate = useNavigate();

    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const today = new Date().toISOString().split("T")[0];

            const start = new Date(`${today}T${startTime}:00`).toISOString();
            const end = new Date(`${today}T${endTime}:00`).toISOString();

            const payload = {
                parkingSpotId: parkingId,
                startTime: start,
                endTime: end,
            };

            await createReservation(payload);

            alert("Reserva creada con éxito");
            navigate("/parqueaderos");
        } catch (error) {
            console.error(error);
            alert("Error al reservar");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10 pt-24">
            <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

                <h1 className="text-2xl font-bold mb-6">
                    Reservar Parqueadero
                </h1>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="mb-6 text-blue-600 hover:underline"
                >
                    ← Atrás
                </button>

                <div className="space-y-4">

                    <div>
                        <label className="block text-sm mb-1">Hora inicio</label>
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full p-3 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Hora fin</label>
                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full p-3 border rounded"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                    >
                        {loading ? "Reservando..." : "Confirmar Reserva"}
                    </button>

                </div>
            </div>
        </div>
    );
}

export default ReservarParqueadero;