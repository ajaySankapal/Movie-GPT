import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true)
    const [fullName, setFullName] = useState(null)
    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState(null)
    const [error, setError] = useState({ fullName: true, email: true, password: true })

    const validateForm = () => {
        console.log({
            fullName,
            email,
            password
        })

        if ((!isSignIn && (!fullName || !email || !password))) {
            setError({ email: !email, password: !password, fullName: !fullName });
            return false;
        } else if (!password || !email) {
            setError({ email: !email, password: !password });
            return false;
        }

        return true;
    };
    const toggleSignInForm = () => {
        setIsSignIn(!isSignIn)
    }
    const handleSubmit = (e) => {
        console.log('it got called')
        e.preventDefault()
        const isValid = validateForm()
        console.log({ isValid })
        console.log({ error })
        if (!isValid) return
    }
    return (
        <div>
            <Header />
            <div className='absolute bg-cover'>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/5b22968d-b94f-44ec-bea3-45dcf457f29e/IN-en-20231204-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="" />
            </div>
            <form className='w-3/12 absolute bg-black p-12 my-36 mx-auto left-0 right-0 text-white rounded-md bg-opacity-90'>
                <h1 className='text-3xl py-4 font-bold'>{isSignIn ? "Sign In" : "Sign Up"}</h1>
                {!isSignIn &&

                    <>
                        <input type="text" placeholder='Full Name' className={`p-4 my-4 w-full rounded-md bg-[#333] ${!error.fullName ? 'border-b-2 border-red-600' : ''}`} value={fullName || ''} onChange={(e) => setFullName(e.target.value)} />
                        {!error.fullName && <span className='text-red-600'>Full Name is required</span>}
                    </>
                }
                <input type="text" placeholder='Email Address' className={`p-4 my-4 w-full rounded-md bg-[#333] ${!error.fullName ? 'border-b-2 border-red-600' : ''}`} value={email || ''} onChange={(e) => setEmail(e.target.value)} />
                {!error.fullName && <span className='text-red-600'>Email is required</span>}
                <input type="password" placeholder='Password' className={`p-4 my-4 w-full rounded-md bg-[#333] ${!error.fullName ? 'border-b-2 border-red-600' : ''}`} value={password || ''} onChange={(e) => setPassword(e.target.value)} />
                {!error.fullName && <span className='text-red-600'>Password is required</span>}

                <button className='p-4 my-6 bg-red-600 w-full rounded-md' onClick={handleSubmit}>{isSignIn ? "Sign In" : "Sign Up"}</button>
                <p className="py-4">{isSignIn ? "New to Netflix?" : "Already an user?"}
                    <span className='cursor-pointer' onClick={toggleSignInForm}>{isSignIn ? "Sign Up Now" : "Sign In Now"}</span>
                </p>
            </form>
        </div>
    )
}

export default Login