import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import api from '../../api/api';
import ListaJuegosUsuario from '../../components/juegos/ListaJuegosUsuario';
import ListaJuegosAdmin from '../../components/juegos/ListaJuegosAdmin';
import Paginador from '../../components/common/Paginador';
import Filtros from '../../components/juegos/Filtros';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { comprarJuego } from '../../features/usuario.slice';

const PaginaJuegos = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.usuario.token);
  const usuario = useSelector(state => state.usuario.usuario);
  const categorias = useSelector(state => state.categoria.lista);
  const [juegos, setJuegos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [filtros, setFiltros] = useState({});
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    api.get('/juegos', {
      params: { page: pagina, ...filtros },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(r => {
        setJuegos(r.data.juegos);
        setTotalPaginas(Math.max(r.data.totalPages, 1));
        setCargado(true);
      })
  }, [pagina, filtros]);

  const aplicarFiltros = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
    setPagina(1);
  }

  const comprar = async (idJuego) => {
    try {
      const res = await api.patch(`/usuarios/compras/${idJuego}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      dispatch(comprarJuego(idJuego));
      localStorage.setItem('usuario', JSON.stringify({
        ...usuario,
        juegosComprados: [...usuario.juegosComprados, idJuego]
      }));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'No se pudo realizar la compra');
    }
  }

  const eliminar = async (idJuego, nombre) => {
    if (!window.confirm(`¿Seguro que querés eliminar "${nombre}"?`)) return;
    try {
      const res = await api.delete(`/juegos/${idJuego}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setJuegos(juegos.filter(juego => juego._id !== idJuego));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'No se pudo eliminar el juego');
    }
  }
  
  const limiteAlcanzado = usuario.planUsuario === 'plus' && usuario.juegosComprados.length >= 4;

  return (
    <div className="pagina-juegos">
      {usuario.rol === 'admin' && (
        <Link to="/juegos/nuevo" className="pagina-juegos__agregar">Agregar juego</Link>
      )}
      <Filtros categorias={categorias} aplicarFiltros={aplicarFiltros} />
      {cargado && juegos.length === 0 && (
        <p className="pagina-juegos__vacio">No se encontró ningún juego</p>
      )}
      {usuario.rol === 'admin'
        ? <ListaJuegosAdmin juegos={juegos} eliminar={eliminar} />
        : <ListaJuegosUsuario
          juegos={juegos}
          juegosComprados={usuario.juegosComprados}
          limiteAlcanzado={limiteAlcanzado}
          comprar={comprar}
        />}
      <Paginador pagina={pagina} totalPaginas={totalPaginas} cambiarPagina={setPagina} />
    </div>
  );
};

export default PaginaJuegos;
