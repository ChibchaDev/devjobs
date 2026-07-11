import { useEffect, useState } from 'react'
import { Pagination } from '../components/Pagination.jsx'
import { SearchFormSection } from '../components/SearchFormSection.jsx'
import { useSearchParams } from 'react-router'
import { JobListings } from '../components/JobListings.jsx'
import { useRouter } from '../hooks/useRouter.jsx'

const RESULTS_PER_PAGE = 5;

const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [filters, setFilters] = useState(() =>{
    return{
      technology: searchParams.get('technology') || '',
      location: searchParams.get('type') || '',
      experienceLevel: searchParams.get('level') || ''
    }
  })

  

  const [textToFilter, setTextToFilter] = useState(() => searchParams.get('text') || '')
  const [currentPage, setCurrentPage] = useState(() =>{
    const searchParams = new URLSearchParams(window.location.search)
    const page = Number(searchParams.get('page'))
    return Number.isNaN(page) ? page : 1
  })

  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() =>{
    async function fetchJobs() {
      try {
        setLoading(true)

        const searchParams = new URLSearchParams()
        if (textToFilter) searchParams.append('text', textToFilter)
        if (filters.technology) searchParams.append('technology', filters.technology)
        if (filters.location) searchParams.append('type', filters.location)
        if (filters.experienceLevel) searchParams.append('level', filters.experienceLevel)

        const offset = (currentPage - 1) * RESULTS_PER_PAGE
        searchParams.append('limit', RESULTS_PER_PAGE)
        searchParams.append('offset', offset)

        const queryParams = searchParams.toString()

        const response = await fetch(`https://api-jobs-five.vercel.app/jobs?${queryParams}`)
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
    setSearchParams(() =>{

      const params = new URLSearchParams()
      if (textToFilter) {
        params.set('text', textToFilter)
      }

      if (filters.technology) {
        params.set('technology', filters.technology)
      }

      if (filters.location) {
        params.set('type', filters.location)
      }

      if (filters.experienceLevel) {
        params.set('level', filters.experienceLevel)
      }

      if (currentPage > 1) {
        params.set('page', currentPage)
      } 

      return params
    })
}, [filters, textToFilter, currentPage, setSearchParams])

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
    filters,
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

export default function SearchPage() {
  const {
    filters,
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

  const title = loading 
  ? `Cargando... - DevJobs` 
  : `Resultados ${total}, Pagina ${currentPage} - DevJobs`

  return (

      <main>
        <title>{title}</title>
        <meta name='description' content='Explora todas las oportunidades laborales'/>

        <SearchFormSection 
          initialFilters={filters}
          initialText={textToFilter} 
          onSearch={handleSearch} 
          onTextFilter={handleTextFilter} 
        />

        <section>
          {
            loading ? <p style={{textAlign:'center'}}>Cargando empleos...</p> : <JobListings jobs={jobs} />
          }
          
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </section>

      </main>
      
  )
}

