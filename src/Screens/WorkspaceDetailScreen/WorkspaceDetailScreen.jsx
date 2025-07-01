import { useEffect, useState } from "react";
import { createChannel, getChannels } from "../../services/channelService";
import { Navigate, useParams } from "react-router-dom";
import SideBarChannels from "../../Screens/SideBarChannels/SideBarChannels";
import useCustomQuery from "../../hooks/useCustomQuery";
import Chat from "../../Components/Chat/Chat";
import useForm from "../../hooks/useForms";

const WorkspaceDetailScreen = () => {
  const { workspace_id, channel_id } = useParams();
  const [is_create_channel, setIsCreateChannel] = useState(false);
  const handleSubmitNewChannel = () => {
    sendRequest(async () => createChannel( {name: form_state.name, workspace_id: workspace_id }));
    setIsCreateChannel(false);
  };
  const initial_form_state = {
    name: ""
  }
  const {form_state, handleSubmit, handleChange} = useForm({
    onSubmit:  handleSubmitNewChannel,
    initial_form_state
  })
  
  useEffect(() => {
    sendRequest(async () => getChannels({ workspace_id }));
  }, []);

  const handleChangeCreateChannel = () => {
    setIsCreateChannel(true);
  };
  const handleQuitCreateMode = () => {
    setIsCreateChannel(false);
  };

  const {
    response: channels_response,
    error,
    loading,
    sendRequest,
  } = useCustomQuery();

  

  console.log(channels_response);

  
  
  


  if (!loading && channels_response) {
    if (!channel_id && channels_response.data.channels.length > 0) {
      return (
        <Navigate
          to={`/workspaces/${workspace_id}/channels/${channels_response.data.channels[0]._id}`}
        />
      );
    }
  }
  if (loading) {
    return (
      <div>
        <h2>Cargando espacios de trabajo...</h2>
      </div>
    );
  }

  
  return (
    <div>
      <h1>Detalles de Workspace</h1>
      <div>
        {!loading && channels_response && (
          <SideBarChannels channels={channels_response.data.channels} />
        )}

        {!is_create_channel ? (
          <button onClick={handleChangeCreateChannel}>Crear canal</button>
        ) : (
        
            <form action="" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="">Nombre canal:</label>
                <input type="text" placeholder="Nuevo canal" onChange={handleChange} name="name"
                value={form_state.name}/>
              </div>
                <button type="submit">Crear</button>
                <button type="button" onClick={handleQuitCreateMode}>Cancelar</button>
            </form>
          
        )}
      </div>

      {channel_id &&
        !loading &&
        channels_response &&
        channels_response.data.channels.length > 0 && <Chat />}
    </div>
  );
};

export default WorkspaceDetailScreen;
