import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addTrailer } from '../utils/moviesSlice';
const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch()
    const movieTrailer = useSelector(state => state.movies?.trailer)
    const getMovieVideos = async () => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
        const data = await fetch(url, API_OPTIONS)
        const json = await data.json()
        const filterData = json.results.filter(item => item.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0]
        dispatch(addTrailer(trailer))
    }
    useEffect(() => {
        !movieTrailer && getMovieVideos()
    }, [])
}

export default useMovieTrailer