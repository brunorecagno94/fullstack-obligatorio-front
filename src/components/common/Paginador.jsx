import Boton from './Boton';

const Paginador = ({ pagina, totalPaginas, cambiarPagina }) => {
  return (
    <div className="paginador">
      <Boton
        variante="secundario"
        disabled={pagina === 1}
        onClick={() => cambiarPagina(pagina - 1)}
      >
        Anterior
      </Boton>
      <span className="paginador-texto">Página {pagina} de {totalPaginas}</span>
      <Boton
        variante="secundario"
        disabled={pagina === totalPaginas}
        onClick={() => cambiarPagina(pagina + 1)}
      >
        Siguiente
      </Boton>
    </div>
  );
};

export default Paginador;
