import Joi from 'joi';

export const crearJuegoSchema = Joi.object({
  nombreJuego: Joi.string().trim().max(50).required().messages({
    'any.required': 'El nombre del juego es obligatorio',
    'string.empty': 'El nombre del juego no puede estar vacío',
    'string.max': 'El nombre del juego no puede superar los {#limit} caracteres',
  }),
  descripcionJuego: Joi.string().trim().max(200).required().messages({
    'any.required': 'La descripción del juego es obligatoria',
    'string.empty': 'La descripción del juego no puede estar vacía',
    'string.max': 'La descripción del juego no puede superar los {#limit} caracteres',
  }),
  precioJuego: Joi.number().positive().required().messages({
    'any.required': 'El precio del juego es obligatorio',
    'number.base': 'El precio del juego debe ser un número',
    'number.positive': 'El precio del juego debe ser un número positivo',
  }),
  monedaJuego: Joi.string().length(3).uppercase().required().messages({
    'any.required': 'La moneda es obligatoria',
    'string.empty': 'Elegí una moneda',
    'string.length': 'La moneda debe ser un código de 3 letras (ej: UYU, USD, EUR)',
  }),
  edadMinima: Joi.number().integer().min(0).max(18).required().messages({
    'any.required': 'La edad mínima es obligatoria',
    'number.base': 'La edad mínima debe ser un número',
    'number.integer': 'La edad mínima debe ser un número entero',
    'number.min': 'La edad mínima no puede ser negativa',
    'number.max': 'La edad mínima no puede ser mayor a 18',
  }),
  categorias: Joi.array().items(
    Joi.string().hex().length(24).messages({
      'string.hex': 'Cada categoría debe ser un ObjectId válido',
      'string.length': 'Cada categoría debe tener 24 caracteres',
    })
  ).min(1).required().messages({
    'array.base': 'El juego debe tener al menos una categoría',
    'array.min': 'El juego debe tener al menos una categoría',
    'any.required': 'Las categorías son obligatorias',
  }),
  imagenJuego: Joi.any(),
});
