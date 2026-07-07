import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router"
import { Link } from "../components/Link"
import { NavLink } from "react-router"
import styles from "./Detail.module.css"
import snarkdown from 'snarkdown'
import { useAuth } from "../context/AuthContext"

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
    </>
    )
}

function DetailApplyButton () {
    const { isLoggedIn } = useAuth()

    return (
        <button disabled={!isLoggedIn} className={styles.applyButton}>
            {isLoggedIn ? "Aplicar ahora" : "Inicia sesión para aplicar"}
        </button>
    )
}

export default function JobDetail({ isLoggedIn }){
    const { jobId } = useParams()

    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() =>{
        fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`)
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