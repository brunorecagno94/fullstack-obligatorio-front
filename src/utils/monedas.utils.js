// Moneda de cada país, con el nombre tal cual aparece en el select del registro.
// Si el usuario no eligió país, o su país no está en la lista, se usan dólares.
const monedasPorPais = {
  'Uruguay': 'UYU',
  'Argentina': 'ARS',
  'Brasil': 'BRL',
  'Chile': 'CLP',
  'Paraguay': 'PYG',
  'Bolivia': 'BOB',
  'Perú': 'PEN',
  'Colombia': 'COP',
  'México': 'MXN',
  'Costa Rica': 'CRC',
  'Guatemala': 'GTQ',
  'República Dominicana': 'DOP',
  'Canadá': 'CAD',
  'España': 'EUR',
  'Portugal': 'EUR',
  'Francia': 'EUR',
  'Alemania': 'EUR',
  'Italia': 'EUR',
  'Reino Unido': 'GBP',
  'Japón': 'JPY',
  'China': 'CNY'
}

export const obtenerMoneda = (pais) => monedasPorPais[pais] || 'USD'
