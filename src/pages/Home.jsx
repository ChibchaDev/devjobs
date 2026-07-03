
import { Header } from '../components/Header.jsx'
import { Footer } from '../components/Footer.jsx'
import { useState } from 'react'
import '../index.css'
import { useRouter } from '../hooks/useRouter.jsx'

export function HomePage() {
  const { navigateTo } = useRouter()

  const handleSearch = (e) => {
    event.preventDefault()
    const formData = new FormData(e.target)
    const searchTerm = formData.get('search')

    const url = searchTerm
      ?`/search?text=${encodeURIComponent(searchTerm)}`
      : '/search'

      navigateTo(url)
  }

  return (
    <main>
      <section className="heroSection">
        <h1>Encuentra tu proximo trabajo</h1>
        <p>Únete a las mejores empresas tecnológicas.
          Miles de ofertas de trabajo remoto y presencial 
          para ingenieros de software, diseñadores y 
          product managers.</p>

          <form role="search" className='formSearch' onSubmit={handleSearch} >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>

          <input name="search" type="text" placeholder="Job title or keyword" />

          <button type="submit">Search</button>
        </form>
      </section>

      <section className="informationSection">
        <header>
          <h2>Job Listings</h2>
        </header>

        <footer>
          <article>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-briefcase"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9" /><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" /><path d="M12 12l0 .01" /><path d="M3 13a20 20 0 0 0 18 0" /></svg>
            <h3>Frontend Developer</h3>
            <p>Company A - Remote</p>
          </article>
          <article>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-users"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>
            <h3>Backend Developer</h3>
            <p>Company B - On-site</p>
          </article>
          <article>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-building-skyscraper"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 21l18 0" /><path d="M5 21v-14l8 -4v18" /><path d="M19 21v-10l-6 -4" /><path d="M9 9l0 .01" /><path d="M9 12l0 .01" /><path d="M9 15l0 .01" /><path d="M9 18l0 .01" /></svg>
            <h3>UI/UX Designer</h3>
            <p>Company C - Remote</p>
          </article>
        </footer>
        
      </section>

    </main>
    
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
        
        <Home />
      
      <Footer />
    </>
  )
}

export default App