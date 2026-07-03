import styles from './JobListings.module.css'

import { JobCard } from './JobCard.jsx'

export function JobListings({jobs}) {
  return (
    <>
        <h2>Job Listings</h2>
        <div className={styles.jobListings}>
          {jobs.map(job => (
            <JobCard 
              key={job.id}
              job={job}
            />
          ))}
        </div>
    </>
  )
}

/*<article>
            <div>
            <h3>Frontend Developer</h3>
            <small>Company A | Remote</small>
            <p>Looking for a skilled Frontend Developer to join our team. Must have experience with React and JavaScript.</p>
            </div>
            <button type="button">Apply Now</button>
          </article>
          <article>
            <h3>Backend Developer</h3>
            <small>Company B | On-site</small>              
            <p>Looking for a skilled Backend Developer to join our team. Must have experience with Node.js and Python.</p>
            <button type="button">Apply Now</button>
          </article>
          <article>
            <h3>UI/UX Designer</h3>
            <small>Company C | Remote</small>
            <p>Looking for a skilled UI/UX Designer to join our team. Must have experience with Figma and Adobe XD.</p>
            <button type="button">Apply Now</button>
          </article>*/