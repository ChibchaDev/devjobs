import styles from './Header.module.css'
import { NavLink } from 'react-router'
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
    </header>
  )
}