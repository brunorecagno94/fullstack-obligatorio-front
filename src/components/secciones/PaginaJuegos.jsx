import { useEffect, useState } from 'react';
import api from '../../api/api';
import ListaJuegosUsuario from '../ListaJuegosUsuario';
import Paginador from '../common/Paginador';
import Filtros from '../Filtros';

// PROVISORIO: hasta que exista el login, el token va a mano
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhZWEzNjI0NzdkZTg1NWViNjE4YzA4MiIsInJvbCI6InVzdWFyaW8iLCJpYXQiOjE3OTM3MzQxODAsImV4cCI6MTc5MzczNzc4MH0.yxWxUhi4ujU4Ro8xUdq_vsnIF70syDCpPhT4vigNzOM";
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
