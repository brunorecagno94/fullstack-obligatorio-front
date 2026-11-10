import { useEffect, useId, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { crearJuegoSchema } from '../../validators/juegos.validators';
import Input from '../common/Input';
import Select from '../common/Select';
import Boton from '../common/Boton';

const opcionesMoneda = [
  { valor: 'UYU', texto: 'Pesos uruguayos (UYU)' },
  { valor: 'USD', texto: 'Dólares (USD)' },
  { valor: 'EUR', texto: 'Euros (EUR)' }
];

const FormularioJuego = ({ valoresIniciales, categorias, guardar, textoBoton, imagenActual, generarDescripcion }) => {
  const [generando, setGenerando] = useState(false);
  const descripcionId = useId();
  const imagenId = useId();
  const { register, handleSubmit, setValue, control, formState: { errors, isValid, isSubmitting } } =
    useForm({ resolver: joiResolver(crearJuegoSchema), mode: 'onChange', defaultValues: valoresIniciales });

  const archivo = useWatch({ control, name: 'imagenJuego' })?.[0];

  const vistaPrevia = useMemo(() => (archivo ? URL.createObjectURL(archivo) : null), [archivo]);

  useEffect(() => {
    return () => {
      if (vistaPrevia) URL.revokeObjectURL(vistaPrevia);
    };
  }, [vistaPrevia]);

  const imagenMostrada = vistaPrevia || imagenActual;

  const completarConIA = async () => {
    setGenerando(true);
    const texto = await generarDescripcion();
    if (texto) {
      setValue('descripcionJuego', texto.slice(0, 200), { shouldValidate: true });
    }
    setGenerando(false);
  };

  return (
    <form className="formulario-juego" onSubmit={handleSubmit(guardar)}>
      <Input
        label="Nombre:"
        type="text"
        {...register('nombreJuego')}
        error={errors.nombreJuego?.message}
      />

      <div className="form__group">
        <label htmlFor={descripcionId}>Descripción:</label>
        <textarea id={descripcionId} rows="4" {...register('descripcionJuego')} />
        {errors.descripcionJuego && <span className="mensaje-error">{errors.descripcionJuego.message}</span>}

        {generarDescripcion && (
          <Boton variante="secundario" onClick={completarConIA} disabled={generando}>
            {generando ? 'Generando...' : '✨ Generar descripción con IA'}
          </Boton>
        )}
      </div>

      <Input
        label="Precio:"
        type="number"
        step="any"
        {...register('precioJuego')}
        error={errors.precioJuego?.message}
      />

      <Select
        label="Moneda:"
        placeholder="Elegí una moneda"
        opciones={opcionesMoneda}
        {...register('monedaJuego')}
        error={errors.monedaJuego?.message}
      />

      <Input
        label="Edad mínima:"
        type="number"
        {...register('edadMinima')}
        error={errors.edadMinima?.message}
      />

      <fieldset className="form__group">
        <legend>Categorías:</legend>
        {categorias.map(categoria => (
          <label key={categoria._id} className="formulario-juego__categoria">
            <input type="checkbox" value={categoria._id} {...register('categorias')} />
            {categoria.nombreCategoria}
          </label>
        ))}
        {errors.categorias && <span className="mensaje-error">{errors.categorias.message}</span>}
      </fieldset>

      <div className="form__group formulario-juego__imagen-seccion">
        <span className="formulario-juego__etiqueta">Imagen:</span>

        <div className="formulario-juego__vista-previa">
          {imagenMostrada
            ? <img src={imagenMostrada} alt="Vista previa de la imagen del juego" />
            : <span className="formulario-juego__sin-imagen">Sin imagen</span>}
          {vistaPrevia && <span className="formulario-juego__insignia">Nueva</span>}
        </div>

        <input
          id={imagenId}
          type="file"
          accept="image/*"
          className="formulario-juego__archivo"
          {...register('imagenJuego')}
        />
        <div className="formulario-juego__archivo-fila">
          <label htmlFor={imagenId} className="btn btn-secundario">
            {imagenMostrada ? 'Cambiar imagen' : 'Elegir imagen'}
          </label>
          <span className="formulario-juego__archivo-nombre">
            {archivo ? archivo.name : 'Ningún archivo seleccionado'}
          </span>
        </div>
      </div>

      <Boton type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? 'Guardando...' : textoBoton}
      </Boton>
    </form>
  );
};

export default FormularioJuego;