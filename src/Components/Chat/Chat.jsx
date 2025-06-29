import { use, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllMessagesByChannelId } from "../../services/messagesService";
import useCustomQuery from "../../hooks/useCustomQuery";

const Chat = () => {
    const {channel_id, workspace_id} = useParams();
    const {response: server_messages_response, error, loading, sendRequest} = useCustomQuery();
    useEffect(() => {
        sendRequest(async () => getAllMessagesByChannelId({channel_id, workspace_id}));
    }, [channel_id]);
    console.log(server_messages_response);
    if(loading && !server_messages_response){return <span>Loading...</span>}
    return (
        <div>
            <h1>Mensajes:</h1>
            {
                server_messages_response && server_messages_response.data.messages.map((message) =>
                    <div key={message._id}>
                        <b>Autor:{message.user.name}</b>
                        <p>{message.content}</p>
                    </div> 
                    )
            }
            Chat
        </div>
    )
}
export default Chat