import styles from './NotFoundPage.module.css';

export function NotFoundPage (){
    return(
        <>
        

        <main className = {styles.containerNotFoundPage}>
            
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>
                Sorry, the page you're looking for doesn't exist, was removed,
                or is temporarily unavailable.
            </p>

            <a href="/">← Back to Home</a>
        </main>
        </>
    )
}
