import { useEffect, useState } from 'react';
import api from '../../api/api';
import ListaBiblioteca from '../../components/biblioteca/ListaBiblioteca';
import { useSelector } from 'react-redux';

const PaginaBiblioteca = () => {
  const token = useSelector(state => state.usuario.token);
  const [juegos, setJuegos] = useState([]);
  const [cargado, setCargado] = useState(false);

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
  }, []);

  return (
    <div className="pagina-biblioteca">
      <h2>Mi biblioteca</h2>
      {cargado && juegos.length === 0 && (
        <p className="pagina-biblioteca__vacio">Todavía no compraste ningún juego</p>
      )}
      <ListaBiblioteca juegos={juegos} />
    </div>
  );
};

export default PaginaBiblioteca;
