import React, { useState } from 'react';
import backgroundImage from '../assets/CK7JQZ.webp'; 

const Login = () => {
    const [isLogin, setLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('email: ', email);
        console.log('password: ', password);
    };

    const handleSignup = (e) => {
        e.preventDefault();
        console.log('username: ', username);
        console.log('email: ', email);
        console.log('password: ', password);
    };

    return (
        <div
            className='flex h-screen items-center justify-center bg-cover bg-center'
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className='absolute inset-0 bg-black opacity-50' /> 

            <div className='relative w-full max-w-md p-10 space-y-6 bg-white bg-opacity-90 text-gray-900 rounded-md shadow-lg'>
                {isLogin ? (
                    <>
                        <h2 className='text-4xl font-bold text-center text-gray-800'>Welcome Back!</h2>
                        <p className='text-center text-gray-600 mb-4'>
                            We're so excited to see you again!
                        </p>

                        <form onSubmit={handleLogin} className='space-y-6'>
                            <div>
                                <label htmlFor="email" className='block text-sm font-medium'>
                                    EMAIL OR PHONE NUMBER
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className='mt-2 w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className='block text-sm font-medium'>
                                    PASSWORD
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className='mt-2 w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </div>

                            <a href="#" className='text-sm text-blue-500 hover:underline block text-right'>
                                Forgot your password?
                            </a>

                            <button
                                type='submit'
                                className='bg-blue-600 w-full py-3 px-4 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all duration-200'
                            >
                                Log In
                            </button>

                            <button
                                type="button"
                                onClick={() => setLogin(false)}
                                className="text-sm text-blue-400 hover:underline text-center w-full mt-4"
                            >
                                Need an account? Sign up
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <h2 className='text-4xl font-bold text-center text-gray-800'>Create an Account</h2>
                        <p className='text-center text-gray-600 mb-4'>Pleasure to meet you!</p>

                        <form onSubmit={handleSignup} className='space-y-6'>
                            <div>
                                <label htmlFor="username" className='block text-sm font-medium'>
                                    USERNAME
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className='mt-2 w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className='block text-sm font-medium'>
                                    EMAIL
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className='mt-2 w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className='block text-sm font-medium'>
                                    PASSWORD
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className='mt-2 w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </div>

                            <button
                                type='submit'
                                className='bg-blue-600 w-full py-3 px-4 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all duration-200'
                            >
                                Sign Up
                            </button>

                            <div className="flex justify-center items-center mt-4">
                                <button
                                    type="button"
                                    onClick={() => setLogin(true)}
                                    className="text-sm text-blue-400 hover:underline"
                                >
                                    Already have an account? Log in
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;
