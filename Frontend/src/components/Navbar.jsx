import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import {useSelector, useDispatch } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import {clearUser} from "../redux/authSlice.js";

const Navbar = () => {

    const {user, isAuthenticated }=useSelector((state)=> state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async()=>{
        try{
            await axiosInstance.post("/auth/logout");
            dispatch(clearUser());
            navigate("/");
        }catch(err){
            console.error(err);
        }
    };
    return (
        <nav className='bg-cream border-b border-ink/10 px-8 py-5 flex items-center justify-between sticky top-0 z-50'>
            <Link to="/" className='font-serif text-2xl text-ink font-black tracking-tight'>
                Blogsy .
            </Link>
            <div className='flex items-center gap-9'>
                <Link to="/" className='text-[15px] text-ink hover:opacity-60 transition'>
                    Home
                </Link>
                {isAuthenticated && user?.role === "admin" && (
                    <Link to="/create-blog" className='text-[15px] text-ink hover:opacity-60 transition'>
                        Write
                    </Link>
                )}
                {isAuthenticated ?(
                    <button onClick={handleLogout}
                        className='text-[15px] text-ink flex items-center gap-1.5 hover:opacity-90 transition'>
                            Logout <span>→</span>
                        </button>
                ):(
                    <>
                        <Link to="/login" className='text-[15px] text-ink hover:opacity-60 transition'>
                            Login
                        </Link>
                        <Link to="/register" className='text-[15px] text-ink flex items-center gap-1.5 hover:opacity-60 transition'>
                            Register <span>→</span>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};
export default Navbar;