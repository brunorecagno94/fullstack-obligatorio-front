const Select = ({ label, error, id, opciones = [], placeholder, ...props }) => {
  const selectId = id || props.name;

  return (
    <div className="form__group">
      <label htmlFor={selectId}>{label}</label>
      <select id={selectId} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {opciones.map((opcion) => (
          <option key={opcion.valor} value={opcion.valor}>
            {opcion.texto}
          </option>
        ))}
      </select>
      {error && <span className="mensaje-error">{error}</span>}
    </div>
  );
};

export default Select;
