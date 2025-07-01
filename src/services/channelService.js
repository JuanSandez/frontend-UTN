import ENVIRONMENT from "../constants/environment";
import LOCALSTORAGE_KEYS from "../constants/localStorage";
import methods_HTTP from "../constants/methodsHTTP";

export const getChannels = async ({workspace_id}) => {
    try {
        const server_response = await fetch(
            `${ENVIRONMENT.VITE_URL_API}/api/channels/${workspace_id}`,
            {
                method: methods_HTTP.GET,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN)}`
                }       
            }
        );
        const data = await server_response.json();
        return data;
    }
     catch (error) {
        console.error(error);
        throw error
    }
}

export const createChannel = async ({name, workspace_id}) => {
    try {
        const server_response = await fetch(
            `${ENVIRONMENT.VITE_URL_API}/api/channels/${workspace_id}`,
            {
                method: methods_HTTP.POST,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN)}`
                },
                body: JSON.stringify({name})
            }
        )
        const data = await server_response.json();
        return data;
    }
     catch (error) {
        console.error("Error al crear canales", error);
        throw error
    }
}