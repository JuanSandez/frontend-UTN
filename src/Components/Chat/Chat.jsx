import { use, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  createNewMessage,
  getAllMessagesByChannelId,
} from "../../services/messagesService";
import useCustomQuery from "../../hooks/useCustomQuery";
import useForm from "../../hooks/useForms";
import "./Chat.css";

const Chat = () => {
  const { channel_id, workspace_id } = useParams();
  const {
    response: server_messages_response,
    error,
    loading,
    sendRequest,
  } = useCustomQuery();
  useEffect(() => {
    sendRequest(async () =>
      getAllMessagesByChannelId({ channel_id, workspace_id })
    );
  }, [channel_id]);
  const initial_state_form = {
    content: "",
  };
  const handleSubmitNewMessage = () => {
    sendRequest(async () =>
      createNewMessage({
        channel_id,
        workspace_id,
        content: form_state.content,
      })
    );
  };
  const { form_state, handleSubmit, handleChange } = useForm({
    onSubmit: handleSubmitNewMessage,
    initial_form_state: initial_state_form,
  });

  

  if (loading && !server_messages_response) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <p>Error al cargar mensajes: {error.message || error.toString()}</p>;
  }

  return (
    <div>
      <h1>Mensajes:</h1>
      {server_messages_response &&
      server_messages_response.data &&
      Array.isArray(server_messages_response.data.messages) &&
      server_messages_response.data.messages.length > 0 ? (
        server_messages_response.data.messages.map((message) => (
          <div className="message" key={message._id}>
            <b className="author">{message.user.name}</b>
            <p className="text">{message.content}</p>
          </div>
        ))
      ) : (
        <p>No hay mensajes para mostrar.</p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content"></label>
          <textarea
            name="content"
            id="content"
            onChange={handleChange}
            value={form_state.content}
          ></textarea>
        </div>
        <button type="submit">Enviar mensaje</button>
      </form>
    </div>
  );
};
export default Chat;
