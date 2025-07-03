import { useEffect, useState } from "react";
import { createChannel, getChannels } from "../../services/channelService";
import { Navigate, useParams } from "react-router-dom";
import SideBarChannels from "../../Screens/SideBarChannels/SideBarChannels";
import useCustomQuery from "../../hooks/useCustomQuery";
import Chat from "../../Components/Chat/Chat";
import useForm from "../../hooks/useForms";
import "./WorkspaceDetailScreen.css";
import { deleteChannel } from "../../services/channelService";

const WorkspaceDetailScreen = () => {
  const { workspace_id, channel_id } = useParams();
  const [is_create_channel, setIsCreateChannel] = useState(false);
  const handleSubmitNewChannel = () => {
    sendRequest(async () =>
      createChannel({ name: form_state.name, workspace_id: workspace_id })
    );
    setIsCreateChannel(false);
  };
  const initial_form_state = {
    name: "",
  };
  const { form_state, handleSubmit, handleChange } = useForm({
    onSubmit: handleSubmitNewChannel,
    initial_form_state,
  });

  const handleDeleteChannel = async (channelId) => {
    if (
      !window.confirm(
        "Estas seguro que queres eliminar este canal? Esta acción es irreversible."
      )
    )
      return;
    try {
      await deleteChannel({ workspace_id, channel_id: channelId });

      await sendRequest(async () => getChannels({ workspace_id }));
    } catch (error) {
      alert(error.message || "Error al eliminar el canal");
    }
  };

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

  if (!loading && channels_response) {
    if (!channel_id && channels_response.data.channels.length > 0) {
      return (
        <Navigate
          to={`/workspaces/${workspace_id}/channels/${channels_response.data.channels[0]._id}`}
        />
      );
    }
  }

  const currentChannel = channels_response?.data?.channels.find(
    (channel) => channel._id === channel_id
  );

  if (loading) {
    return (
      <div className="loading">
        <h2>Cargando espacios de trabajo...</h2>
      </div>
    );
  }

  return (
    <div className="workspace-layout">
      <aside className="sidebar">
        <h2>Canales</h2>
        {!loading && channels_response && (
          <SideBarChannels
            channels={channels_response.data.channels}
            onDeleteChannel={handleDeleteChannel}
          />
        )}
      </aside>

      <main className="main-panel">
        <header className="workspace-header">
          <h2>
            {channels_response?.data?.channels.length === 0 ? (
              <>
                No hay canales en este workspace
                <br />
                Crea un canal para comenzar!
              </>
            ) : currentChannel ? (
              `# ${currentChannel.name}`
            ) : (
              "Detalles del Workspace"
            )}
          </h2>

          {!is_create_channel && (
            <button onClick={handleChangeCreateChannel}>Crear canal</button>
          )}
        </header>

        {is_create_channel && (
          <form className="channel-form" onSubmit={handleSubmit}>
            <label htmlFor="channel-name">Nombre canal:</label>
            <input
              id="channel-name"
              type="text"
              placeholder="Nuevo canal"
              onChange={handleChange}
              name="name"
              value={form_state.name}
            />
            <div className="form-buttons">
              <button type="submit">Crear</button>
              <button type="button" onClick={handleQuitCreateMode}>
                Cancelar
              </button>
            </div>
          </form>
        )}

        {channel_id &&
          !loading &&
          channels_response &&
          channels_response.data.channels.length > 0 && <Chat />}
      </main>
    </div>
  );
};

export default WorkspaceDetailScreen;
