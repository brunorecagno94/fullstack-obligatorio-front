import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem('token'),
  usuario: JSON.parse(localStorage.getItem('usuario'))
}

const usuarioSlice = createSlice({
  name: 'usuario',
  initialState,
  reducers: {
    iniciarSesion: (state, action) => {
      state.token = action.payload.token
      state.usuario = action.payload.usuario
    },
    cerrarSesion: (state) => {
      state.token = null
      state.usuario = null
    },
    comprarJuego: (state, action) => {
      state.usuario.juegosComprados.push(action.payload)
    },
    quitarJuego: (state, action) => {
      state.usuario.juegosComprados = state.usuario.juegosComprados.filter(id => id !== action.payload)
    },
    cambiarPlan: (state, action) => {
      state.usuario.planUsuario = action.payload
    }
  }
})

export const { iniciarSesion, cerrarSesion, comprarJuego, quitarJuego, cambiarPlan } = usuarioSlice.actions
export default usuarioSlice.reducer