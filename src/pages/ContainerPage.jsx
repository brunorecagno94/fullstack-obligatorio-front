import { Outlet } from 'react-router'
import Menu from '../components/layout/Menu'
import Footer from '../components/layout/Footer'

const ContainerPage = () => {
  return (
    <>
      <Menu />
      <main className="contenido">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default ContainerPage
