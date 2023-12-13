import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies, addPopularMovies } from '../utils/moviesSlice';
const usePopularMovies = () => {
    const dispatch = useDispatch()
    const getPopularMovies = async () => {
        const url = 'https://api.themoviedb.org/3/movie/popular?page=1';
        const data = await fetch(url, API_OPTIONS)
        const json = await data.json()
        dispatch(addPopularMovies(json?.results))
    }

    useEffect(() => {
        getPopularMovies()
        return () => {

        }
    }, [])
}

export default usePopularMovies