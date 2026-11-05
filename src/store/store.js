import { configureStore } from '@reduxjs/toolkit'
import usuarioReducer from '../features/usuario/usuario.slice'

const store = configureStore({
  reducer: {
    usuario: usuarioReducer
  }
})

export default store