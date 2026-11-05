import Juego from "./Juego"

const ListaJuegos = ({ juegos, juegosComprados, limiteAlcanzado, comprar }) => {
  return (
    <div className="lista-juegos">
      {juegos.map(juego => (
        <Juego
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
