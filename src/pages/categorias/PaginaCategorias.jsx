import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../api/api';
import { agregarCategoria, editarCategoria, eliminarCategoria } from '../../features/categoria.slice';
import GraficoCategorias from '../../components/categorias/GraficoCategorias';
import ListaCategorias from '../../components/categorias/ListaCategorias';
import ModalCategoria from '../../components/categorias/ModalCategoria';
import ModalConfirmacion from '../../components/common/ModalConfirmacion';
import Boton from '../../components/common/Boton';
import Loader from '../../components/common/Loader';

const PaginaCategorias = () => {
  const categorias = useSelector(state => state.categoria.lista);
  const categoriasCargadas = useSelector(state => state.categoria.cargada);
  const dispatch = useDispatch();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);
  const [juegos, setJuegos] = useState([]);
  const [cargandoGrafico, setCargandoGrafico] = useState(true);

  useEffect(() => {
    const traerTodosLosJuegos = async () => {
      try {
        const primera = await api.get('/juegos', { params: { limit: 50, page: 1 } });
        let todos = primera.data.juegos;
        for (let pagina = 2; pagina <= primera.data.totalPages; pagina++) {
          const respuesta = await api.get('/juegos', { params: { limit: 50, page: pagina } });
          todos = [...todos, ...respuesta.data.juegos];
        }
        setJuegos(todos);
      } catch (error) {
        if (error.response?.status !== 401) toast.error('No se pudieron cargar los datos del gráfico');
      }
      setCargandoGrafico(false);
    };
    traerTodosLosJuegos();
  }, []);

  const etiquetas = categorias.map(categoria => categoria.nombreCategoria);
  const cantidades = categorias.map(categoria =>
    juegos.filter(juego => juego.categorias.some(c => c && c._id === categoria._id)).length
  );

  const abrirNueva = () => {
    setCategoriaEditando(null);
    setModalAbierto(true);
  };

  const abrirEdicion = (categoria) => {
    setCategoriaEditando(categoria);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setCategoriaEditando(null);
  };

  const guardar = async (datos) => {
    try {
      if (categoriaEditando) {
        const res = await api.patch(`/categorias/${categoriaEditando._id}`, datos);
        dispatch(editarCategoria({ _id: categoriaEditando._id, nombreCategoria: datos.nombreCategoria }));
        toast.success(res.data.message);
      } else {
        const res = await api.post('/categorias', datos);
        dispatch(agregarCategoria(res.data.categoria));
        toast.success(res.data.message);
      }
      cerrarModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'No se pudo guardar la categoría');
    }
  };

  const eliminar = (idCategoria, nombre) => {
    setCategoriaAEliminar({ _id: idCategoria, nombre });
  };

  const confirmarEliminacion = async () => {
    const idCategoria = categoriaAEliminar._id;
    try {
      const res = await api.delete(`/categorias/${idCategoria}`);
      dispatch(eliminarCategoria(idCategoria));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'No se pudo eliminar la categoría');
    }
    setCategoriaAEliminar(null);
  };

  return (
    <div className="pagina-categorias">
      <h2>Categorías</h2>
      <Boton onClick={abrirNueva}>+ Agregar categoría</Boton>
      {!categoriasCargadas ? <Loader texto="Cargando categorías..." /> : (
        <>
          {categorias.length === 0 && <p className="pagina-categorias__vacio">No hay categorías cargadas</p>}
          <ListaCategorias categorias={categorias} editar={abrirEdicion} eliminar={eliminar} />
        </>
      )}
      {cargandoGrafico && <Loader texto="Cargando gráfico..." />}
      {!cargandoGrafico && juegos.length === 0 && (
        <p className="pagina-categorias__vacio">Todavía no hay juegos para graficar</p>
      )}
      {!cargandoGrafico && juegos.length > 0 && (
        <GraficoCategorias etiquetas={etiquetas} cantidades={cantidades} />
      )}
      {modalAbierto && (
        <ModalCategoria categoria={categoriaEditando} guardar={guardar} cerrar={cerrarModal} />
      )}
      {categoriaAEliminar && (
        <ModalConfirmacion
          titulo="Eliminar categoría"
          mensaje={`¿Seguro que querés eliminar la categoría "${categoriaAEliminar.nombre}"?`}
          textoConfirmar="Eliminar"
          confirmar={confirmarEliminacion}
          cancelar={() => setCategoriaAEliminar(null)}
        />
      )}
    </div>
  );
};

export default PaginaCategorias;