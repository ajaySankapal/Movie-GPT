import React from 'react'
import { IMAGE_URL } from '../utils/constants'

const MovieCard = ({ posterPath, title }) => {
    return (
        <div className='w-52 pr-6 cursor-pointer'>
            <img className='transition-transform hover:scale-110 ' src={`${IMAGE_URL}/${posterPath}`} alt={title} />
        </div>
    )
}

export default MovieCard