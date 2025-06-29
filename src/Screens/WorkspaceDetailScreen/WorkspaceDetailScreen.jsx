import { useEffect, useState } from "react";
import { getChannels } from "../../services/channelService";
import { Navigate, useParams } from "react-router-dom";
import SideBarChannels from "../../Screens/SideBarChannels/SideBarChannels";
import useCustomQuery from "../../hooks/useCustomQuery";
import Chat from "../../Components/Chat/Chat";

const WorkspaceDetailScreen = () => {

  const {
    response: channels_response,
    error,
    loading,
    sendRequest
  } = useCustomQuery();
  const { workspace_id, channel_id } = useParams();

  // const loadChannels = async () => {
  //     try {
  //         setLoading(true);
  //         const data = await getChannels({workspace_id: workspace_id});
  //         setChannelsResponse(data);
  //     } catch (error) {
  //         console.error("Error al obtener workspaces", error);
  //         setError(error);
  //     } finally {
  //         setLoading(false);
  //     }
  // };

  useEffect(() => {
    sendRequest(async () => getChannels({ workspace_id }));
  }, []);

  console.log(channels_response);

  if(!loading && channels_response){
    if(!channel_id && channels_response.data.channels.length > 0){
        return <Navigate to={`/workspaces/${workspace_id}/channels/${channels_response.data.channels[0]._id}`}/>
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
      {
        !loading && channels_response && <SideBarChannels channels={channels_response.data.channels} />
      }

      {channel_id 
      && !loading 
      && channels_response 
      && channels_response.data.channels.length > 0 
      && <Chat />}
      
    </div>
  );
};

export default WorkspaceDetailScreen;
