import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import { setUser } from "../redux/authSlice";
import Button from '../components/ui/Button';
import { UserPlus, Eye, EyeOff } from 'lucide-react';

const Register = () => {

    const [name, setName]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError]= useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError("");

        try{
            const response = await axiosInstance.post("/auth/register",{
                name,
                email,
                password,
            });

            dispatch(setUser(response.data));
            navigate("/");

        }catch(err){
            setError(err.response?.data?.message || "Something went wrong");
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className='bg-cream min-h-screen flex items-center justify-center px-4 py-12 transition-colors duration-300'>
            <div className='w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white/80 border border-ink/10 rounded-2xl overflow-hidden shadow-sm'>

                {/* Left side */}
                <div className='p-8 md:p-12 flex flex-col justify-center order-2 md:order-1'>
                    <div className='flex items-center gap-2 mb-8'>
                        <span className='font-serif text-xl text-ink font-black'>
                            Blogsy.
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
                            <p className='text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100'>
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
                            <div className='relative'>
                                <input type={showPassword ? 'text' : 'password'}
                                    placeholder='Create a password'
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    className='w-full border border-ink/15 rounded-lg px-4 py-2.5 pr-11 text-sm outline-none focus:border-ink bg-white/70 transition'
                                    required
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-ink/50 hover:text-ink transition-colors p-1 rounded-md focus:outline-none'
                                    title={showPassword ? "Hide password" : "Show password"}
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                        <div className="mt-2">
                            <Button
                                type="submit"
                                variant="primary"
                                size="md"
                                fullWidth
                                loading={loading}
                                icon={UserPlus}
                                iconPosition="right"
                            >
                                Register
                            </Button>
                        </div>
                    </form>
                    <p className='text-ink/60 text-sm mt-6 text-center'>
                        Already have an account?{" "}
                        <Link to="/login" className='text-ink font-semibold hover:underline'>
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