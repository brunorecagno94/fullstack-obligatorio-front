import api from './api';

export const subirImagen = async (archivo) => {
  const formData = new FormData();
  formData.append('imagen', archivo);
  const res = await api.post('/uploads', formData);

  return res.data.url;
};