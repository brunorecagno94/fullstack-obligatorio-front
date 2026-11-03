import { useEffect, useState } from 'react';
import api from '../../api/api';
import ListaJuegosUsuario from '../../components/juegos/ListaJuegosUsuario';
import Paginador from '../../components/common/Paginador';
import Filtros from '../../components/juegos/Filtros';
import { TOKEN } from '../../config';
const PaginaJuegos = () => {
  const [juegos, setJuegos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [filtros, setFiltros] = useState({});
  const [categorias, setCategorias] = useState([]);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    api.get('/categorias', {
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      }
    })
      .then(r => setCategorias(r.data));
  }, []);

  useEffect(() => {
    api.get('/juegos', {
      params: { page: pagina, ...filtros },
      headers: {
        'Authorization': `Bearer ${TOKEN}`
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

  return (
    <div className="pagina-juegos">
      <Filtros categorias={categorias} aplicarFiltros={aplicarFiltros} />
      {cargado && juegos.length === 0 && (
        <p className="pagina-juegos__vacio">No se encontró ningún juego</p>
      )}
      <ListaJuegosUsuario juegos={juegos} />
      <Paginador pagina={pagina} totalPaginas={totalPaginas} cambiarPagina={setPagina} />
    </div>
  );
};

export default PaginaJuegos;
