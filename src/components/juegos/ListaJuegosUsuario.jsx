import JuegoUsuario from "./JuegoUsuario"

const ListaJuegos = ({ juegos, juegosComprados, limiteAlcanzado, comprar }) => {
  return (
    <div className="lista-juegos">
      {juegos.map(juego => (
        <JuegoUsuario
          key={juego._id}
          {...juego}
          comprado={juegosComprados.includes(juego._id)}
          limiteAlcanzado={limiteAlcanzado}
          comprar={comprar}
        />
      ))}
    </div>
  )
}

export default ListaJuegos
