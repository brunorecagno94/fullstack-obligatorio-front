export const tokenVencido = (token) => {
  const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
  const { exp } = JSON.parse(atob(payload))
  return exp * 1000 < Date.now()
}