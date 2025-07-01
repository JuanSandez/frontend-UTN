import { use, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createNewMessage, getAllMessagesByChannelId } from "../../services/messagesService";
import useCustomQuery from "../../hooks/useCustomQuery";
import useForm from "../../hooks/useForms";

const Chat = () => {
    const {channel_id, workspace_id} = useParams();
    const {response: server_messages_response, error, loading, sendRequest} = useCustomQuery();
    useEffect(() => {
        sendRequest(async () => getAllMessagesByChannelId({channel_id, workspace_id}));
    }, [channel_id]);
    const initial_state_form = {
        content: ""
    }
    const handleSubmitNewMessage = () => {
        sendRequest(
            async () => createNewMessage({channel_id, workspace_id, content: form_state.content}));
    }
    const {form_state, handleSubmit, handleChange} = useForm({
        onSubmit:  handleSubmitNewMessage,
        initial_form_state: initial_state_form
    })
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
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="content"></label>
                    <textarea name="content" id="content" onChange={handleChange} value={form_state.content}></textarea>
                </div>
                    <button type="submit">Enviar mensaje</button>
            </form>
        </div>
    )
}
export default Chat