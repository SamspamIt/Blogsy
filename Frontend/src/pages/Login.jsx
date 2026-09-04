import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axiosInstance from '../api/axiosInstance';
import { setUser } from '../redux/authSlice';
import Button from '../components/ui/Button';
import { LogIn, ArrowRight, Eye, EyeOff } from 'lucide-react';

const Login = () => {

    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError]= useState("");
    const [remember, setRemember]= useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError("");
        try{
            const response = await axiosInstance.post("/auth/login",{
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
                            Blogsy.
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
                            <p className='text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100'>
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
                            <div className='relative'>
                                <input type={showPassword ? 'text' : 'password'}
                                    placeholder='Enter your password'
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
                        <div className='flex items-center justify-between text-sm'>
                            <label className='flex items-center gap-2 text-ink/70 cursor-pointer select-none'>
                                <input type='checkbox'
                                    checked={remember}
                                    onChange={(e)=>setRemember(e.target.checked)}
                                    className='accent-ink rounded'
                                />
                                Remember login
                            </label>
                            <a href='#' className='text-ink/70 hover:text-ink transition-colors'>
                                Forgot Password?
                            </a>
                        </div>
                        <div className="mt-2">
                            <Button
                                type="submit"
                                variant="primary"
                                size="md"
                                fullWidth
                                loading={loading}
                                icon={LogIn}
                                iconPosition="right"
                            >
                                Login
                            </Button>
                        </div>
                        <div className='flex items-center gap-3 my-2'>
                            <div className='flex-1 h-px bg-ink/10'></div>
                            <span className='text-xs text-ink/40 uppercase tracking-wider font-mono'>
                                Or continue with
                            </span>
                            <div className='flex-1 h-px bg-ink/10'></div>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="md"
                            fullWidth
                            icon={() => <span className="text-base leading-none">🍎</span>}
                            iconPosition="left"
                        >
                            Sign in with Apple
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="md"
                            fullWidth
                            icon={() => <span className="font-bold text-ink text-sm">G</span>}
                            iconPosition="left"
                        >
                            Sign in with Google
                        </Button>
                    </form>
                    <p className='text-ink/60 text-sm mt-6 text-center'>
                        Don't have an account?{" "}
                        <Link to="/register" className='text-ink font-semibold hover:underline'>
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
