import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { register } from "../services/authService";

function Registro() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    tipoDocumento: "",
    documento: "",
    telefono: "",
    correo: "",
    usuario: "",
    password: "",
    rol: ""
  });

  const [errores, setErrores] = useState({});

  const validarCampo = (name, value) => {

    let error = "";

    if (name === "correo") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) error = "Correo inválido";
    }

    if (name === "telefono") {
      const regex = /^3\d{9}$/;
      if (!regex.test(value))
        error = "Debe tener 10 dígitos y comenzar en 3";
    }

    if (name === "documento") {
      const regex = /^\d{8}$|^\d{10}$/;
      if (!regex.test(value))
        error = "Debe tener minimo 8 dígitos y máximo 10 dígitos";
    }

    if (name === "password") {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#]).{8,}$/;

      if (!regex.test(value))
        error =
          "Debe tener mayúscula, minúscula, número y carácter especial";
    }

    setErrores(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

    validarCampo(name, value);
  };

  const getBorder = (name) => {

    if (!form[name]) return "border";

    if (errores[name]) return "border-red-500";

    return "border-green-500";
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await register({
        nombres: form.nombres,
        apellidos: form.apellidos,
        email: form.correo,           
        telefono: form.telefono,
        documento: form.documento,
        tipoDocumento: form.tipoDocumento,
        username: form.usuario,       
        rol: form.rol.toLowerCase(),  
        password: form.password
      });

      alert("Usuario creado correctamente");
      navigate("/");

    } catch (error) {
      alert("Error al registrar");
    }
  };

  return (
    <AuthLayout>

      <div className="bg-white p-10 rounded-2xl shadow-2xl w-[450px]">

        <h2 className="text-2xl font-bold text-center mb-6">
          Crear cuenta
        </h2>

        <form className="space-y-4" onSubmit={handleRegister}>

          <input
            name="nombres"
            placeholder="Nombres"
            onChange={handleChange}
            className={`w-full p-3 rounded-lg ${getBorder("nombres")}`}
          />

          <input
            name="apellidos"
            placeholder="Apellidos"
            onChange={handleChange}
            className={`w-full p-3 rounded-lg ${getBorder("apellidos")}`}
          />

          <select
            name="tipoDocumento"
            onChange={handleChange}
            className="w-full p-3 rounded-lg border"
          >
            <option value="">Tipo de documento</option>
            <option value="CC">Cédula de ciudadanía</option>
            <option value="CE">Cédula de extranjería</option>
            <option value="PAS">Pasaporte</option>
          </select>

          <div>
            <input
              name="documento"
              placeholder="Número de documento"
              onChange={handleChange}
              className={`w-full p-3 rounded-lg ${getBorder("documento")}`}
            />
            {errores.documento && (
              <p className="text-red-500 text-sm">{errores.documento}</p>
            )}
          </div>

          <div>
            <input
              name="telefono"
              placeholder="Teléfono"
              onChange={handleChange}
              className={`w-full p-3 rounded-lg ${getBorder("telefono")}`}
            />
            {errores.telefono && (
              <p className="text-red-500 text-sm">{errores.telefono}</p>
            )}
          </div>

          <div>
            <input
              name="correo"
              placeholder="Correo"
              onChange={handleChange}
              className={`w-full p-3 rounded-lg ${getBorder("correo")}`}
            />
            {errores.correo && (
              <p className="text-red-500 text-sm">{errores.correo}</p>
            )}
          </div>

          <input
            name="usuario"
            placeholder="Usuario"
            onChange={handleChange}
            className={`w-full p-3 rounded-lg ${getBorder("usuario")}`}
          />

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
              className={`w-full p-3 rounded-lg ${getBorder("password")}`}
            />

            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>

            {errores.password && (
              <p className="text-red-500 text-sm">{errores.password}</p>
            )}

          </div>

          <select
            name="rol"
            onChange={handleChange}
            className="w-full p-3 rounded-lg border"
          >
            <option value="">Tipo de usuario</option>
            <option value="conductor">Conductor</option>
            <option value="arrendatario">Arrendatario</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Registrarse
          </button>

        </form>

        <p className="text-center text-sm mt-4">
          ¿Ya tienes cuenta?
          <Link to="/" className="text-blue-600 ml-1">
            Inicia sesión
          </Link>
        </p>

      </div>

    </AuthLayout>
  );
}

export default Registro;