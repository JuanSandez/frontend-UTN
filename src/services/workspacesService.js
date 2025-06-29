import ENVIRONMENT from "../constants/environment"
import LOCALSTORAGE_KEYS from "../constants/localStorage"
import methods_HTTP from "../constants/methodsHTTP"

export const getAllWorkspaces = async () => {
    try {
        const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN)
        const server_response = await fetch(ENVIRONMENT.VITE_URL_API + "/api/workspaces", {
            method: methods_HTTP.GET,
            headers: {
                "Authorization": `Bearer ${auth_token}`
            }
        })
        const data =  server_response.json()
        return data
    } catch (error) {
        console.error(error);
        throw error
    }
}