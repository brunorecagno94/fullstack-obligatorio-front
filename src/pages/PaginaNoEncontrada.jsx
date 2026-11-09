import { Link } from 'react-router';

const PaginaNoEncontrada = () => {
  return (
    <div className="pagina-no-encontrada">
      <h2>404</h2>
      <p>La página que buscás no existe.</p>
      <Link to="/juegos">Volver a la tienda</Link>
    </div>
  );
};

export default PaginaNoEncontrada;
