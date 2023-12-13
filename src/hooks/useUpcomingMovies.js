import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addNowPlayingMovies, addPopularMovies, addTopRatedMovies, addUpcomingMovies } from '../utils/moviesSlice';
const useUpcomingMovies = () => {
    const dispatch = useDispatch()
    const upcomingMovies = useSelector(state => state.movies?.upcomingMovies)
    const getUpcomingMovies = async () => {
        const url = 'https://api.themoviedb.org/3/movie/upcoming?page=1';
        const data = await fetch(url, API_OPTIONS)
        const json = await data.json()
        dispatch(addUpcomingMovies(json?.results))
    }

    useEffect(() => {
        !upcomingMovies && getUpcomingMovies()
        return () => {

        }
    }, [])
}

export default useUpcomingMovies