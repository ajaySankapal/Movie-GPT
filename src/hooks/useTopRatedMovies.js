import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addNowPlayingMovies, addPopularMovies, addTopRatedMovies } from '../utils/moviesSlice';
const useTopRatedMovies = () => {
    const dispatch = useDispatch()
    const topRatedMovies = useSelector(state => state.movies?.topRatedMovies)
    const getTopRatedMovies = async () => {
        const url = 'https://api.themoviedb.org/3/movie/top_rated?page=1';
        const data = await fetch(url, API_OPTIONS)
        const json = await data.json()
        dispatch(addTopRatedMovies(json?.results))
    }

    useEffect(() => {
        !topRatedMovies && getTopRatedMovies()
        return () => {

        }
    }, [])
}

export default useTopRatedMovies