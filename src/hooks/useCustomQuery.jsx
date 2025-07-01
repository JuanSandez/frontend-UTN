import { useState } from "react";

const useCustomQuery = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async (callback) => {
        try {
            setLoading(true);
            const data = await callback()
            setResponse(data);
        } catch (error) {
            console.error("Error al hacer la request", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }
    return {
        response,
        loading,
        error,
        sendRequest
    }
}
export default useCustomQuery