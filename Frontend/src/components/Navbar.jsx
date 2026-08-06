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
        <nav className='bg-cream border-b border-ink/10 px-8 py-4 flex items-center justify-between'>
            <Link to="/" className='font-serif text-2xl text-ink font-semibold'>
                Blogsy .
            </Link>
            <div className='flex items-center gap-6'>
                <Link to="/" className='text-ink hover:opacity-60 transition'>
                    Home
                </Link>
                {isAuthenticated && user?.role === "admin" && (
                    <Link to="/create-blog" className='text-ink hover:opacity-60 transition'>
                        Create Blog
                    </Link>
                )}
                {isAuthenticated ?(
                    <button onClick={handleLogout}
                        className='bg-ink text-cream px-4 py-2 rounded-md hover:opacity-90 transition'>
                            Logout
                        </button>
                ):(
                    <>
                        <Link to="/login" className='text-ink hover:opacity-60 transition'>
                            Login
                        </Link>
                        <Link to="/register" className='bg-ink text-cream px-4 py-2 rounded-md hover:opacity-90 transition'>
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};
export default Navbar;