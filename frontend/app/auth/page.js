'use client'; 
import { useState } from 'react';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            let loginObj = {
                email: e.target[1].value,
                password: e.target[2].value
            };

            fetch("/api/loginAccount", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginObj)
            }).then(res => res.json()).then(data => {
                alert(data.type + data.msg);
                if (data.type === "SUCCESS") {
                    localStorage.setItem("userID", data.res);
                }
            });
        } else {
            let signUpObj = {
                email: e.target[0].value,
                displayName: e.target[1].value,
                username: e.target[2].value,
                password: e.target[3].value,
                dateOfBirth: `${e.target[4].value}-${e.target[5].value}-${e.target[6].value}`,
            };

            fetch("/api/createAccount", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signUpObj)
            }).then(res => res.json()).then(data => {
                alert(data.type + data.msg);
            });
        }
    };

    return (
        <div className='flex h-screen items-center justify-center bg-cover bg-center'>
            <form
                className='relative w-full max-w-md p-10 space-y-6 bg-white bg-opacity-90 text-gray-900 rounded-md shadow-lg'
                onSubmit={handleSubmit}
                style={{
                    height: isLogin ? 'auto' : '80vh', 
                    maxHeight: isLogin ? 'auto' : '90vh',
                    overflow: isLogin ? 'visible' : 'auto', 
                }}
            >
                <h2 className='text-4xl font-bold text-center text-gray-800'>
                    {isLogin ? "Welcome Back!" : "Create an Account"}
                </h2>
                <p className='text-center text-gray-600 mb-4'>
                    {isLogin ? "We're so excited to see you again!" : "Pleasure to meet you!"}
                </p>

                {isLogin ? (
                    <>
                        <div>
                            <label htmlFor="email" className='block text-sm font-medium'>
                                EMAIL
                            </label>
                            <input
                                type="email"
                                id="email"
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
                                required
                                className='mt-2 w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <label htmlFor="email" className='block text-sm font-medium'>
                                EMAIL
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                className='mt-2 w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>

                        <div>
                            <label htmlFor="displayName" className='block text-sm font-medium'>
                                DISPLAY NAME
                            </label>
                            <input
                                type="text"
                                id="displayName"
                                required
                                className='mt-2 w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>

                        <div>
                            <label htmlFor="username" className='block text-sm font-medium'>
                                USERNAME
                            </label>
                            <input
                                type="text"
                                id="username"
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
                                required
                                className='mt-2 w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>

                        <div className='flex space-x-4'>
                            <div className="w-1/3">
                                <label htmlFor="day" className='block text-sm font-medium'>
                                    DAY
                                </label>
                                <select
                                    id="day"
                                    required
                                    className='mt-2 w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                >
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-1/3">
                                <label htmlFor="month" className='block text-sm font-medium'>
                                    MONTH
                                </label>
                                <select
                                    id="month"
                                    required
                                    className='mt-2 w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                >
                                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
                                        <option key={month} value={index + 1}>{month}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-1/3">
                                <label htmlFor="year" className='block text-sm font-medium'>
                                    YEAR
                                </label>
                                <select
                                    id="year"
                                    required
                                    className='mt-2 w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                >
                                    {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </>
                )}

                <button
                    type='submit'
                    className='bg-blue-600 w-full py-3 px-4 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all duration-200'
                >
                    {isLogin ? "Log In" : "Sign Up"}
                </button>

                <button
                    type="button"
                    className="text-sm text-blue-400 hover:underline text-center w-full mt-4"
                    onClick={() => {
                        setIsLogin(!isLogin);
                    }}
                >
                    {isLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
                </button>
            </form>
        </div>
    );
}
