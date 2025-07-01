import useForm from "../../hooks/useForms";
import useCustomQuery from "../../hooks/useCustomQuery";
import { createWorkspace } from "../../services/workspacesService";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewWorkspace = () => {
    const navigate = useNavigate()
    const {response, loading, error, sendRequest} = useCustomQuery()
    const initial_form_state = {
        name: "",
        description: ""
    }
    const handleSubmitNewWorkspace = () => {
        console.log("form_state:", form_state)
        
        sendRequest(async () => await createWorkspace(form_state));
    }

    const {form_state, handleSubmit, handleChange} = useForm({
        onSubmit:  handleSubmitNewWorkspace,
        initial_form_state
    })

    

    useEffect(() => {
        if(response && !loading && response.ok){
            navigate(`/home`)
        }
    }, [response])

  return (
    <div>
        <Link to={`/home`}><button>Volver</button></Link>
        {
        loading 
        ? <span>Loading...</span>
        : 
      <>
      <h1>Crear espacio de trabajo</h1>
      <form onSubmit={handleSubmit} action="">
        <div>

        <label htmlFor="name">Nombre</label>
        <input type="text" name="name" id="name" value={form_state.name} onChange={handleChange}/>
        </div>
        <div>
            <label htmlFor="description">Descripcion</label>
            <input type="text" 
            name="description" 
            id="description" 
            value={form_state.description}
            onChange={handleChange}/>
        </div>
      <button>Crear workspace</button>
      </form>
      </>
    }
    </div>
  );
};

export default NewWorkspace;