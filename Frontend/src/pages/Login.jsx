import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axiosInstance from '../api/axiosInstance';
import { setUser } from '../redux/authSlice';

const Login = () => {

    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [error, setError]= useState(""); // show error
    const [remember, setRemember]= useState(false);

    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await axiosInstance.post("/auth/login",{
                email,
                password,
            });
            dispatch(setUser(response.data));
            navigate("/");
        }catch(err){
            setError(err.response?.data?.message || "Something went wrong");
        };
    }
    return (
        <div className='bg-cream min-h-screen flex items-center justify-center px-4 py-12'>
            <div className='w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white/60 border border-ink/10 rounded-2xl overflow-hidden shadow-sm'>
            
                {/* Left side */}
                <div className='hidden md:flex items-center justify-center p-6 '>
                    <img src='/sideImage.avif' alt='Blogsy'
                        className='w-full h-[85%] object-cover rounded-2xl'
                    />
                </div>

                {/* Right side */}
                <div className='p-8 md:p-12 flex flex-col justify-center'>
                    <div className='flex items-center gap-2 mb-8'>
                        <span className='font-serif text-xl text-ink font-black'>
                            Blogsy
                        </span>
                    </div>
                    <h1 className='font-serif text-2xl text-ink font-bold mb-1'>
                        Login to your account
                    </h1>
                    <p className='text-ink/50 text-sm mb-8'>
                        Welcome back! Enter your details to log in to your account.
                    </p>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        {error &&
                            <p className='text-red-600 text-sm'>
                                {error}
                            </p>
                        }
                        <div>
                            <label className='block text-sm text-ink mb-1.5'>
                                Email
                            </label>
                            <input type='email'
                                placeholder='you@example.com'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                className='w-full border border-ink/15 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-ink bg-white/70 transition'
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-sm text-ink mb-1.5'>
                                Password
                            </label>
                            <input type='password'
                                placeholder='Enter your password'
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                className='w-full border border-ink/15 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-ink bg-white/70 transition'
                                required
                            />
                        </div>
                        <div className='flex items-center justify-between text-sm'>
                            <label className='flex items-center gap-2 text-ink/70'>
                                <input type='checkbox'
                                    checked={remember}
                                    onChange={(e)=>setRemember(e.target.checked)}
                                    className='accent-ink'
                                />
                                Remember login
                            </label>
                            <a href='#' className='text-ink/70 hover:text-ink'>
                                Forgot Password?
                            </a>
                        </div>
                        <button type='submit'
                            className='bg-ink text-cream py-3 rounded-lg text-sm font-medium hover:opacity-90 transition mt-2'>
                            Login
                        </button>
                        <div className='flex items-center gap-3 my-2'>
                            <div className='flex-1 h-px bg-ink/10'></div>
                            <span className='text-xs text-ink/40'>
                                Or continue with
                            </span>
                            <div className='flex-1 h-px bg-ink/10'></div>
                        </div>
                        <button type='button'
                            className='border border-ink/15 rounded-lg py-2.5 text-sm text-ink/80 flex items-center justify-center gap-2 hover:bg-ink/5 transition'>
                            🍎 Sign in with Apple
                        </button>
                        <button type='button'
                            className='border border-ink/15 rounded-lg py-2.5 text-sm text-ink/80 flex items-center justify-center gap-2 hover:bg-ink/5 transition'>
                            <span className='font-bold text-ink'>G</span> Sign in with Google
                        </button>
                    </form>
                    <p>
                        Don't have an account ?{" "}
                        <Link to="/register" className='text-ink font-semibold hover:opacity-70'>
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
