import styles from './Header.module.css'
import { NavLink } from 'react-router'
import { useAuth } from '../context/AuthContext.jsx'
import { Link } from './Link.jsx'
import { useAuthStore } from '../store/authStore.js'
import { useFavoritesStore } from '../store/favoritesStore.js'

const heartIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
  </svg>
);

export function Header() {
  const { isLoggedIn } = useAuthStore()
  const { countFavorites } = useFavoritesStore()

  const numberOfFavorites = countFavorites()
  
  return (
    <header className={styles.headerPage}>
      <h1>DevJobs</h1>
      <nav className={styles.navHeader}>
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
          {
            isLoggedIn && (
              <NavLink 
                to="/profile"
                className={({isActive}) => isActive ? 'navLinkActive': ''}
              >
                Profile {heartIcon}{numberOfFavorites}
              </NavLink>
            )
          }
          
      </nav>
      <HeaderUserButton />
      
    </header>
  )
}

const HeaderUserButton = () => {
  const { isLoggedIn, login, logout } = useAuthStore()
  const { clearFavorites } = useFavoritesStore()

  const handleLogout = () => {
    logout()
    clearFavorites()
  }

  return isLoggedIn
    ? <button onClick={handleLogout}>Cerrar Sesión</button>
    : <button onClick={login}>Iniciar Sesión</button>
      
}