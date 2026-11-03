const Alerta = ({ mensaje, tipo = "error" }) => {
  if (!mensaje) return null;

  return (
    <div className={`alerta alerta-${tipo}`} role="alert">
      {mensaje}
    </div>
  );
};

export default Alerta;
