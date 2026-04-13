import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getMyReservations, cancelReservation } from "../services/reservationService";

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const loadData = async () => {
    try {
      const data = await getMyReservations();
      setReservas(data || []);
    } catch (error) {
      console.error("Error cargando reservas:", error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    loadData();
  }, []);

  const handleCancel = async (id) => {
    try {
      await cancelReservation(id);
      setReservas((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Error cancelando reserva:", error);
    }
  };

  const openCancelModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmCancel = async () => {
    try {
      await cancelReservation(selectedId);

      setReservas((prev) =>
        prev.filter((r) => r.id !== selectedId)
      );

      setShowModal(false);
      setSelectedId(null);
    } catch (error) {
      console.error("Error cancelando:", error);
    }
  };
  return (
    <>
      <Navbar />

      <div className="p-6 max-w-4xl mx-auto mt-6">
        <h1 className="text-2xl font-bold mb-6">Mis Reservas</h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 text-blue-600 hover:underline"
        >
          ← Atrás
        </button>

        {loading ? (
          <p>Cargando reservas...</p>
        ) : reservas.length === 0 ? (
          <p>No tienes reservas aún.</p>
        ) : (
          <div className="space-y-4">
            {reservas.map((r) => (
              <div
                key={r.id}
                className="border rounded-xl p-4 shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    Parqueadero: {r.address}
                  </p>

                  <p>Inicio: {new Date(r.startTime).toLocaleString()}</p>
                  <p>Fin: {new Date(r.endTime).toLocaleString()}</p>

                  <p className="text-green-600 font-bold">
                    ${r.totalPrice}
                  </p>

                  <p>Estado: {r.status}</p>
                </div>

                <button
                  onClick={() => openCancelModal(r.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Cancelar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-80 border">

            <h2 className="text-lg font-bold mb-4">
              ¿Seguro que deseas cancelar esta reserva?
            </h2>



            <div className="flex justify-end gap-3">

              <button
                onClick={confirmCancel}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Aceptar
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedId(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancelar
              </button>



            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Reservas;