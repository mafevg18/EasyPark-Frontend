function ParkingCard({ nombre, direccion, disponibles }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-72 hover:scale-105 transition transform">

      <h3 className="text-xl font-bold text-gray-800">
        {nombre}
      </h3>

      <p className="text-gray-500 mt-2">
        {direccion}
      </p>

      <div className="mt-4 text-green-600 font-semibold">
        Disponibles: {disponibles}
      </div>

      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Ver ubicación
      </button>

    </div>
  );
}

export default ParkingCard;