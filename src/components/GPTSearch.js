import React from 'react'
import GPTSearchBar from './GPTSearchBar'
import GPTMovieSuggestions from './GPTMovieSuggestions'
import { BG_URL } from '../utils/constants'

const GPTSearch = () => {
    return (
        <div>
            <div className='fixed -z-10 '>
                <img className='h-screen w-screen object-cover' src={BG_URL} alt="" />
            </div>
            <div className='pt-[30%] md:p-0'>
                <GPTSearchBar />
                <GPTMovieSuggestions />
            </div>

        </div>
    )
}

export default GPTSearch