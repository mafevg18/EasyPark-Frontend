import { useEffect, useState } from "react";
import { getParkings } from "../services/parkingService";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { createReservation } from "../services/reservationService";

function Parqueaderos() {

  const navigate = useNavigate();

  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const getRating = () => (Math.random() * 2 + 3).toFixed(1);

  const getDescription = () => {
    const textos = [
      "Acceso fácil y rápido",
      "Zona segura y vigilada",
      "Ideal para estancias cortas",
      "Ubicación estratégica"
    ];
    return textos[Math.floor(Math.random() * textos.length)];
  };

  const handleSearch = async () => {
    try {
      setLoading(true);

      const today = new Date().toISOString().split("T")[0];

      let query = "";

      const params = new URLSearchParams();

      if (search) params.append("query", search);
      if (startTime) params.append("start", `${today}T${startTime}`);
      if (endTime) params.append("end", `${today}T${endTime}`);

      const finalQuery = params.toString() ? `?${params.toString()}` : "";

      const data = await getParkings(finalQuery);


      setParkings(data);
    } catch (e) {
      setParkings([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleSearch();
  }, []);

  const handleReserve = async (parking) => {
    try {
      const today = new Date().toISOString().split("T")[0];

      const startTime = prompt("Hora inicio (HH:mm)");
      const endTime = prompt("Hora fin (HH:mm)");

      if (!startTime || !endTime) {
        alert("Debes ingresar las horas");
        return;
      }

      const startTimeISO = new Date(`${today}T${startTime}:00`).toISOString();
      const endTimeISO = new Date(`${today}T${endTime}:00`).toISOString();

      const payload = {
        parkingSpotId: parking.id,
        startTime: startTimeISO,
        endTime: endTimeISO,
      };


      await createReservation(payload);

      alert("Reserva creada con éxito");
    } catch (error) {
      console.error(error);
      alert("Error al crear reserva");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-10 pt-24">

        <div className="max-w-6xl mx-auto">

          <h1 className="text-3xl font-bold mb-6">
            Buscar Parqueadero
          </h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="mb-6 text-blue-600 hover:underline"
          >
            ← Atrás
          </button>

          <div className="flex gap-4 mb-8">

            <input
              placeholder="Dirección o Barrio"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-3 border rounded-lg w-1/3"
            />

            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="p-3 border rounded-lg"
            />

            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="p-3 border rounded-lg"
            />

            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700"
            >
              Buscar
            </button>

          </div>

          {loading ? (
            <p>Cargando...</p>
          ) : parkings.length === 0 ? (
            <p>No hay parqueaderos disponibles.</p>
          ) : (
            <div className="space-y-4">

              {parkings.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-5 rounded-xl shadow-md"
                >

                  <p className="text-sm text-gray-500">
                    {p.neighborhood}
                  </p>

                  <h3 className="text-lg font-bold">
                    {p.address}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {p.isCovered ? "Cubierto" : "Descubierto"}
                  </p>

                  <p className="font-semibold mt-2">
                    ${p.pricePerHour} / hora
                  </p>

                  <p className="text-sm mt-1 text-green-600">
                    Disponible
                  </p>

                  <button
                    className="mt-3 w-full py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
                    onClick={() => navigate(`/reservar/${p.id}`)}
                  >
                    Reservar
                  </button>

                </div>
              ))}

            </div>
          )}
        </div>

      </div>
    </>
  );
}

export default Parqueaderos;