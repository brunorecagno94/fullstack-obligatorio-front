import { useState } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Boton from '../common/Boton';

const opcionesOrdenTienda = [
  { valor: 'nombre', texto: 'Nombre' },
  { valor: 'precio', texto: 'Precio' }
];

const Filtros = ({ categorias, aplicarFiltros, conPrecio = true, opcionesOrden = opcionesOrdenTienda }) => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [orden, setOrden] = useState('');
  const [abierto, setAbierto] = useState(false);

  const hayCriterio = nombre.trim() !== '' || categoria !== '' || precioMin !== '' || precioMax !== '' || orden !== '';
  const precioNoPositivo = (precioMin !== '' && Number(precioMin) <= 0) || (precioMax !== '' && Number(precioMax) <= 0);
  const rangoInvalido = precioMin !== '' && precioMax !== '' && Number(precioMin) > Number(precioMax);

  let error = '';
  if (precioNoPositivo) error = 'Los precios deben ser mayores a 0';
  else if (rangoInvalido) error = 'El precio mínimo no puede ser mayor al máximo';

  const opcionesCategorias = categorias.map(categoria => ({
    valor: categoria._id,
    texto: categoria.nombreCategoria
  }));

  const filtrar = () => {
    const filtros = {};

    if (nombre.trim() !== '') filtros.nombre = nombre.trim();
    if (categoria !== '') filtros.categoria = categoria;
    if (precioMin !== '') filtros.precioMin = Number(precioMin);
    if (precioMax !== '') filtros.precioMax = Number(precioMax);
    if (orden !== '') filtros.ordenarPor = orden;

    aplicarFiltros(filtros);
  };

  const limpiar = () => {
    setNombre('');
    setCategoria('');
    setPrecioMin('');
    setPrecioMax('');
    setOrden('');
    aplicarFiltros({});
  };

  return (
    <div className="filtros">
      <div className="filtros__toggle">
        <Boton variante="secundario" onClick={() => setAbierto(!abierto)}>
          {abierto ? 'Ocultar filtros ▲' : 'Mostrar filtros ▼'}
        </Boton>
      </div>
      <form className={abierto ? 'filtros__form filtros__form--abierto' : 'filtros__form'}>
        <Input
          label="Nombre:"
          type="text"
          placeholder="Buscar juego..."
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />

        <Select
          label="Categoría:"
          placeholder="Todas"
          opciones={opcionesCategorias}
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
        />

        <Select
          label="Orden:"
          placeholder="Ninguno"
          opciones={opcionesOrden}
          value={orden}
          onChange={e => setOrden(e.target.value)}
        />

        {conPrecio && (
          <>
            <Input
              label="Precio mínimo:"
              type="number"
              min="1"
              value={precioMin}
              onChange={e => setPrecioMin(e.target.value)}
            />

            <Input
              label="Precio máximo:"
              type="number"
              min="1"
              value={precioMax}
              onChange={e => setPrecioMax(e.target.value)}
            />
          </>
        )}

        <div className="filtros__botones">
          <Boton onClick={filtrar} disabled={!hayCriterio || error !== ''}>
            Filtrar
          </Boton>
          <Boton variante="secundario" onClick={limpiar} disabled={!hayCriterio}>
            Limpiar
          </Boton>
        </div>
      </form>
      {error !== '' && <p className="filtros__error">{error}</p>}
    </div>
  );
};

export default Filtros;
