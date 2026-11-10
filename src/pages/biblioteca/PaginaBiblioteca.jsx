import { useEffect, useState } from 'react';
import api from '../../api/api';
import ListaBiblioteca from '../../components/biblioteca/ListaBiblioteca';
import Filtros from '../../components/juegos/Filtros';
import Paginador from '../../components/common/Paginador';
import ModalConfirmacion from '../../components/common/ModalConfirmacion';
import Loader from '../../components/common/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { quitarJuego } from '../../features/usuario.slice';
import { toast } from 'react-toastify';

const POR_PAGINA = 10;
const opcionesOrdenBiblioteca = [
  { valor: 'nombre', texto: 'Nombre' }
];

const PaginaBiblioteca = () => {
  const categorias = useSelector(state => state.categoria.lista);
  const dispatch = useDispatch();
  const [juegos, setJuegos] = useState([]);
  const [cargado, setCargado] = useState(false);
  const [juegoAQuitar, setJuegoAQuitar] = useState(null);
  const [filtros, setFiltros] = useState({});
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    api.get('/usuarios/compras')
      .then(r => {
        setJuegos(r.data.juegosComprados);
        setCargado(true);
      })
      .catch(error => {
        setCargado(true);
        if (error.response?.status !== 401) toast.error('No se pudo cargar tu biblioteca');
      });
  }, []);

  let filtrados = juegos.filter(juego =>
    (!filtros.nombre || juego.nombreJuego.toLowerCase().includes(filtros.nombre.toLowerCase())) &&
    (!filtros.categoria || juego.categorias.some(c => c && c._id === filtros.categoria))
  );
  if (filtros.ordenarPor === 'nombre') {
    filtrados = [...filtrados].sort((a, b) => a.nombreJuego.localeCompare(b.nombreJuego));
  }

  const totalPaginas = Math.max(Math.ceil(filtrados.length / POR_PAGINA), 1);
  const paginaActual = Math.min(pagina, totalPaginas);
  const visibles = filtrados.slice((paginaActual - 1) * POR_PAGINA, paginaActual * POR_PAGINA);

  const aplicarFiltros = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
    setPagina(1);
  };

  const quitar = (idJuego, nombre) => {
    setJuegoAQuitar({ _id: idJuego, nombre });
  };

  const confirmarQuitar = async () => {
    const idJuego = juegoAQuitar._id;
    try {
      const res = await api.delete(`/usuarios/compras/${idJuego}`);
      setJuegos(juegos.filter(juego => juego._id !== idJuego));
      dispatch(quitarJuego(idJuego));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'No se pudo quitar el juego');
    }
    setJuegoAQuitar(null);
  };

  return (
    <div className="pagina-biblioteca">
      <h2>Mi biblioteca</h2>
      {!cargado ? <Loader /> : (
        <>
          {juegos.length === 0
            ? <p className="pagina-biblioteca__vacio">Todavía no compraste ningún juego</p>
            : (
              <>
                <Filtros
                  categorias={categorias}
                  aplicarFiltros={aplicarFiltros}
                  conPrecio={false}
                  opcionesOrden={opcionesOrdenBiblioteca}
                />
                {filtrados.length === 0 && (
                  <p className="pagina-biblioteca__vacio">Ningún juego coincide con los filtros</p>
                )}
                <ListaBiblioteca juegos={visibles} quitar={quitar} />
                <Paginador pagina={paginaActual} totalPaginas={totalPaginas} cambiarPagina={setPagina} />
              </>
            )}
        </>
      )}
      {juegoAQuitar && (
        <ModalConfirmacion
          titulo="Quitar de la biblioteca"
          mensaje={`¿Seguro que querés quitar "${juegoAQuitar.nombre}" de tu biblioteca?`}
          textoConfirmar="Quitar"
          confirmar={confirmarQuitar}
          cancelar={() => setJuegoAQuitar(null)}
        />
      )}
    </div>
  );
};

export default PaginaBiblioteca;
