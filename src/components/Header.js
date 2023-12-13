import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/authSlice';
import { APP_LOGO } from '../utils/constants';
const Header = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
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
        <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
            <img className='w-44' src={APP_LOGO} alt="logo" />

            {user && <div className='flex p-2 '>
                <img className='w-12 h-12' src={user?.photoURL} alt="" />
                <button className='p-2' onClick={handleSignOut}>(Sign Out)</button>
            </div>}
        </div>
    )
}

export default Header