import React from 'react'
import play from '../assets/play.png'
import info from '../assets/warning.png'

const VideoTitle = ({ title, overview }) => {
    return (
        <div className='w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black'>
            <h1 className='text-4xl font-bold'>{title}</h1>
            <p className='text-lg w-1/4'>{overview}</p>
            <div className='flex my-5'>
                <button className='py-1 px-8 bg-white  text-black rounded-md text-lg flex items-center hover:bg-opacity-80'> <img className='w-6 m-1' src={play} alt="" /> <p className='m-2'>
                    Play </p></button>
                <button className='py-1 px-8 bg-gray-400  text-black ml-4 rounded-md text-lg flex items-center bg-opacity-50'><img className='w-6 m-1' src={info} alt="" /><p className='m-2'>
                    More Info </p></button>
            </div>
        </div>
    )
}

export default VideoTitle