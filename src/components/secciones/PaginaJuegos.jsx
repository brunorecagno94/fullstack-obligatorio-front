import { useEffect, useState } from 'react';
import axios from 'axios';
import ListaJuegosUsuario from '../ListaJuegosUsuario';
import Paginador from '../common/Paginador';
import Filtros from '../Filtros';

// PROVISORIO: hasta que exista el login, la URL y el token van a mano
const URL_API = "http://localhost:3000/v1";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhZGQzOTA4NDIwM2E1M2YyNzk0OTA4NSIsInJvbCI6InVzdWFyaW8iLCJpYXQiOjE3OTI4ODI5NTIsImV4cCI6MTc5Mjg4NjU1Mn0.n6MRGm17IzLaW1zmo2-PEvepZLCcVIf3v8ftjDRBQxk";

const PaginaJuegos = () => {
  const [juegos, setJuegos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [filtros, setFiltros] = useState({});
  const [categorias, setCategorias] = useState([]);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    axios.get(`${URL_API}/categorias`, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      }
    })
      .then(r => setCategorias(r.data));
  }, []);

  useEffect(() => {
    axios.get(`${URL_API}/juegos`, {
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
