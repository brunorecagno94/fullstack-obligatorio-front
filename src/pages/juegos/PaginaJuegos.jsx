import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import api from '../../api/api';
import ListaJuegosUsuario from '../../components/juegos/ListaJuegosUsuario';
import ListaJuegosAdmin from '../../components/juegos/ListaJuegosAdmin';
import Paginador from '../../components/common/Paginador';
import Filtros from '../../components/juegos/Filtros';
import ModalConfirmacion from '../../components/common/ModalConfirmacion';
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
  const [recargas, setRecargas] = useState(0);
  const [juegoAEliminar, setJuegoAEliminar] = useState(null);

  useEffect(() => {
    api.get('/juegos', {
      params: { page: pagina, ...filtros },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(r => {
        if (r.data.juegos.length === 0 && pagina > 1) {
          setPagina(pagina - 1);
          return;
        }
        setJuegos(r.data.juegos);
        setTotalPaginas(Math.max(r.data.totalPages, 1));
        setCargado(true);
      })
      .catch(error => {
        if (error.response?.status !== 401) toast.error('No se pudieron cargar los juegos');
      })
  }, [pagina, filtros, token, recargas]);

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

  const eliminar = (idJuego, nombre) => {
    setJuegoAEliminar({ _id: idJuego, nombre });
  }

  const confirmarEliminacion = async () => {
    try {
      const res = await api.delete(`/juegos/${juegoAEliminar._id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setRecargas(recargas + 1);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'No se pudo eliminar el juego');
    }
    setJuegoAEliminar(null);
  }
  
  const limiteAlcanzado = usuario.planUsuario === 'plus' && usuario.juegosComprados.length >= 4;

  return (
    <div className="pagina-juegos">
      {usuario.rol === 'admin' && (
        <Link to="/juegos/nuevo" className="btn btn-principal pagina-juegos__agregar">+ Agregar juego</Link>
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
      {juegoAEliminar && (
        <ModalConfirmacion
          titulo="Eliminar juego"
          mensaje={`¿Seguro que querés eliminar "${juegoAEliminar.nombre}"? Esta acción no se puede deshacer.`}
          textoConfirmar="Eliminar"
          confirmar={confirmarEliminacion}
          cancelar={() => setJuegoAEliminar(null)}
        />
      )}
    </div>
  );
};

export default PaginaJuegos;
