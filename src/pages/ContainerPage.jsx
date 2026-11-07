import { useEffect } from 'react'
import { Outlet } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import api from '../api/api'
import { setCategorias } from '../features/categoria.slice'
import Menu from '../components/layout/Menu'
import Footer from '../components/layout/Footer'

const ContainerPage = () => {
  const token = useSelector(state => state.usuario.token)
  const dispatch = useDispatch()

  useEffect(() => {
    api.get('/categorias', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(r => dispatch(setCategorias(r.data)))
      .catch(() => toast.error('No se pudieron cargar las categorías'))
  }, [token, dispatch])

  return (
    <>
      <Menu />
      <main className="contenido">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default ContainerPage