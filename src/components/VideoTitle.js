import React from 'react'
import play from '../assets/play.png'
import info from '../assets/warning.png'

const VideoTitle = ({ title, overview }) => {
    return (
        <div className='w-screen aspect-video pt-[20%] px-10 md:px-24 absolute text-white bg-gradient-to-r from-black'>
            <h1 className='text-xl md:text-4xl font-bold'>{title}</h1>
            <p className='hidden md:inline-block text-lg w-4/5 md:w-1/4'>{overview}</p>
            <div className='flex my-5'>
                <button className='py-1 px-1 md:px-8 bg-white  text-black rounded-md text-lg flex items-center hover:bg-opacity-80'> <img className='w-4 md:w-6 md:m-1 m-0' src={play} alt="" /> <p className='md:px-2 px-1'>
                    Play </p></button>
                <button className='hidden py-1 px-8 bg-gray-400  text-black ml-4 rounded-md text-lg md:flex items-center bg-opacity-50'><img className='w-6 m-1' src={info} alt="" /><p className='m-2'>
                    More Info </p></button>
            </div>
        </div>
    )
}

export default VideoTitle