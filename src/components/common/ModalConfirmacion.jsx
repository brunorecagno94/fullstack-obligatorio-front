import { useState } from 'react'
import Boton from './Boton'

const ModalConfirmacion = ({ titulo, mensaje, textoConfirmar = 'Confirmar', varianteConfirmar = 'peligro', confirmar, cancelar }) => {
  const [procesando, setProcesando] = useState(false)

  const aceptar = async () => {
    setProcesando(true)
    await confirmar()
    setProcesando(false)
  }

  return (
    <div className="modal" onClick={procesando ? undefined : cancelar}>
      <div
        className="modal__contenido"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-confirmacion-titulo"
        onClick={e => e.stopPropagation()}
      >
        <h3 id="modal-confirmacion-titulo">{titulo}</h3>
        <p className="modal__mensaje">{mensaje}</p>
        <div className="modal__acciones">
          <Boton variante={varianteConfirmar} onClick={aceptar} disabled={procesando}>
            {procesando ? 'Procesando...' : textoConfirmar}
          </Boton>
          <Boton variante="secundario" onClick={cancelar} disabled={procesando}>Cancelar</Boton>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirmacion
