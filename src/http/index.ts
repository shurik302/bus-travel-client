import axios from 'axios';

export const API_URL = 'http://localhost:5000/api';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    const token = document.cookie.split('; ').find((row) => row.startsWith('token='))?.split('=')[1];
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

$api.interceptors.response.use(
    config => config,
    async error => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
                document.cookie = `token=${response.data.accessToken};path=/;secure;HttpOnly`;
                return $api.request(originalRequest);
            } catch (e) {
                console.log('Not authorized');
            }
        }
        throw error;
    }
);

export default $api;
