"use client"
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);

    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            let loginObj = {
                email: e.target[1].value,
                password: e.target[2].value
            };

            fetch("http://localhost:3030/loginAccount", {
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
                username: e.target[0].value,
                email: e.target[1].value,
                password: e.target[2].value
            };

            fetch("http://localhost:3030/createAccount", {
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
        <div
            className='flex h-screen items-center justify-center bg-cover bg-center'
        >
            <form
                className='relative w-full max-w-md p-10 space-y-6 bg-white bg-opacity-90 text-gray-900 rounded-md shadow-lg'
                onSubmit={handleSubmit}
                style={{
                    maxHeight: isLogin ? '600px' : '700px',
                    overflow: 'hidden',
                }}
            >
                <h2 className='text-4xl font-bold text-center text-gray-800'>
                    {isLogin ? "Welcome Back!" : "Create an Account"}
                </h2>
                <p className='text-center text-gray-600 mb-4'>
                    {isLogin ? "We're so excited to see you again!" : "Pleasure to meet you!"}
                </p>
                <div className={isLogin ? "hidden" : "block"}>
                    <label htmlFor="username" className='block text-sm font-medium'>
                        USERNAME
                    </label>
                    <input
                        type="text"
                        id="username"
                        required={!isLogin}
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
