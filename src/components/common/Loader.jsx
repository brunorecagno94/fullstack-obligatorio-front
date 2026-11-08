const Loader = ({ texto = 'Cargando...' }) => {
  return (
    <div className="loader">
      <div className="loader__spinner"></div>
      <p>{texto}</p>
    </div>
  )
}

export default Loader