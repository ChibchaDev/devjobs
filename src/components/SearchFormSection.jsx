import { useId, useState } from "react"
import styles from './SearchFormSection.module.css'

const useSearchForm = ({ idTechnology, idLocation, idExperienceLevel, onSearch, onTextFilter }) => {
  const [searchText, setSearchText] = useState("")
  const handleSubmit =(e) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)

    const filters = {
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experienceLevel: formData.get(idExperienceLevel)
    }

    onSearch(filters)
  }

  const handleTextChange = (e) => {
    const text = e.target.value
    setSearchText(text)
    onTextFilter(text)
  }

  return {
    searchText,
    handleSubmit,
    handleTextChange
  }
}

export function SearchFormSection({ onSearch, onTextFilter }) {
  const idText = useId()
  const idLocation = useId()
  const idTechnology = useId()
  const idExperienceLevel = useId()

  const { 
    searchText, 
    handleSubmit, 
    handleTextChange 
  } = useSearchForm({ idTechnology, idLocation, idExperienceLevel, onSearch, onTextFilter })

  return (
    <section className={styles.searchSection}>
        <h1>Encuentra tu proximo trabajo</h1>
        <form onChange={handleSubmit} role="search">
          <div className={styles.searchInputContainer}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
          <input 
            type="text" 
            name ={idText} 
            placeholder="Job title or keyword"
            onChange={handleTextChange}
          />
          <button type="submit">Search</button>
          </div>

          <div className={styles.searchFilters}>
            <select name={idLocation} id="filterlocation">
              <option value="">Location</option>
              <option value="remoto">Remote</option>
              <option value="cdmx">Ciudad de Mexico</option>
              <option value="guadalajara">Guadalajara</option>
              <option value="monterrey">Monterrey</option>
              <option value="barcelona">Barcelona</option>
            </select>

            <select name={idTechnology} id="filterTechnology">
              <option value="">Technology</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="react">React</option>
            </select>

            <select name={idExperienceLevel} id="filterExperienceLevel">
              <option value="">Experience Level</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid-level</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead</option>
            </select>
          </div>
        </form>
      </section>
  )
}