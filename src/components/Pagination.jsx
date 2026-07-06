import styles from './Pagination.module.css';
import { Link } from './Link';
import { NavLink } from 'react-router';

export function Pagination({currentPage=1, totalPages=10, onPageChange}) {
  //generar un array de numeros de pagina
  const pages = Array.from({length: totalPages}, (_, i) => i + 1);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const stylePrevButton = isFirstPage ? {pointerEvents: 'none', opacity: 0.5} : {};
  const styleNextButton = isLastPage ? {pointerEvents: 'none', opacity: 0.5} : {};

  const handlePrevClick = (e) => {
    e.preventDefault();
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handleChangePage = (e, page) => {
    e.preventDefault();
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const buildPageUrl = (page) =>{
    const url = new URL(window.location)
    url.searchParams.set('page', page)
    return `${url.pathname}?${url.searchParams.toString()}`
  }

  return (
    <nav className={styles.pagination}>
          <NavLink to={buildPageUrl(currentPage - 1)} className="prev" style={stylePrevButton} onClick={handlePrevClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 6l-6 6l6 6" />
            </svg>
          </NavLink>

          {pages.map((page) => (
            <NavLink 
              key={page}
              to={buildPageUrl(page)} 
              className={page === currentPage ? styles.isActive : ''}
              onClick={(e) => handleChangePage(e, page)}
            > 
              {page}
            </NavLink>
          ))}

          <NavLink href={buildPageUrl(currentPage + 1)} className="next" style={styleNextButton} onClick={handleNextClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 6l6 6l-6 6" />
            </svg>
          </NavLink>
        </nav>
  )
}