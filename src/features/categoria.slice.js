import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lista: [],
  cargada: false
};

const categoriaSlice = createSlice({
  name: 'categoria',
  initialState,
  reducers: {
    setCategorias: (state, action) => {
      state.lista = action.payload;
      state.cargada = true;
    },
    agregarCategoria: (state, action) => {
      state.lista.push(action.payload);
    },
    editarCategoria: (state, action) => {
      const categoria = state.lista.find(c => c._id === action.payload._id);
      if (categoria) categoria.nombreCategoria = action.payload.nombreCategoria;
    },
    eliminarCategoria: (state, action) => {
      state.lista = state.lista.filter(c => c._id !== action.payload);
    }
  }
});

export const { setCategorias, agregarCategoria, editarCategoria, eliminarCategoria } = categoriaSlice.actions;
export default categoriaSlice.reducer;