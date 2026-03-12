import { useState, useEffect } from "react";
import { MapPin, Calendar, Clock } from "lucide-react";
import Navbar from "../components/Navbar";

function Reservas() {

  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerReservas();
  }, []);

  const obtenerReservas = async () => {
    try {

      const response = await fetch("/api/reservas");
      const data = await response.json();

      setReservas(data);

    } catch (error) {
      console.error("Error obteniendo reservas", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelarReserva = async (id) => {

    const confirmar = window.confirm("¿Seguro que deseas cancelar esta reserva?");
    if (!confirmar) return;

    try {

      await fetch(`/api/reservas/${id}`, {
        method: "DELETE"
      });

      obtenerReservas();

    } catch (error) {
      console.error("Error cancelando reserva", error);
    }

  };

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <div className="p-10">

        <div className="max-w-6xl mx-auto">

          <h1 className="text-3xl font-bold mb-8">
            Mis reservas
          </h1>

          {loading && (
            <p className="text-gray-500">
              Cargando reservas...
            </p>
          )}

          {!loading && reservas.length === 0 && (
            <p className="text-gray-500 text-lg">
              Aún no tienes reservas.
            </p>
          )}

          <div className="grid gap-6">

            {reservas.map((reserva) => (

              <div
                key={reserva.id}
                className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center"
              >

                <div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={18} />
                    {reserva.direccion}
                  </div>

                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <Calendar size={18} />
                    {reserva.fecha}
                  </div>

                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <Clock size={18} />
                    {reserva.horaInicio} - {reserva.horaFin}
                  </div>

                </div>

                <button
                  onClick={() => cancelarReserva(reserva.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Cancelar
                </button>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Reservas;