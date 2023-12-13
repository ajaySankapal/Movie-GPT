import { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addTrendingMovies } from '../utils/moviesSlice';
const useTrendingMovies = () => {
    const dispatch = useDispatch()
    const trendingMovies = useSelector(state => state.movies?.trendingMovies)
    const getTrendingMovies = async () => {
        const url = 'https://api.themoviedb.org/3/movie/now_playing?page=1';
        const data = await fetch(url, API_OPTIONS)
        const json = await data.json()
        dispatch(addTrendingMovies(json?.results))
    }

    useEffect(() => {
        !trendingMovies && getTrendingMovies()
        return () => {

        }
    }, [])
}

export default useTrendingMovies