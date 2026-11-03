import { Link } from 'react-router'

const Menu = () => {
  return (
    <header className="menu">
      <Link to="/juegos" className="menu__logo">Estim</Link>
      <nav className="menu__nav">
        <Link to="/juegos" className="menu__link">Tienda</Link>
        <Link to="/biblioteca" className="menu__link">Mi biblioteca</Link>
      </nav>
    </header>
  )
}

export default Menu
