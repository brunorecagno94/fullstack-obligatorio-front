import { configureStore } from '@reduxjs/toolkit';
import usuarioReducer from '../features/usuario.slice';
import categoriaReducer from '../features/categoria.slice';

const store = configureStore({
  reducer: {
    usuario: usuarioReducer,
    categoria: categoriaReducer
  }
});

store.subscribe(() => {
  const { token, usuario } = store.getState().usuario;
  if (token) {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  } else {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }
});

export default store;