import React from 'react'
import lang from '../utils/languageConstants'
import { useSelector } from 'react-redux'

const GPTSearchBar = () => {
    const langKey = useSelector(state => state.config?.lang)
    return (
        <div className='pt-[8%] flex justify-center'>
            <form className='w-1/2 p-2 m-6 bg-black grid grid-cols-12 rounded-md'>
                <input type="text" className='p-4 m-4 col-span-9 font-bold' placeholder={lang[langKey].gptSearchPlaceholder} />
                <button className='m-4 rounded-md px-4 py-2 text-black bg-red-600 col-span-3 font-bold'>
                    {lang[langKey].search} </button>
            </form>
        </div>
    )
}

export default GPTSearchBar