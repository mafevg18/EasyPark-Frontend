import { useState, useEffect } from "react";
import ParkingCard from "../components/ParkingCard";

function Parqueaderos() {
  const [parqueaderos, setParqueaderos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [direccionFiltro, setDireccionFiltro] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");

  useEffect(() => {
    async function fetchParqueaderos() {
      try {
        setLoading(true);
        const response = await fetch("https://tu-backend.com/api/parqueaderos"); // reemplaza con tu endpoint real
        if (!response.ok) throw new Error("Error al cargar parqueaderos");
        const data = await response.json();
        setParqueaderos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchParqueaderos();
  }, []);

  // Filtro dinámico por dirección
  const resultadosFiltrados = parqueaderos.filter((p) =>
    p.direccion.toLowerCase().includes(direccionFiltro.toLowerCase())
  );

  if (loading) return <p className="text-center mt-10">Cargando parqueaderos...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Buscar Parqueadero</h1>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Dirección o barrio"
          className="border p-3 rounded w-full md:w-1/3"
          value={direccionFiltro}
          onChange={(e) => setDireccionFiltro(e.target.value)}
        />
        <input
          type="time"
          className="border p-3 rounded w-full md:w-1/6"
          value={horaInicio}
          onChange={(e) => setHoraInicio(e.target.value)}
        />
        <input
          type="time"
          className="border p-3 rounded w-full md:w-1/6"
          value={horaFin}
          onChange={(e) => setHoraFin(e.target.value)}
        />
      </div>

      {/* Resultados */}
      {resultadosFiltrados.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-6">
          {resultadosFiltrados.map((p, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              {/* Encabezado */}
              <div className="flex justify-between text-gray-500 text-sm mb-2">
                <span>Hora inicio: {horaInicio || "--:--"}</span>
                <span>Hora fin: {horaFin || "--:--"}</span>
              </div>
              <div className="text-gray-500 text-sm mb-2">{p.direccion}</div>

              {/* Contenido */}
              <h2 className="text-lg font-bold">{p.nombre}</h2>
              <p>Precio por hora: ${p.precioHora}</p>
              <p>Tipo de espacio: {p.tipo}</p>
              <p>Disponibles: {p.disponibles}</p>

              <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Reservar
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No se encontraron parqueaderos para esa búsqueda.</p>
      )}
    </div>
  );
}

export default Parqueaderos;