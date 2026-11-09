import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { cerrarSesion } from '../../features/usuario.slice';
import Boton from '../common/Boton';
import logo from '../../assets/logo-estim.png';

const Menu = () => {
  const usuario = useSelector(state => state.usuario.usuario);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [abierto, setAbierto] = useState(false);

  const logout = () => {
    dispatch(cerrarSesion());
    navigate('/login');
  };

  return (
    <header className="menu">
      <Link to="/juegos" className="menu__logo" onClick={() => setAbierto(false)}>
        <img src={logo} alt="Estim" />
      </Link>

      <button
        type="button"
        className="menu__hamburguesa"
        aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={abierto}
        onClick={() => setAbierto(!abierto)}
      >
        {abierto ? '✕' : '☰'}
      </button>

      <div
        className={abierto ? 'menu__contenido menu__contenido--abierto' : 'menu__contenido'}
        onClick={() => setAbierto(false)}
      >
        <nav className="menu__nav">
          <Link to="/juegos">Tienda</Link>
          {usuario.rol === 'usuario' &&
            <>
              <Link to="/biblioteca">Mi biblioteca</Link>
              <Link to="/usuario">Mi perfil</Link>
            </>
          }
          {usuario.rol === 'admin' && <Link to="/categorias">Categorías</Link>}
        </nav>
        <span className="menu__usuario">{usuario.nombreUsuario}</span>
        <div className="menu__derecha">
          <Boton variante="secundario" onClick={logout}>Cerrar sesión</Boton>
        </div>
      </div>
    </header>
  );
};

export default Menu;
