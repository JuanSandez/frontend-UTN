import  LOCALSTORAGE_KEYS from "../constants/localStorage";
import ENVIRONMENT from "../constants/environment";
import methods_HTTP from "../constants/methodsHTTP";

export const getAllMessagesByChannelId = async ({channel_id, workspace_id}) => {
    try {
        const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN)
        const server_response = await fetch(ENVIRONMENT.VITE_URL_API + `/api/messages/${workspace_id}/${channel_id}`, {
            method: methods_HTTP.GET,
            headers: {
                "Authorization": `Bearer ${auth_token}`
            }
        })
        const data = await server_response.json()
        return data
    } catch (error) {
        console.error("Error al obtener workspaces", error);
        throw error
    } 
}

export const createNewMessage = async ({channel_id, workspace_id, content}) => {
    try {
        const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN)
        const server_response = await fetch(ENVIRONMENT.VITE_URL_API + `/api/messages/${workspace_id}/${channel_id}`, {
            method: methods_HTTP.POST,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth_token}`
            },
            body: JSON.stringify({
                content
            })
        })
        const data = await server_response.json()
        return data
    } catch (error) {
        console.error("Error al obtener workspaces", error);
        throw error
    } 
}