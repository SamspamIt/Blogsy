import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
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
        <div className='bg-cream min-h-screen flex items-center justify-center px-4'>
            <form onSubmit={handleSubmit}
                className='bg-white/50 p-8 rounded-lg w-full max-w-md flex flex-col gap-4'>
                <h1 className='font-serif text-3xl text-ink mb-2'>
                    Create Account
                </h1>

                {error && (
                    <p className='text-red-600 text-sm'>{error}</p>
                )}

                <input type='text' 
                    placeholder='Name'
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    className='border border-ink/20 rounded-md px-4 py-2 outline-none focus:border-ink'
                    required
                />
                <input type='email' 
                    placeholder='Email'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    className='border border-ink/20 rounded-md px-4 py-2 outline-none focus:border-ink'
                    required
                />
                <input type='password' 
                    placeholder='Password'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    className='border border-ink/20 rounded-md px-4 py-2 outline-none focus:border-ink'
                    required
                />
                <button type='submit'
                    className='bg-ink text-cream py-2 rounded-md hover:opacity-90 transition'>
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register;