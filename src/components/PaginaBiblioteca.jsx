import { useEffect, useState } from 'react';
import axios from 'axios';
import ListaBiblioteca from './ListaBiblioteca';
import { URL_API, TOKEN } from '../config';

const PaginaBiblioteca = () => {

  const [juegos, setJuegos] = useState([]);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    axios.get(`${URL_API}/usuarios/compras`, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`
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
