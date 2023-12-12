import React, { useState } from 'react'
import Header from './Header'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/authSlice'

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true)
    const [fullName, setFullName] = useState(null)
    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState(null)
    const [error, setError] = useState({ fullName: false, email: false, password: false, errorMsg: null })
    const [errorMessasge, setErrorMessage] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const validateForm = () => {
        if ((!isSignIn && (!fullName || !email || !password))) {
            setError({ email: !email, password: !password, fullName: !fullName });
            return false;
        } else if (!password || !email) {
            setError({ email: !email, password: !password });
            return false;
        }
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        if (email && !emailRegex.test(email)) {
            setError({ ...error, password: false, email: true })
            setErrorMessage('Email is invalid')
            return false
        }
        if (password && !passwordRegex.test(password)) {
            setError({ ...error, email: false, password: true })
            setErrorMessage('Password is invalid')
            return false
        }
        setError({ fullName: false, email: false, password: false })
        return true;
    };
    const toggleSignInForm = () => {
        setIsSignIn(!isSignIn)
    }
    const handleSubmit = (e) => {
        debugger
        e.preventDefault()
        const isValid = validateForm()
        console.log({ isValid })
        console.log({ error })
        if (!isValid) return
        if (!isSignIn) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: fullName, photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6dNh-zL2QX7vSRIkt5pRP6MvNo0cHPTUsGw&usqp=CAU"
                    }).then(() => {
                        const { uid, displayName, email, photoURL } = user;
                        dispatch(addUser({ uid, displayName, email, photoURL }))
                        navigate('/browse')
                    }).catch((error) => {
                        // An error occurred
                        // ...
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setError({
                        ...error, errorMsg: errorMessage
                    })
                    navigate('/')
                });
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    navigate('/browse')
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setError({
                        ...error, errorMsg: errorMessage
                    })
                    navigate('/')
                });

        }
    }
    console.log(error, 'ERROR HERE')
    return (
        <div>
            <Header />
            <div className='absolute bg-cover'>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/5b22968d-b94f-44ec-bea3-45dcf457f29e/IN-en-20231204-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="" />
            </div>
            <form className='w-3/12 absolute bg-black p-12 my-36 mx-auto left-0 right-0 text-white rounded-md bg-opacity-80'>
                <h1 className='text-3xl py-4 font-bold'>{isSignIn ? "Sign In" : "Sign Up"}</h1>
                {
                    !isSignIn &&
                    <>
                        <input type="text" placeholder='Full Name' className={`p-4 my-4 w-full rounded-md bg-[#333] ${error?.fullName ? 'border-b-2 border-red-600' : ''}`} value={fullName || ''} onChange={(e) => setFullName(e.target.value)} />
                        {error?.fullName && <span className='text-red-600'>Full Name is required</span>}
                    </>
                }
                <input type="text" placeholder='Email Address' className={`p-4 my-4 w-full rounded-md bg-[#333] ${error.email ? 'border-b-2 border-red-600' : ''}`} value={email || ''} onChange={(e) => setEmail(e.target.value)} />
                {
                    error.email &&
                    <span className='text-red-600'>{errorMessasge ? errorMessasge : "Email is required"}</span>
                }

                <input type="password" placeholder='Password' className={`p-4 my-4 w-full rounded-md bg-[#333] ${error.password ? 'border-b-2 border-red-600' : ''}`} value={password || ''} onChange={(e) => setPassword(e.target.value)} />
                {
                    error.password &&
                    <span className='text-red-600'>{errorMessasge ? errorMessasge : "Password is required"}</span>
                }
                {error.errorMsg && <p className="text-red-600">{error.errorMsg}</p>}
                <button className='p-4 my-6 bg-red-600 w-full rounded-md' onClick={handleSubmit}>
                    {isSignIn ? "Sign In" : "Sign Up"}
                </button>

                <p className="py-4">
                    {isSignIn ? "New to Netflix? " : "Already an user? "}
                    <span className='cursor-pointer' onClick={toggleSignInForm}>
                        {isSignIn ? "Sign Up Now" : "Sign In Now"}
                    </span>
                </p>

            </form>
        </div>
    )
}

export default Login