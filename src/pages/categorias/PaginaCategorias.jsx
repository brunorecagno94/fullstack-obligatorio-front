import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import api from '../../api/api'
import { agregarCategoria, editarCategoria, eliminarCategoria } from '../../features/categoria.slice'
import ListaCategorias from '../../components/categorias/ListaCategorias'
import ModalCategoria from '../../components/categorias/ModalCategoria'
import Boton from '../../components/common/Boton'

const PaginaCategorias = () => {
  const token = useSelector(state => state.usuario.token)
  const categorias = useSelector(state => state.categoria.lista)
  const dispatch = useDispatch()
  const [modalAbierto, setModalAbierto] = useState(false)
  const [categoriaEditando, setCategoriaEditando] = useState(null)

  const abrirNueva = () => {
    setCategoriaEditando(null)
    setModalAbierto(true)
  }

  const abrirEdicion = (categoria) => {
    setCategoriaEditando(categoria)
    setModalAbierto(true)
  }

  const cerrarModal = () => {
    setModalAbierto(false)
    setCategoriaEditando(null)
  }

  const guardar = async (datos) => {
    const headers = { 'Authorization': `Bearer ${token}` }
    try {
      if (categoriaEditando) {
        const res = await api.patch(`/categorias/${categoriaEditando._id}`, datos, { headers })
        dispatch(editarCategoria({ _id: categoriaEditando._id, nombreCategoria: datos.nombreCategoria }))
        toast.success(res.data.message)
      } else {
        const res = await api.post('/categorias', datos, { headers })
        dispatch(agregarCategoria(res.data.categoria))
        toast.success(res.data.message)
      }
      cerrarModal()
    } catch (error) {
      toast.error(error.response?.data?.message || 'No se pudo guardar la categoría')
    }
  }

  const eliminar = async (idCategoria, nombre) => {
    if (!window.confirm(`¿Seguro que querés eliminar la categoría "${nombre}"?`)) return
    try {
      const res = await api.delete(`/categorias/${idCategoria}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      dispatch(eliminarCategoria(idCategoria))
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response?.data?.message || 'No se pudo eliminar la categoría')
    }
  }

  return (
    <div className="pagina-categorias">
      <h2>Categorías</h2>
      <Boton onClick={abrirNueva}>Agregar categoría</Boton>
      {categorias.length === 0 && <p>No hay categorías cargadas</p>}
      <ListaCategorias categorias={categorias} editar={abrirEdicion} eliminar={eliminar} />
      {modalAbierto && (
        <ModalCategoria categoria={categoriaEditando} guardar={guardar} cerrar={cerrarModal} />
      )}
    </div>
  )
}

export default PaginaCategorias