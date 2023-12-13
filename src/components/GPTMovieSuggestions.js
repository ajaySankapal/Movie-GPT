import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const GPTMovieSuggestions = () => {
    const { suggestedMoviesName, suggestedMovies } = useSelector(state => state.gpt)
    if (!suggestedMoviesName) return null
    return (
        <div className='p-4 m-4 bg-black text-white'>
            <div className='flex flex-wrap'>
                {suggestedMoviesName?.map((movie, index) => suggestedMovies[index].length > 0 && <MovieList key={movie} title={movie} movies={suggestedMovies[index]} />)}
            </div>

        </div>
    )
}

export default GPTMovieSuggestions