import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import useTopRatedMovies from '../hooks/useTopRatedMovies'
import useUpcomingMovies from '../hooks/useUpcomingMovies'
import usePopularMovies from '../hooks/usePopularMovies'
import useTrendingMovies from '../hooks/useTrendingMovies'
import GPTSearch from './GPTSearch'
import { useSelector } from 'react-redux'


const Browse = () => {
    useNowPlayingMovies()
    useTopRatedMovies()
    useUpcomingMovies()
    usePopularMovies()
    useTrendingMovies()
    const showGPTSearch = useSelector(state => state.gpt?.showGPTSearch)
    return (
        <div>
            <Header />
            {
                showGPTSearch ? <GPTSearch /> :
                    <>
                        <MainContainer />
                        <SecondaryContainer />
                    </>}
        </div>
    )
}

export default Browse