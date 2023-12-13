import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGPTSearch: null,
        suggestedMoviesName: null,
        suggestedMovies: null
    },
    reducers: {
        toggleGPTSearch: (state, action) => {
            state.showGPTSearch = !state.showGPTSearch
        },
        addSuggestedMovies: (state, action) => {
            const { moviesName, moviesList } = action.payload
            state.suggestedMoviesName = moviesName
            state.suggestedMovies = moviesList
        }
    }
})

export const { toggleGPTSearch, addSuggestedMovies } = gptSlice.actions
export default gptSlice.reducer