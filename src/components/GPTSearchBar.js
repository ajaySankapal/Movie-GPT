import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai'
import { API_OPTIONS } from '../utils/constants'
import { addSuggestedMovies } from '../utils/gptSlice'

const GPTSearchBar = () => {
    const searchText = useRef(null)
    const dispatch = useDispatch()
    const langKey = useSelector(state => state.config?.lang)

    const fetchTMDBMovie = async (movie) => {
        try {
            const url = `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`;
            const data = await fetch(url, API_OPTIONS)
            const json = await data.json()
            const desiredMovie = json.results.filter(item => item.title.toLowerCase() === movie.trim().toLowerCase())
            const result = desiredMovie.length > 1 ? [].concat(desiredMovie[0]) : desiredMovie
            return result
        } catch (error) {
            console.log(error)
        }
    }

    const handleGPTSearch = async () => {
        const prompt = "Act as a Movie Recommendation system and suggest some movies for the query : " +
            searchText.current.value +
            ". only give me names of 10 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya, Chupke Chupke, Anand, Bawarchi, Aaradhna, Abhiman";
        const gptResult = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-3.5-turbo',
        });
        const gptMovies = gptResult.choices[0].message?.content.split(',')
        const promiseArray = gptMovies?.map(movie => fetchTMDBMovie(movie))
        const suggestedMovies = await Promise.all(promiseArray)
        dispatch(addSuggestedMovies({ moviesName: gptMovies, moviesList: suggestedMovies }))
    }
    return (
        <div className='pt-[20%] md:pt-[8%] flex justify-center'>
            <form className='w-full md:w-1/2 md:m-6 p-1 bg-black grid grid-cols-12 rounded-md' onSubmit={(e) => e.preventDefault()}>
                <input type="text" className='md:p-4 md:m-4 p-2 m-2 col-span-9 ' placeholder={lang[langKey].gptSearchPlaceholder} ref={searchText} />
                <button className='md:m-4 m-2 px-2 rounded-md md:px-4 md:py-2 text-black bg-red-600 col-span-3 ' onClick={handleGPTSearch}>
                    {lang[langKey].search} </button>
            </form>
        </div>
    )
}

export default GPTSearchBar