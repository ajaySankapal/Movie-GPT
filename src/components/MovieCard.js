import React from 'react'
import { IMAGE_URL } from '../utils/constants'

const MovieCard = ({ posterPath, title }) => {
    if (!posterPath) return null
    return (
        <div className='w-36 md:w-48 pr-4 cursor-pointer'>
            <img src={`${IMAGE_URL}/${posterPath}`} alt={title} />
        </div>
    )
}

export default MovieCard