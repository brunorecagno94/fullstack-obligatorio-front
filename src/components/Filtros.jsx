import { useState } from "react";
import Input from "./common/Input";
import Select from "./common/Select";
import Boton from "./common/Boton";

const Filtros = ({ categorias, aplicarFiltros }) => {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");

  const hayCriterio = nombre.trim() !== "" || categoria !== "" || precioMin !== "" || precioMax !== "";
  const precioNoPositivo = (precioMin !== "" && Number(precioMin) <= 0) || (precioMax !== "" && Number(precioMax) <= 0);
  const rangoInvalido = precioMin !== "" && precioMax !== "" && Number(precioMin) > Number(precioMax);

  let error = "";
  if (precioNoPositivo) error = "Los precios deben ser mayores a 0";
  else if (rangoInvalido) error = "El precio mínimo no puede ser mayor al máximo";

  const opcionesCategorias = categorias.map(categoria => ({
    valor: categoria._id,
    texto: categoria.nombreCategoria
  }));

  const filtrar = () => {
    const filtros = {};

    if (nombre.trim() !== "") filtros.nombre = nombre.trim();
    if (categoria !== "") filtros.categoria = categoria;
    if (precioMin !== "") filtros.precioMin = Number(precioMin);
    if (precioMax !== "") filtros.precioMax = Number(precioMax);

    aplicarFiltros(filtros);
  }

  const limpiar = () => {
    setNombre("");
    setCategoria("");
    setPrecioMin("");
    setPrecioMax("");
    aplicarFiltros({});
  }

  return (
    <div className="filtros">
      <form className="filtros__form">
        <Input
          label="Nombre:"
          type="text"
          id="filtroNombre"
          placeholder="Buscar juego..."
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />

        <Select
          label="Categoría:"
          id="filtroCategoria"
          placeholder="Todas"
          opciones={opcionesCategorias}
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
        />

        <Input
          label="Precio mínimo:"
          type="number"
          id="filtroPrecioMin"
          min="1"
          value={precioMin}
          onChange={e => setPrecioMin(e.target.value)}
        />

        <Input
          label="Precio máximo:"
          type="number"
          id="filtroPrecioMax"
          min="1"
          value={precioMax}
          onChange={e => setPrecioMax(e.target.value)}
        />

        <Boton onClick={filtrar} disabled={!hayCriterio || error !== ""}>
          Filtrar
        </Boton>
        <Boton variante="secundario" onClick={limpiar} disabled={!hayCriterio || error !== ""}>
          Limpiar
        </Boton>
      </form>
      {error !== "" && <p className="filtros__error">{error}</p>}
    </div>
  )
}

export default Filtros
