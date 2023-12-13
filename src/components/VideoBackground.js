import React from 'react'
import useMovieTrailer from '../hooks/useMovieTrailer'
import { useSelector } from 'react-redux'
const VideoBackground = ({ movieId }) => {
    const trailer = useSelector(state => state.movies.trailer)
    useMovieTrailer(movieId)
    return (
        <div className='w-screen'>
            <iframe
                src={`https://www.youtube.com/embed/${trailer?.key}?rel=0?version=3&autoplay=1&mute=1&controls=0&&showinfo=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className='w-screen aspect-video'
            ></iframe>
        </div>
    )
}

export default VideoBackground