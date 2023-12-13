import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/authSlice';
import { APP_LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGPTSearch } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';
const Header = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const showGPTSearch = useSelector(state => state.gpt?.showGPTSearch)
    const dispatch = useDispatch()
    const handleSignOut = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
            // An error happened.
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, displayName, email, photoURL } = user;
                dispatch(addUser({ uid, displayName, email, photoURL }))
                navigate('/browse')
            } else {
                dispatch(removeUser())
                navigate('/')
            }
        });
        // This will unsubscribe the onAuthStateChange when the components unmount
        return () => unsubscribe()
    }, [])

    return (
        <div className='fixed w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between'>

            <img className='w-44 mx-auto md:mx-0' src={APP_LOGO} alt="logo" />
            {user && <div className='flex justify-between md:p-2 p-6'>
                {showGPTSearch && <select className='px-2 py-1 m-2 bg-gray-800 text-white' onChange={(e) => dispatch(changeLanguage(e.target.value))}>
                    {
                        SUPPORTED_LANGUAGES.map(lang =>
                            <option key={lang.identifier} value={lang.identifier} >{lang.name}</option>
                        )
                    }
                </select>}
                <button className='px-4 py-2 m-2 bg-purple-800 text-white  rounded-md' onClick={() => dispatch(toggleGPTSearch())}>{showGPTSearch ? "Explore" : "GPT Search"}</button>
                <img className='hidden md:block w-12 h-12' src={user?.photoURL} alt="" />
                <button className='p-2 text-white font-bold ' onClick={handleSignOut}>(Sign Out)</button>
            </div>}
        </div>
    )
}

export default Header