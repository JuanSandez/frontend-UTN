import useForm from "../../hooks/useForms";
import useCustomQuery from "../../hooks/useCustomQuery";
import { createWorkspace } from "../../services/workspacesService";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NewWorkspaceScreen.css";

const NewWorkspace = () => {
  const navigate = useNavigate();
  const { response, loading, error, sendRequest } = useCustomQuery();
  const initial_form_state = {
    name: "",
    description: "",
  };
  const handleSubmitNewWorkspace = () => {
    console.log("form_state:", form_state);

    sendRequest(async () => await createWorkspace(form_state));
  };

  const { form_state, handleSubmit, handleChange } = useForm({
    onSubmit: handleSubmitNewWorkspace,
    initial_form_state,
  });

  useEffect(() => {
    if (response && !loading && response.ok) {
      navigate(`/home`);
    }
  }, [response]);

  return (
    <div className="create-workspace-container">
      <Link to="/home">
        <button className="back-button">Volver</button>
      </Link>

      {loading ? (
        <span>Cargando...</span>
      ) : (
        <div className="form-card">
          <h2>Crear espacio de trabajo</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                name="name"
                id="name"
                value={form_state.name}
                onChange={handleChange}
                placeholder="Nombre del workspace"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <input
                type="text"
                name="description"
                id="description"
                value={form_state.description}
                onChange={handleChange}
                placeholder="Breve descripción"
              />
            </div>

            <button className="create-btn" type="submit">
              Crear workspace
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default NewWorkspace;
