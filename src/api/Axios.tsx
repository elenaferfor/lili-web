import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    // Use devuelve una opción de éxito y una de fallo
    // Si todo va bien devuelve la misma respuesta
    response => response,
    // Si va mal, recoge el error
    async error => {
        const originalRequest = error.config;
        
        // Si es 401 comprueba que no se reintenta para que no entre en bucle
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes('/auth/logout/') &&
            !originalRequest.url?.includes('/auth/me/')   // añadir esto
        ) {
            originalRequest._retry = true;
        
            // refresca el token y reintenta la petición original
            try {
                await api.post("/auth/refresh/");
                return api(originalRequest);
            } catch {
                // si no puede refrescar, caducó el login
                window.location.hash = "/login";
            }
        }
        
        return Promise.reject(error);
    }
);

export default api;