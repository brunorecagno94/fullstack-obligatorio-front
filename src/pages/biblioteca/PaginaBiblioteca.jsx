import { useEffect, useState } from 'react';
import api from '../../api/api';
import ListaBiblioteca from '../../components/biblioteca/ListaBiblioteca';
import ModalConfirmacion from '../../components/common/ModalConfirmacion';
import Loader from '../../components/common/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { quitarJuego } from '../../features/usuario.slice';
import { toast } from 'react-toastify';

const PaginaBiblioteca = () => {
  const token = useSelector(state => state.usuario.token);
  const usuario = useSelector(state => state.usuario.usuario);
  const dispatch = useDispatch();
  const [juegos, setJuegos] = useState([]);
  const [cargado, setCargado] = useState(false);
  const [juegoAQuitar, setJuegoAQuitar] = useState(null);

  useEffect(() => {
    api.get('/usuarios/compras', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(r => {
        setJuegos(r.data.juegosComprados);
        setCargado(true);
      })
      .catch(error => {
        setCargado(true);
        if (error.response?.status !== 401) toast.error('No se pudo cargar tu biblioteca');
      })
  }, [token]);

  const quitar = (idJuego, nombre) => {
    setJuegoAQuitar({ _id: idJuego, nombre });
  }

  const confirmarQuitar = async () => {
    const idJuego = juegoAQuitar._id;
    try {
      const res = await api.delete(`/usuarios/compras/${idJuego}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setJuegos(juegos.filter(juego => juego._id !== idJuego));
      dispatch(quitarJuego(idJuego));
      localStorage.setItem('usuario', JSON.stringify({
        ...usuario,
        juegosComprados: usuario.juegosComprados.filter(id => id !== idJuego)
      }));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'No se pudo quitar el juego');
    }
    setJuegoAQuitar(null);
  }

  return (
    <div className="pagina-biblioteca">
      <h2>Mi biblioteca</h2>
      {!cargado ? <Loader /> : (
        <>
          {juegos.length === 0 && (
            <p className="pagina-biblioteca__vacio">Todavía no compraste ningún juego</p>
          )}
          <ListaBiblioteca juegos={juegos} quitar={quitar} />
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
