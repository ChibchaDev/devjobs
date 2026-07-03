import styles from './Header.module.css'
import { Link } from './Link'

export function Header() {
  return (
    <header className={styles.headerPage}>
      <h1>DevJobs</h1>
      <nav>
          <Link href="/">Home</Link>
          <Link href="/search">Jobs</Link>
          <Link href="/profile">Perfil</Link>
      </nav>
    </header>
  )
}