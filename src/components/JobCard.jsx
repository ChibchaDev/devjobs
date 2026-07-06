import styles from './JobCard.module.css';
import { useState } from 'react';
import { Link } from "./Link"
import { NavLink } from 'react-router';


export function JobCard ({ job }) {
  const [isApplied, setIsApplied] = useState(false);

  const handleApplyClick = () => {
    setIsApplied(true);
  }

  const buttonClasses = isApplied ? `${styles.buttonApplyJob} ${styles.isApplied}` : styles.buttonApplyJob;
  const buttonText = isApplied ? 'Applied' : 'Apply Now';

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
        <button type="button" className={buttonClasses} onClick={handleApplyClick}>
          {buttonText}
        </button>
      </div>
    </article>
  );
}