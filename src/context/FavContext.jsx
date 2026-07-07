import { createContext, use, useState } from "react";


export const FavoriteContext = createContext()

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([])

    const addFavorite = (jobId) => {
        setFavorites((prevFavorites) => [...prevFavorites, job])
    }

    const removeFavorite = (jobId) => {
        setFavorites((prevFavorites) => 
            prevFavorites.filter((job) => job.id !== jobId)
        )
    }

    const isFavorite = (jobId) => {
        return favorites.some((job) => job.id === id)
    }

    const value = {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite
    }

    return (
        <FavoriteContext value={value}>
            {children}
        </FavoriteContext>
    )
}

export function useFavorite() {
    const context = use(FavoriteContext)

    if (context === undefined){
        throw new Error('useFavorites must be used within a FavoriteProvider')
    }

    return context
}