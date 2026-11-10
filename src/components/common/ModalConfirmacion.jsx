import { useState } from 'react';
import Boton from './Boton';

const ModalConfirmacion = ({ titulo, mensaje, textoConfirmar = 'Confirmar', varianteConfirmar = 'peligro', confirmar, cancelar }) => {
  const [procesando, setProcesando] = useState(false);

  const aceptar = async () => {
    setProcesando(true);
    await confirmar();
    setProcesando(false);
  };

  return (
    <div className="modal">
      <div className="modal__contenido">
        <h3>{titulo}</h3>
        <p className="modal__mensaje">{mensaje}</p>
        <div className="modal__acciones">
          <Boton variante={varianteConfirmar} onClick={aceptar} disabled={procesando}>
            {procesando ? 'Procesando...' : textoConfirmar}
          </Boton>
          <Boton variante="secundario" onClick={cancelar} disabled={procesando}>Cancelar</Boton>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
