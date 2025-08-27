import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function useFetch(initialData = null) {
    const [data, setData] = useState(initialData)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchDataBackend = async (url, options = {}) => {
        setLoading(true)
        setError(null)

        try {
            const method = options.method?.toUpperCase() || 'GET';
            const body = options.body || null;
            const config = options.config || {};

            let response;

            switch (method) {
                case 'GET':
                    response = await axios.get(url, config);
                    break;
                case 'POST':
                    response = await axios.post(url, body, config);
                    break;
                case 'PUT':
                    response = await axios.put(url, body || {}, config);
                    break;
                case 'DELETE':
                    response = await axios.delete(url, config);
                    break;
                default:
                    throw new Error(`Método ${method} no soportado`);
            }

            if (response?.data?.msg) toast.success(response.data.msg);

            setData(response.data);
            return response.data;
        } catch (error) {
            const errorMsg = error.response?.data?.msg || error.message || "Errror desconocido"
            setError(errorMsg);
            throw error;
        } finally {
            setLoading(false);
        }

    }
    return { data, loading, error, fetchDataBackend };
}

export default useFetch;
