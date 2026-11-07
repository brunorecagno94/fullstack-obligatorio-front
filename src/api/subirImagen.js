import api from './api'

export const subirImagen = async (archivo, token) => {
  const formData = new FormData();
  formData.append('imagen', archivo);
  const res = await api.post('/uploads', formData, {
    headers: { 'Authorization': `Bearer ${token}` }
  })

  return res.data.url
}