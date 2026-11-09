import { useState } from 'react'
import Boton from '../common/Boton'
import InfoJuego from './InfoJuego'

const JuegoUsuario = ({ _id, nombreJuego, descripcionJuego, precioJuego, monedaJuego, categorias, imagenJuego, comprado, limiteAlcanzado, comprar, monedaUsuario, convertirPrecio }) => {
  const [precioConvertido, setPrecioConvertido] = useState(null)
  const [convirtiendo, setConvirtiendo] = useState(false)
  const [comprando, setComprando] = useState(false)
  
  const manejarCompra = async () => {
    setComprando(true)
    await comprar(_id)
    setComprando(false)
  }

  let textoCompra = 'Comprar'
  if (limiteAlcanzado) textoCompra = 'Límite alcanzado'
  if (comprando) textoCompra = 'Comprando...'

  const verPrecio = async () => {
    setConvirtiendo(true)
    const precio = await convertirPrecio(_id)
    setPrecioConvertido(precio)
    setConvirtiendo(false)
  }

  return (
    <div className="juego">
      <InfoJuego
        nombreJuego={nombreJuego}
        descripcionJuego={descripcionJuego}
        categorias={categorias}
        imagenJuego={imagenJuego}
      />
      <div className="juego__acciones">
        {comprado
          ? <span className="juego__comprado">En tu biblioteca</span>
          : <Boton onClick={manejarCompra} disabled={limiteAlcanzado || comprando}>
              <span className="juego__comprar">
                <span>{textoCompra}</span>
                <span className="juego__comprar-precio">{monedaJuego} {precioJuego}</span>
              </span>
            </Boton>}
      </div>
      {!comprado && monedaJuego !== monedaUsuario && (
        <div className="juego__conversion">
          {precioConvertido !== null
            ? <span>≈ {monedaUsuario} {precioConvertido.toLocaleString('es-UY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            : <Boton variante="enlace" onClick={verPrecio} disabled={convirtiendo}>
                {convirtiendo ? 'Convirtiendo...' : `Ver precio en ${monedaUsuario}`}
              </Boton>}
        </div>
      )}
    </div>
  )
}

export default JuegoUsuario
