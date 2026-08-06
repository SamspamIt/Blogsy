import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from './components/Navbar';
import BlogDetail from './pages/BlogDetail';
import CreateBlog from './pages/CreateBlog';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/authSlice';
import axiosInstance from './api/axiosInstance';

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
            <div className='bg-cream min-h-screen flex items-center justify-center'>
                <p className='text-ink'>
                    Loading....
                </p>
            </div>
        )
    }
    return(
        <>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/blog/:slug' element={<BlogDetail/>}  />
                <Route path='/create-blog' element={< CreateBlog/>} />
            </Routes>
        </>
    );
};

export default App;