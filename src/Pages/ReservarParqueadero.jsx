import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createReservation } from "../services/reservationService";

function ReservarParqueadero() {
  const { parkingId } = useParams();
  const navigate = useNavigate();

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const [reservationData, setReservationData] = useState(null);

  const handleSubmit = () => {
    const today = new Date().toISOString().split("T")[0];

    const start = new Date(`${today}T${startTime}:00`).toISOString();
    const end = new Date(`${today}T${endTime}:00`).toISOString();

    const payload = {
      parkingSpotId: parkingId,
      startTime: start,
      endTime: end,
    };

    setReservationData(payload);
    setShowPayment(true); 
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      await new Promise((res) => setTimeout(res, 1500));

      alert("Pago realizado con éxito!");

      setShowPayment(false);
      setPaymentMethod("");

      navigate("/reservas");
    } catch (error) {
      console.error(error);
      alert("Error al procesar el pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Confirmar Reserva
            </button>

          </div>
        </div>
      </div>

      {showPayment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">

          <div className="bg-white p-6 rounded-2xl shadow-xl w-96">

            <h2 className="text-xl font-bold mb-4">
              Método de pago
            </h2>

            <div className="space-y-3 mb-6">

              <button
                onClick={() => setPaymentMethod("card")}
                className={`w-full p-3 rounded-lg border ${
                  paymentMethod === "card"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                Tarjeta
              </button>

              <button
                onClick={() => setPaymentMethod("cash")}
                className={`w-full p-3 rounded-lg border ${
                  paymentMethod === "cash"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                 PSE
              </button>

            </div>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => {
                  setShowPayment(false);
                  setPaymentMethod("");
                }}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancelar
              </button>

              <button
                disabled={!paymentMethod || loading}
                onClick={handlePayment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
              >
                {loading ? "Procesando..." : "Pagar"}
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default ReservarParqueadero;