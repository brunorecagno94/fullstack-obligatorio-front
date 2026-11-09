import axios from 'axios';
import { toast } from 'react-toastify';
import store from '../store/store';
import { cerrarSesion } from '../features/usuario.slice';

const api = axios.create({
  baseURL: 'https://fullstack-obligatorio.vercel.app/v1'
});

api.interceptors.request.use(config => {
  const token = store.getState().usuario.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  respuesta => respuesta,
  error => {
    if (error.response?.status === 401 && store.getState().usuario.token) {
      store.dispatch(cerrarSesion());
      toast.info('Tu sesión expiró, volvé a ingresar');
    }
    return Promise.reject(error);
  }
);

export default api;
