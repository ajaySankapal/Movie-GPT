import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
    const movies = useSelector(state => state.movies)
    return (movies.nowPlayingMovies &&
        <div className='bg-black'>
            <div className='-mt-52 pl-14 relative z-20'>
                <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
                <MovieList title={"Upcoming"} movies={movies?.upcomingMovies} />
                <MovieList title={"Top Rated"} movies={movies?.topRatedMovies} />
                <MovieList title={"Trending"} movies={movies?.trendingMovies} />
                <MovieList title={"Popular"} movies={movies?.popularMovies} />
            </div>

        </div>
    )
}

export default SecondaryContainer