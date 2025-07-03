import React, { useState } from "react";
import LOCALSTORAGE_KEYS from "../../constants/localStorage";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import useForm from "../../hooks/useForms";
import { LOGIN_FIELD_NAMES } from "../../constants/form/login";
import "./LoginScreen.css";

const LoginScreen = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      setLoading(true);

      const server_response_data = await login({
        email: form_state[LOGIN_FIELD_NAMES.EMAIL],
        password: form_state[LOGIN_FIELD_NAMES.PASSWORD],
      });

      if (server_response_data.ok) {
        localStorage.setItem(
          "user",
          JSON.stringify(server_response_data.data.user)
        );
        localStorage.setItem(
          LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN,
          server_response_data.data.authorization_token
        );

        navigate("/home");
      } else {
        setError(server_response_data.message);
      }
    } catch (error) {
      setError("Ocurrio un error al comunicarnos con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const { form_state, handleSubmit, handleChange } = useForm({
    onSubmit,
    initial_form_state: {
      [LOGIN_FIELD_NAMES.EMAIL]: "",
      [LOGIN_FIELD_NAMES.PASSWORD]: "",
    },
  });

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Iniciar sesión</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <input
              name={LOGIN_FIELD_NAMES.EMAIL}
              type="email"
              id="email"
              value={form_state.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name={LOGIN_FIELD_NAMES.PASSWORD}
              id="password"
              value={form_state.password}
              onChange={handleChange}
              required
              placeholder="Contraseña"
            />
          </div>
          {error && <span style={{ color: "red" }}> {error}</span>}
          {loading ? (
            <button type="button" disabled={loading}>
              Cargando....
            </button>
          ) : (
            <button type="submit" disabled={loading}>
              Iniciar sesion
            </button>
          )}
          <p
            style={{ marginTop: "1rem", textAlign: "center", color: "#66b2ff" }}
          >
            ¿No tenés cuenta?{" "}
            <Link
              style={{ color: " #66b2ff" }}
              to="/register"
              className="register-link"
            >
              Registrate
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
