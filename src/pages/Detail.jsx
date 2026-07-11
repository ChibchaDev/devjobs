import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router"
import { Link } from "../components/Link"
import { NavLink } from "react-router"
import styles from "./Detail.module.css"
import snarkdown from 'snarkdown'
import { useAuth } from "../context/AuthContext.jsx"
import { useAuthStore } from "../store/authStore.js"
import { useFavoritesStore } from "../store/favoritesStore.js"

function JobSection({title, content}){
    const html = snarkdown(content)
    return(
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
                {title}
            </h2>
            <div 
                className={`${styles.sectionContent} prose`}
                dangerouslySetInnerHTML={{
                    __html: html
                }}
            />
            
        </section>
    )
}

function DetailPageBreadCrumb ({ job }) {
    return (
        <div className={styles.container}>
            <nav className={styles.breadcrumb}>
                <NavLink 
                    to="/search"
                    className={styles.breadcrumbButton}
                >
                    Empleos
                </NavLink>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbCurrent}>{job.titulo}</span>
            </nav>
        </div>
    )
}

function DetailPageHeader ({ job, isLoggedIn }) {
    return(
    <>
    <header className={styles.header}>
        <h1 className={styles.title}>
            {job.titulo}
        </h1>
        <p className={styles.meta}>
            {job.empresa} - {job.ubicacion}
        </p>
    </header>

    <DetailApplyButton isLoggedIn={ isLoggedIn }/>
    <DetailFavoriteButton jobId ={job.id} />
    </>
    )
}

function DetailApplyButton () {
    const { isLoggedIn } = useAuthStore()

    return (
        <button disabled={!isLoggedIn} className={styles.applyButton}>
            {isLoggedIn ? "Aplicar ahora" : "Inicia sesión para aplicar"}
        </button>
    )
}

function DetailFavoriteButton ({jobId}){
    const { toggleFavorite, isFavorite } = useFavoritesStore()
    const { isLoggedIn } = useAuthStore()
    
      const HeartIcon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill={isFavorite(jobId) ? 'red' : 'none'}
        stroke="red"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-heart"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
      </svg>
      );
    
      return(
        <button disabled={!isLoggedIn}  onClick={() => toggleFavorite(jobId)}>
          {isFavorite(jobId) ? <HeartIcon /> : '🤍' }
        </button> 
      )
}

export default function JobDetail({ isLoggedIn }){
    const { jobId } = useParams()

    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() =>{
        fetch(`https://api-jobs-five.vercel.app/jobs/${jobId}`)
            .then(response =>{
                if (!response.ok) throw new Error('Job Not Found')
                return response.json()
            })
            .then(json =>{
                setJob(json)
            })
            .catch(err =>{
                setError(err.message)
            })
            .finally(() =>{
                setLoading(false)
            })
    }, [jobId])

    if (loading){
        return <div>
            <div className={styles.loading}>
                <p className={styles.loadingText}>Cargando...</p>
            </div>
        </div>
    }

    if (error || !job) {
        return <div>
            <div className={styles.error} >
                <h2 className={styles.errorTitle}>
                    Oferta no encontrada
                </h2>
                <button 
                    onClick={()=> Navigate('/')}
                    className={styles.errorButton}
                >
                    Volver al inicio
                </button>
            </div>
        </div>
    }
    
    return(
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
            <DetailPageBreadCrumb job= { job } />
            <DetailPageHeader job={job} isLoggedIn={isLoggedIn} />

            <JobSection title="Descripcion del puesto" content={job.content.description}/>
            <JobSection title="Responsabilidades" content={job.content.responsibilities}/>
            <JobSection title="Requisitos" content={job.content.requirements}/>
            <JobSection title="Acerca de la empresa" content={job.content.about}/>
        </div>
    )
}