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
                <p className='text-ink/50 text-sm'>
                    Loading...
                </p>
            </div>
        );
    }
    return (
        <div className='bg-cream min-h-screen'>

            {/* Hero Section */}
            <div className='text-center px-8 pt-24 pb-20 bg-linear-to-br from-blue-100 via-cream to-pink-100'>
                <h1 className='font-serif text-5xl text-ink md:text-7xl leading-[1.05] max-w-4xl mx-auto'>
                    Tech Knowledge, <br/> Built for curios minds.
                </h1>
                <p className='text-ink/60 text-lg mt-6 max-w-xl mx-auto'>
                    Real debugging stories, project breakdowns, and lessons from building things that actually ship.
                </p>
                <div className='flex items-center justify-center gap-4 mt-10'>
                    <a href='#blogs' className='bg-ink text-cream px-6 py-3 text-sm flex-center gap-2 hover:opacity-85 transition'>
                        <span>▪</span>Explore blogs
                    </a>
                    <Link to="/register" className='border border-ink text-ink px-6 py-3 flex items-center gap-2 hover:bg-ink hover:text-cream transition'>
                        <span>▪</span>Join Blogsy
                    </Link>
                </div>
            </div>

            {/* What you get / numbered list section */}
            <div className='px-8 py-20'>
                <div className='max-w-4xl mx-auto'>
                    <h2 className='font-serif text-3xl md:text-2xl-4xl text-ink text-center mb-14'>
                        Everything you need to <br/> learn, build, and ship.
                    </h2>
                    <div className='border-t border-ink/15'>
                        <div className='flex justify-between items-start py-6 border-b border-ink/15'>
                            <div>
                                <h3 className='font-serif text-xl font-bold text-ink'>
                                    Read
                                </h3>
                                <p className='text-ink/60 text-sm mt-1'>
                                    Real debugging stories and project breakdowns, written as they happened.
                                </p>
                            </div>
                            <span className='text-ink/30 text-sm font-mono'>
                                001
                            </span>
                        </div>
                        <div className='flex justify-between items-start py-6 border-b border-ink/15'>
                            <div>
                                <h3 className='font-serif text-xl font-bold text-ink'>
                                    Learn
                                </h3>
                                <p className='text-ink/60 text-sm mt-1'>
                                    Logic and concepts explained step, by step, no assumed knowledge.
                                </p>
                            </div>
                            <span className='text-ink/30 text-sm font-mono'>
                                002
                            </span>
                        </div>
                        <div className='flex justify-between items-start py-6 border-b border-ink/15'>
                            <div>
                                <h3 className='font-serif text-xl font-bold text-ink'>
                                    Build
                                </h3>
                                <p className='text-ink/60 text-sm mt-1'>
                                    Practical takeaways you can apply to your own projects immediately.
                                </p>
                            </div>
                            <span className='text-ink/30 text-sm font-mono'>
                                003
                            </span>
                        </div>
                        <div className='flex justify-between items-start py-6 border-b border-ink/15'>
                            <div>
                                <h3 className='font-serif text-xl font-bold text-ink'>
                                    Ship
                                </h3>
                                <p className='text-ink/60 text-sm mt-1'>
                                    Focused on progress — things that actually get finished and deployed.
                                </p>
                            </div>
                            <span className='text-ink/30 text-sm font-mono'>
                                004
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Blogsy */}
            <div className='px-8 pb-20'>
                <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='bg-white/50 p-8 border border-ink/10'>
                        <p className='text-3xl mb-4'>
                            ✎
                        </p>
                        <h3 className='font-serif text-xl font-bold text-ink mb-2'>
                            Real, not recycled
                        </h3>
                        <p className='text-ink/60 text-sm leading-relaxed'>
                            Every post comes from actual debugging sessions and projects built from scratch — no generic tutorials.
                        </p>
                    </div>
                    <div className='bg-white/50 p-8 border border-ink/10'>
                        <p className='text-3xl mb-4'>
                            ◈
                        </p>
                        <h3 className='font-serif text-xl font-bold text-ink mb-2'>
                            Beginner-friendly logic
                        </h3>
                        <p className='text-ink/60 text-sm leading-relaxed'>
                            Concepts explained the way they were actually learned — step by step, no assumed knowledge.
                        </p>
                    </div>
                    <div className='bg-white/50 p-8 border border-ink/10'>
                        <p className='text-3xl mb-4'>
                            ↗
                        </p>
                        <h3 className='font-serif text-xl font-bold text-ink mb-2'>
                            Built to ship
                        </h3>
                        <p className='text-ink/60 text-sm leading-relaxed'>
                            Focused on things that actually get finished and deployed — progress over perfection.
                        </p>
                    </div>
                </div>
            </div>

            {/* Featured Blog Section */}
            {blogs.length > 0 && (
                <div className='px-8 pb-4'>
                    <div className='max-w-4xl mx-auto bg-white/50 border border-ink/10 grid grid-cols-1 md:grid-cols-2 gap-0'>
                        {blogs[0].coverImage && (
                            <img src={blogs[0].coverImage} alt={blogs[0].title}
                                className='w-full h-64 md:h-full object-cover'/>
                        )}
                        <div className='p-8 flex flex-col justify-center'>
                            <span className='text-sm uppercase tracking-widest text-ink/50 mb-2'>
                                Featured
                            </span>
                            <h3 className='font-serif text-2xl font-bold text-ink mb-3'>
                                {blogs[0].title}
                            </h3>
                            <p className='text-ink/60 text-sm mb-6'>
                                {blogs[0].excerpt}
                            </p>
                            <Link to={`/blog/${blogs[0].slug}`}
                                className='bg-ink text-cream px-5 py-2.5 text-sm w-fit hover:opacity-85 transition'>
                                    Read full post
                                </Link>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Blog List Section */}
            <div id='blogs' className='max-w-4xl mx-auto px-8 pb-20'>
                {blogs.length === 0 ?(
                    <p className='text-ink/50'>
                        No Blog yet.
                    </p>
                    ):(
                    <div className='border-t border-ink/15'>
                        {blogs.map((blog)=>(
                            <Link to={`/blog/${blog.slug}`}
                                key={blog._id}
                                className='flex items-center gap-6 py-6 border-b border-ink/15 group'>

                                {blog.coverImage && (
                                    <div className='w-28 h-20 shrink-0 overflow-hidden rounded-md'>
                                        <img src={blog.coverImage} alt={blog.title}
                                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'/>
                                    </div>
                                )}
                                <div>
                                    <h2 className='font-serif text-xl md:text-2xl text-ink font-bold group-hover:opacity-60 transition-opacity duration-300'>
                                        {blog.title}
                                    </h2>
                                    <p className='text-ink/50 text-sm mt-1'>
                                        {blog.category} · {blog.excerpt?.slice(0, 60)}...
                                    </p>
                                </div>
                        </Link>
                    ))}
                    </div>
                    )}
            </div>
        </div>
    );
};

export default Home;