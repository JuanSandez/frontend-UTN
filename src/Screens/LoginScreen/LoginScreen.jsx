import React, { useState } from "react";
import LOCALSTORAGE_KEYS from "../../constants/localStorage";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import useForm from "../../hooks/useForms";
import { LOGIN_FIELD_NAMES } from "../../constants/form/login";



const LoginScreen = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //Esta funcion es la accion que se ejecutara cuando se envie el formulario
  const onSubmit = async () => {
    try {
      setLoading(true);

      const server_response_data = await login({
        email: form_state[LOGIN_FIELD_NAMES.EMAIL],
        password: form_state[LOGIN_FIELD_NAMES.PASSWORD],
      });
      

      if (server_response_data.ok) {
        localStorage.setItem(
          LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN,
          server_response_data.data.authorization_token
        )
        navigate("/home");

      } else {
        setError(server_response_data.message);
      }
    } catch (error) {
      setError("Ocurrio un error al comunicarnos con el servidor");
    }
    finally{
      setLoading(false)
    }
  }

  const { form_state, handleSubmit, handleChange } = useForm({
    onSubmit, 
    initial_form_state: {
      [LOGIN_FIELD_NAMES.EMAIL]: "",
      [LOGIN_FIELD_NAMES.PASSWORD]: ""
  }
})

  return (
    <div>
      LoginScreen
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Ingresa tu email: </label>
          <input
            name={LOGIN_FIELD_NAMES.EMAIL}
            type="email"
            id="email"
            placeholder="joedoe@mail.com"
            value={form_state.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Ingresa tu contraseña</label>
          <input
            type="password"
            name={LOGIN_FIELD_NAMES.PASSWORD}
            id="password"
            value={form_state.password}
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
            Iniciar sesion
          </button>
        )}
      </form>
    </div>
  );
};

export default LoginScreen;
