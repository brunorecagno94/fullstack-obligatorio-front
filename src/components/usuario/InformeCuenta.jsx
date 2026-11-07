const InformeCuenta = ({ plan, cantidad }) => {
  if (plan === 'premium') {
    return (
      <div className="informe-uso">
        <h3>Informe de uso</h3>
        <p>Compraste {cantidad} {cantidad === 1 ? 'juego' : 'juegos'}</p>
      </div>
    )
  }

  const porcentaje = Math.round((cantidad / 4) * 100)
  return (
    <div className="informe-uso">
      <h3>Informe de uso</h3>
      <p>Usaste {cantidad} de 4 compras ({porcentaje}%)</p>
      <progress value={cantidad} max={4} />
    </div>
  )
}

export default InformeCuenta