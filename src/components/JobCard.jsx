import styles from './JobCard.module.css';
import React, { useState } from 'react';

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
            <h3>{job.titulo}</h3>
            <small>{job.empresa} | {job.ubicacion}</small>
            <p>{job.descripcion}</p>
        </div>
      <button type="button" className={buttonClasses} onClick={handleApplyClick}>
        {buttonText}
      </button>
    </article>
  );
}