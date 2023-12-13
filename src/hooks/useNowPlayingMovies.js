import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addNowPlayingMovies } from '../utils/moviesSlice';
const useNowPlayingMovies = () => {
    const dispatch = useDispatch()
    const nowPlayingMovies = useSelector(state => state.movies?.nowPlayingMovies)
    const getNowPlayingMovies = async () => {
        const url = 'https://api.themoviedb.org/3/movie/now_playing?page=1';
        const data = await fetch(url, API_OPTIONS)
        const json = await data.json()
        dispatch(addNowPlayingMovies(json?.results))
    }

    useEffect(() => {
        !nowPlayingMovies && getNowPlayingMovies()
        return () => {

        }
    }, [])
}

export default useNowPlayingMovies