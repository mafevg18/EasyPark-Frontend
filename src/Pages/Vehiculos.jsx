import { useState } from "react";
import { createVehicle } from "../services/vehicleService";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Vehiculos() {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    plate: "",
    brand: "",
    model: "",
    color: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.plate || !form.brand || !form.model || !form.color) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);

      await createVehicle(form);

      alert("Vehículo creado correctamente 🚗");

      setForm({
        plate: "",
        brand: "",
        model: "",
        color: ""
      });

    } catch (error) {
      alert("Error al crear vehículo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-10">

        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

          <h2 className="text-2xl font-bold mb-6">
            Mis vehículos
          </h2>

          <button
            onClick={() => navigate("/dashboard")}
            className="mb-6 text-blue-600 hover:underline"
          >
            ← Atrás
          </button>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="plate"
              placeholder="Placa"
              value={form.plate}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            <input
              name="brand"
              placeholder="Marca"
              value={form.brand}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            <input
              name="model"
              placeholder="Modelo"
              value={form.model}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            <input
              name="color"
              placeholder="Color"
              value={form.color}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              {loading ? "Guardando..." : "Guardar vehículo"}
            </button>

          </form>

        </div>

      </div>
    </>

  );
}

export default Vehiculos;