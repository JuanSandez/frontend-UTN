import React, { useEffect, useState } from "react";
import { getAllWorkspaces } from "../../services/workspacesService";
import { Link } from "react-router-dom";



const HomeScreen = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const getWorkspaces = async () => {
    try {
      setLoading(true);
      const data = await getAllWorkspaces();
      console.log("DATA:", data);
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
  console.log({ loading, response });

  return (
    <div>
      <h1>ESPACIO DE TRABAJO</h1>
      <div>
        {loading ? (
          <h2>Cargando...</h2>
        ) : (
          <div>
            {response.data.workspaces.map(
              (element) => {
              return (
                <div key={element.workspace._id}>
                  <h2>{element.workspace.name}</h2>
                  <Link to={"/workspaces/" + element.workspace._id}> Ir a workspace</Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
