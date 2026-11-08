import JuegoUsuario from "./JuegoUsuario"

const ListaJuegos = ({ juegos, juegosComprados, limiteAlcanzado, comprar, monedaUsuario, convertirPrecio }) => {
  return (
    <div className="lista-juegos">
      {juegos.map(juego => (
        <JuegoUsuario
          key={juego._id}
          {...juego}
          comprado={juegosComprados.includes(juego._id)}
          limiteAlcanzado={limiteAlcanzado}
          comprar={comprar}
          monedaUsuario={monedaUsuario}
          convertirPrecio={convertirPrecio}
        />
      ))}
    </div>
  )
}

export default ListaJuegos
