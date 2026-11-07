import { configureStore } from '@reduxjs/toolkit'
import usuarioReducer from '../features/usuario.slice'
import categoriaReducer from '../features/categoria.slice'

const store = configureStore({
  reducer: {
    usuario: usuarioReducer,
    categoria: categoriaReducer
  }
})

export default store