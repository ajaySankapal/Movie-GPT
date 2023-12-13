import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {
    return (
        <div className='px-6'>
            <div>
                <h1 className='text-lg md:text-3xl py-4 text-white'>{title}</h1>
            </div>

            <div className='flex overflow-x-scroll' >
                <div className='flex'>
                    {movies?.map(movie => <MovieCard key={movie.id} posterPath={movie?.poster_path} title={movie?.title} />)}
                </div>
            </div>
        </div>
    )
}

export default MovieList