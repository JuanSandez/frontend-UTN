import { Link } from "react-router-dom";


const VerificacionExitosa = () => (
  <div className="verificacion-exitosa">
    <h1>¡Listo!</h1>
    <h3>Tu cuenta ha sido verificada!</h3>
    <p>Ya podés iniciar sesión.</p>
    <Link to="/login" className="boton-login">Ir al login</Link>
  </div>
);
export default VerificacionExitosa