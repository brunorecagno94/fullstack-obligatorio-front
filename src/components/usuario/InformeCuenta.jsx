const LIMITE_PLUS = 4

const InformeCuenta = ({ plan, cantidad }) => {
  if (plan === 'premium') {
    return (
      <section className="panel-perfil informe-uso">
        <h3>Informe de uso</h3>
        <div className="informe-uso__estadistica">
          <span className="informe-uso__numero">{cantidad}</span>
          <span className="informe-uso__etiqueta">
            {cantidad === 1 ? 'juego comprado' : 'juegos comprados'}
          </span>
        </div>
        <span className="informe-uso__sin-limite">∞ Sin límite de compras</span>
      </section>
    )
  }

  const porcentaje = Math.round((cantidad / LIMITE_PLUS) * 100)
  const restantes = LIMITE_PLUS - cantidad

  let nivel = 'normal'
  if (cantidad >= LIMITE_PLUS) nivel = 'lleno'
  else if (cantidad >= LIMITE_PLUS - 1) nivel = 'alerta'

  let mensaje = `Te quedan ${restantes} compras`
  if (restantes === 1) mensaje = 'Te queda 1 compra'
  if (restantes <= 0) mensaje = 'Llegaste al límite de tu plan'

  return (
    <section className="panel-perfil informe-uso">
      <h3>Informe de uso</h3>
      <p className="informe-uso__resumen">
        Usaste <strong>{cantidad} de {LIMITE_PLUS}</strong> compras ({porcentaje}%)
      </p>
      <div
        className="barra-uso"
        role="progressbar"
        aria-valuenow={cantidad}
        aria-valuemin={0}
        aria-valuemax={LIMITE_PLUS}
      >
        <div className={`barra-uso__relleno barra-uso__relleno--${nivel}`} style={{ width: `${porcentaje}%` }} />
      </div>
      <p className={`informe-uso__mensaje informe-uso__mensaje--${nivel}`}>{mensaje}</p>
    </section>
  )
}

export default InformeCuenta
