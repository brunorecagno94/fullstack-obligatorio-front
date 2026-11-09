const Boton = ({ children, variante = 'principal', type = 'button', ...props }) => {
  return (
    <button type={type} className={`btn btn-${variante}`} {...props}>
      {children}
    </button>
  );
};

export default Boton;
