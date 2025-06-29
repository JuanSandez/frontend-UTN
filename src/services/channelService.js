import ENVIRONMENT from "../constants/environment";
import LOCALSTORAGE_KEYS from "../constants/localStorage";
import methods_HTTP from "../constants/methodsHTTP";

export const getChannels = async ({workspace_id}) => {
    try {
        const server_response_http = await fetch(
            `${ENVIRONMENT.VITE_URL_API}/api/channels/${workspace_id}`,
            {
                method: methods_HTTP.GET,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN)}`
                }       
            }
        );
        const data = await server_response_http.json();
        return data;
    }
     catch (error) {
        console.error(error);
        throw error
    }
}