import { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { cerrarSesion } from '../../features/usuario.slice'
import { tokenVencido } from '../../utils/token.utils'

const RutaProtegida = ({ rol }) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.usuario.token)
  const usuario = useSelector(state => state.usuario.usuario)
  const vencido = token && tokenVencido(token)

  useEffect(() => {
    if (vencido) {
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
      dispatch(cerrarSesion())
      toast.info('Tu sesión expiró, volvé a ingresar')
    }
  }, [vencido, dispatch])

  if (!token || vencido) {
    return <Navigate to="/login" />
  }
  if (rol && usuario.rol !== rol) {
    return <Navigate to="/juegos" />
  }
  return <Outlet />
}

export default RutaProtegida