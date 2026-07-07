import styles from './Header.module.css'
import { NavLink } from 'react-router'
import { useAuth } from '../context/AuthContext.jsx'
import { Link } from './Link.jsx'

export function Header() {

  return (
    <header className={styles.headerPage}>
      <h1>DevJobs</h1>
      <nav>
          <NavLink 
            to="/"
            className={({isActive}) => isActive ? 'navLinkActive': ''}
          >
            Home
          </NavLink>

          <NavLink 
            to="/search"
            className={({isActive}) => isActive ? 'navLinkActive': ''}
          >
            Jobs
          </NavLink>

          <NavLink 
            to="/profile"
            className={({isActive}) => isActive ? 'navLinkActive': ''}
          >
            Perfil
          </NavLink>
      </nav>
      <HeaderUserButton />
      
    </header>
  )
}

const HeaderUserButton = () => {
  const { isLoggedIn, login, logout } = useAuth()

  return isLoggedIn
    ? <button onClick={logout}>Cerrar Sesión</button>
    : <button onClick={login}>Iniciar Sesión</button>
      
}