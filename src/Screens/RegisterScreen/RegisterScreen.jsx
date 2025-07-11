import React, { useState } from "react";
import useForm from "../../hooks/useForms";
import { REGISTER_FIELD_NAMES } from "../../constants/form/register";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import "./RegisterScreen.css";

const RegisterScreen = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      setLoading(true);

      const server_response_data = await register({
        name: form_state[REGISTER_FIELD_NAMES.NAME],
        email: form_state[REGISTER_FIELD_NAMES.EMAIL],
        password: form_state[REGISTER_FIELD_NAMES.PASSWORD],
      });

      


      if (server_response_data.ok) {
      setError(null);
      alert(" Registro exitoso!. Revisá tu email para verificar tu cuenta.");
      navigate("/login");
    } else {
      setError(server_response_data.message);
    }


    } catch (error) {
      console.log(error);
      setError("Ocurrio un error al comunicarnos con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const { form_state, handleChange, handleSubmit } = useForm({
    onSubmit,
    initial_form_state: {
      [REGISTER_FIELD_NAMES.NAME]: "",
      [REGISTER_FIELD_NAMES.EMAIL]: "",
      [REGISTER_FIELD_NAMES.PASSWORD]: "",
    },
  });

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Registro</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Ingresa tu nombre: </label>
            <input
              id="name"
              name={REGISTER_FIELD_NAMES.NAME}
              type="text"
              placeholder="Juan Perez"
              value={form_state[REGISTER_FIELD_NAMES.NAME]}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email">Ingresa tu email: </label>
            <input
              name={REGISTER_FIELD_NAMES.EMAIL}
              type="email"
              id="email"
              placeholder="juanPerez@mail.com"
              value={form_state[REGISTER_FIELD_NAMES.EMAIL]}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password">Ingresa tu contraseña:</label>
            <input
              type="password"
              name={REGISTER_FIELD_NAMES.PASSWORD}
              id="password"
              value={form_state[REGISTER_FIELD_NAMES.PASSWORD]}
              onChange={handleChange}
            />
          </div>
          {error && <span style={{ color: "red" }}> {error}</span>}
          {loading ? (
            <button type="button" disabled={loading}>
              Cargando....
            </button>
          ) : (
            <button type="submit" disabled={loading}>
              Registrar
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
