import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from './components/Navbar';
import BlogDetail from './pages/BlogDetail';
import CreateBlog from './pages/CreateBlog';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/authSlice';
import axiosInstance from './api/axiosInstance';
import Footer from './components/Footer';

function App(){

    const dispatch = useDispatch();
    const[checkingAuth, setCheckingAuth] = useState(true);

    useEffect(()=>{
        const checkLoggedIn = async()=>{
            try{
                const response = await axiosInstance.get("/auth/me");
                dispatch(setUser(response.data));
            }catch(err){

            }finally{
                setCheckingAuth(false);
            }
        };
        checkLoggedIn();
    },[dispatch]);

    if(checkingAuth){
        return(
            <div className='bg-cream min-h-screen flex flex-col items-center justify-center gap-6'>
                <div className='flex gap-2'>
                    <span className='w-4 h-4 bg-ink rounded-full animate-bounce [animation-delay:-0.3s]'></span>
                    <span className='w-4 h-4 bg-ink rounded-full animate-bounce [animation-delay:-0.15s]'></span>
                    <span className='w-4 h-4 bg-ink rounded-full animate-bounce'></span>
                </div>
                <p className='font-serif text-xl text-ink'>
                    Getting your stories ready...
                </p>
            </div>
        )
    }
    return(
        <>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/blogs' element={<Blogs/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/blog/:slug' element={<BlogDetail/>} />
                <Route path='/create-blog' element={<CreateBlog/>} />
            </Routes>
            <Footer/>
        </>
    );
};

export default App;