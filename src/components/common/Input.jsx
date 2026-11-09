import { useId } from 'react';

const Input = ({ label, error, ...props }) => {
  const inputId = useId();

  return (
    <div className="form__group">
      <label htmlFor={inputId}>{label}</label>
      <input id={inputId} {...props} />
      {error && <span className="mensaje-error">{error}</span>}
    </div>
  );
};

export default Input;
