import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import api from '../../api/api'
import { subirImagen } from '../../api/subirImagen'
import FormularioJuego from '../../components/juegos/FormularioJuego'

const valoresIniciales = {
  nombreJuego: '',
  descripcionJuego: '',
  precioJuego: '',
  monedaJuego: 'UYU',
  edadMinima: '',
  categorias: []
}

const PaginaCrearJuego = () => {
  const token = useSelector(state => state.usuario.token)
  const navigate = useNavigate()
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    api.get('/categorias', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(r => setCategorias(r.data))
      .catch(() => toast.error('No se pudieron cargar las categorías'))
  }, [token])

  const guardar = async (datos) => {
    try {
      const { imagenJuego, ...juego } = datos
      if (imagenJuego?.[0]) {
        juego.imagenJuego = await subirImagen(imagenJuego[0], token)
      }
      const res = await api.post('/juegos', juego, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      toast.success(res.data.message)
      navigate('/juegos')
    } catch (error) {
      toast.error(error.response?.data?.message || 'No se pudo crear el juego')
    }
  }

  return (
    <div className="pagina-nuevo-juego">
      <h2>Agregar juego</h2>
      <FormularioJuego
        valoresIniciales={valoresIniciales}
        categorias={categorias}
        guardar={guardar}
        textoBoton="Crear juego"
      />
    </div>
  )
}

export default PaginaCrearJuego