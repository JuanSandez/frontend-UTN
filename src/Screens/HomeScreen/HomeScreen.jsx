import React, { useEffect, useState } from "react";
import { getAllWorkspaces } from "../../services/workspacesService";
import { Link } from "react-router-dom";
import "./HomeScreen.css";

const HomeScreen = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const getWorkspaces = async () => {
    try {
      setLoading(true);
      const data = await getAllWorkspaces();

      setResponse(data);
    } catch (error) {
      console.error("Error al obtener workspaces", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getWorkspaces();
  }, []);

  return (
    <div className="workspace-container">
      <div className="workspace-header">
        <h1>ESPACIO DE TRABAJO</h1>
        <Link className="create-button" to="/new">
          Crear workspace
        </Link>
      </div>

      <div className="workspace-list">
        {loading ? (
          <h2>Cargando...</h2>
        ) : (
          response.data.workspaces.map((element) => (
            <div key={element.workspace._id} className="workspace-card">
              <h2>{element.workspace.name}</h2>
              <Link
                className="workspace-link"
                to={`/workspaces/${element.workspace._id}`}
              >
                Ir a workspace
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
