import { useEffect, useState } from 'react'
import { Pagination } from '../components/Pagination.jsx'
import { SearchFormSection } from '../components/SearchFormSection.jsx'
import { JobListings } from '../components/JobListings.jsx'
import jobsData from '../data.json'
import { useRouter } from '../hooks/useRouter.jsx'

const RESULTS_PER_PAGE = 5;

const useFilters = () => {
  const [filters, setFilters] = useState(() =>{
    const params = new URLSearchParams(window.location.search)
    return{
      technology: params.get('technology') || '',
      location: params.get('type') || '',
      experienceLevel: params.get('level') || ''
    }
  })

  const [textToFilter, setTextToFilter] = useState(() =>{
    const params = new URLSearchParams(window.location.search)
    return params.get('text') || ''
  })
  const [currentPage, setCurrentPage] = useState(() =>{
    const params = new URLSearchParams(window.location.search)
    const page = Number(params.get('page'))
    return Number.isNaN(page) ? page : 1
  });

  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const { navigateTo } = useRouter()

  useEffect(() =>{
    async function fetchJobs() {
      try {
        setLoading(true)

        const params = new URLSearchParams()
        if (textToFilter) params.append('text', textToFilter)
        if (filters.technology) params.append('technology', filters.technology)
        if (filters.location) params.append('type', filters.location)
        if (filters.experienceLevel) params.append('level', filters.experienceLevel)

        const offset = (currentPage - 1) * RESULTS_PER_PAGE
        params.append('limit', RESULTS_PER_PAGE)
        params.append('offset', offset)

        const queryParams = params.toString()

        const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
        const json = await response.json()

        setJobs(json.data)
        setTotal(json.total)
      } catch (error) {
        console.error('Error fetching jobs: ', error)
      }finally{
        setLoading(false)
      }
    }

    fetchJobs()
  }, [filters, textToFilter, currentPage])

  useEffect(() =>{
    const params = new URLSearchParams()

    if (textToFilter) params.append('text', textToFilter)
    if (filters.technology) params.append('technology', filters.technology)
    if (filters.location) params.append('type', filters.location)
    if (filters.experienceLevel) params.append('level', filters.experienceLevel)
    
    if (currentPage > 1) params.append('page', currentPage)
    
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname
    
    navigateTo(newUrl)
    
  }, [filters, textToFilter, currentPage, navigateTo])

  const totalPages = Math.ceil(total / RESULTS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (filters) => {
    setFilters(filters)
    setCurrentPage(1)
  }

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter)
    setCurrentPage(1)
  }

  return{
    jobs,
    loading,
    total,
    textToFilter,
    totalPages,
    currentPage,
    handlePageChange,
    handleSearch,
    handleTextFilter
  }
}

export function SearchPage() {
  const {
    jobs,
    loading,
    total,
    textToFilter,
    totalPages,
    currentPage,
    handlePageChange,
    handleSearch,
    handleTextFilter
  } = useFilters()

  useEffect(() => {
    document.title = `Resultados: ${total}, Pagina: ${currentPage} - Devjobs` 
  }, [jobs, currentPage]) 

  const title = loading 
  ? `Cargando... - DevJobs` 
  : `Resultados ${total}, Pagina ${currentPage} - DevJobs`
  
  return (

      <main>
        <title>{title}</title>
        <meta name='description' content='Explora todas las oportunidades laborales'/>

        <SearchFormSection 
          initialText={textToFilter} 
          onSearch={handleSearch} 
          onTextFilter={handleTextFilter} 
        />

        <section>
          {
            loading ? <p>Cargando empleos</p> : <JobListings jobs={jobs} />
          }
          
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </section>

      </main>
      
  )
}

