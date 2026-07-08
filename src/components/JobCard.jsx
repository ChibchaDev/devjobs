import styles from './JobCard.module.css';
import { useState } from 'react';
import { Link } from "./Link"
import { NavLink } from 'react-router';
import { useFavoritesStore } from '../store/favoritesStore.js';
import { useAuthStore } from '../store/authStore.js';

function JobCardFavoriteButton ({jobId}) {
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
    <button disabled={!isLoggedIn} onClick={() => toggleFavorite(jobId)}>
      {isFavorite(jobId) ? <HeartIcon /> : '🤍' }
    </button> 
  )
}

function JobCardApplyButton ({jobId}){
  const [isApplied, setIsApplied] = useState(false);
  const { isLoggedIn } = useAuthStore()

  const handleApplyClick = () => {
    setIsApplied(true);
  }

  const buttonClasses = isApplied ? `${styles.buttonApplyJob} ${styles.isApplied}` : styles.buttonApplyJob;
  const buttonText = isApplied ? 'Applied' : 'Apply Now';
  return(
    <button disabled={!isLoggedIn} type="button" className={buttonClasses} onClick={handleApplyClick}>
      {buttonText}
    </button>
  )
}

export function JobCard ({ job }) {
  

  return (
    <article 
        className={styles.jobCard}
        data-modalidad={job.data.modalidad}
        data-nivel={job.data.nivel}
        data-technology={job.data.techhnology} 
        >
        <div>
            <h3>
              <NavLink className={styles.titleLink}  to={`/jobs/${job.id}`}>
                {job.titulo}
              </NavLink>
            </h3>
            <small>{job.empresa} | {job.ubicacion}</small>
            <p>{job.descripcion}</p>
        </div>
      <div className={styles.linksNav}>
        <NavLink className={styles.details} to={`/jobs/${job.id}`}>
          Ver detalles
        </NavLink>
        <JobCardApplyButton jobId={job.id} />
        <JobCardFavoriteButton jobId={job.id} />
      </div>
    </article>
  );
}