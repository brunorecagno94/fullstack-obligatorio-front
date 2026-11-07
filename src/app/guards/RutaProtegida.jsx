import { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { cerrarSesion } from '../../features/usuario.slice'

const tokenVencido = (token) => {
  const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
  const { exp } = JSON.parse(atob(payload))
  return exp * 1000 < Date.now()
}

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