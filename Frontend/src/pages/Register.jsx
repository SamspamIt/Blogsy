import React from 'react';
import { useState } from 'react';
import { useNavigate , Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import { setUser } from "../redux/authSlice";

const Register = () => {

    const [name, setName]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [error, setError]= useState(""); // show error

    const navigate = useNavigate(); //navigate to other page
    const dispatch = useDispatch(); //send data to redux store

    const handleSubmit = async(e)=>{
        e.preventDefault(); //prevent reload

        try{
            const response = await axiosInstance.post("/auth/register",{
                name,
                email,
                password,
            });

            dispatch(setUser(response.data)); //receives user's data from backend after response 
            
            navigate("/");

        }catch(err){
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className='bg-cream min-h-screen flex items-center justify-center px-4 py-12'>
            <div className='w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white/60 border border-ink/10 rounded-2xl overflow-hidden shadow-sm'>

                {/* Left side */}
                <div className='p-8 md:p-12 flex flex-col justify-center order-2 md:order-1'>
                    <div className='flex items-center gap-2 mb-8'>
                        <span className='font-serif text-xl text-ink font-black'>
                            Blogsy
                        </span>
                    </div>
                    <h1 className='font-serif text-2xl text-ink font-bold mb-1'>
                        Create your account
                    </h1>
                    <p className='text-ink/50 text-sm mb-8'>
                        Join Blogsy to start reading and writing tech stories.
                    </p>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        {error && (
                            <p className='text-red-600 text-sm'>
                                {error}
                            </p>
                        )}
                        <div>
                            <label className='block text-sm text-ink mb-1.5'>
                                Name
                            </label>
                            <input type='text'
                                placeholder='Enter your name'
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                className='w-full border border-ink/15 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-ink bg-white/70 transition'
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-sm text-ink mb-1.5'>
                                Email
                            </label>
                            <input type='email'
                                placeholder='Enter your email'
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
                                placeholder='Create a password'
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                className='w-full border border-ink/15 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-ink bg-white/70 transition'
                                required
                            />
                        </div>
                        <button type='submit'
                            className='bg-ink text-cream py-3 rounded-lg text-sm font-medium hover:opacity-90 transition mt-2'>
                            Register
                        </button>
                    </form>
                    <p className='text-ink/60 text-sm mt-6 text-center'>
                        Already have an account?{" "}
                        <Link to="/login" className='text-ink font-semibold hover:opacity-70'>
                            Login
                        </Link>
                    </p>
                </div>

                {/* Right Side */}
                <div className='hidden md:flex items-center justify-center p-6  order-1 md:order-2'>
                    <img
                        src="/Flower.avif"
                        alt="Blogsy"
                        className='w-full h-[85%] object-cover rounded-2xl'
                    />
                </div>
            </div>
        </div>
    )
}

export default Register;