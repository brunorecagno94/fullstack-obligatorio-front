import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { cerrarSesion } from '../../features/usuario/usuario.slice'
import Boton from '../common/Boton'

const Menu = () => {
  const usuario = useSelector(state => state.usuario.usuario)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    dispatch(cerrarSesion())
    navigate('/login')
  }

  return (
    <header className="menu">
      <Link to="/juegos" className="menu__logo">Estim</Link>
      <nav className="menu__nav">
        <Link to="/juegos">Tienda</Link>
        {usuario.rol === 'usuario' &&
          <>
            <Link to="/biblioteca">Mi biblioteca</Link>
            <Link to="/usuario">Mi perfil</Link>
          </>
        }
      </nav>
      <span className="menu__usuario">{usuario.nombreUsuario}</span>
      <Boton variante="secundario" onClick={logout}>Cerrar sesión</Boton>
    </header>
  )
}

export default Menu
