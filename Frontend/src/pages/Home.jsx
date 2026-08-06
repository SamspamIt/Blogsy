import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const Home = () => {

    const [blogs, setBlogs]= useState([]);
    const [loading, setLoading]= useState(true);

    useEffect(()=>{
        const fetchBlogs = async ()=>{
            try{
                const response = await axiosInstance.get("/blogs");
                setBlogs(response.data);
            }catch(err){
                console.error(err);
            }finally{
                setLoading(false);
            }
        };

        fetchBlogs();
    },[]);

    if(loading){
        return(
            <div className='bg-cream min-h-screen flex items-center justify-center'>
                <p className='text-ink'>
                    Loading...
                </p>
            </div>
        );
    }
    return (
        <div className='bg-cream min-h-screen px-8 py-12'>
            <h1 className='font-serif text-4xl text-ink mb-8'>
                Tech Knowledge
            </h1>
            {blogs.length === 0 ?(
                <p className='text-ink/60'>
                    No Blog
                </p>
            ):(
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {blogs.map((blog)=>(
                    <Link to={`/blog/${blog.slug}`}
                        key={blog._id}
                        className='bg-white/50 rounded-lg p-5 hover:shadow-md transition'>
                            <span className='text-xs uppercase tracking-wide text-ink/50'>
                                {blog.category}
                            </span>
                            <h2 className='font-serif text-xl text-ink mt-2 mb-2'>
                                {blog.title}
                            </h2>
                            <p className='text-ink/70 text-sm'>
                                {blog.excerpt}
                            </p>
                    </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
