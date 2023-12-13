import React from 'react'
import { IMAGE_URL } from '../utils/constants'

const MovieCard = ({ posterPath, title }) => {
    return (
        <div className='w-48 pr-6 transition-transform hover:scale-125   cursor-pointer'>
            <img src={`${IMAGE_URL}/${posterPath}`} alt={title} />
        </div>
    )
}

export default MovieCard