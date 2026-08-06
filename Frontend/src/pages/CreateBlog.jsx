import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosInstance from '../api/axiosInstance';

const CreateBlog = () => {

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const {user}=useSelector((state)=>state.auth);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await axiosInstance.post("/blogs",{
                title,
                category,
                excerpt,
                content,
            });
            navigate(`/blog/${response.data.slug}`);
        }catch(err){
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    if(!user || user.role !== "admin"){
        return (
            <div className='bg-cream min-h-screen flex items-center justify-center'>
                <p className='text-ink'>
                    Access denied - Admins only
                </p>
            </div>
        )
    }
    return (
        <div className='bg-cream min-h-screen flex items-center justify-center'>
            <form onSubmit={handleSubmit}
                className='bg-white/50 p-8 rounded=lg w-full max-w-2xl flex flex-col gap-4'>
                    <h1 className='font-serif text-3xl text-ink mb-2'>
                        Create New Blog
                    </h1>
                    {error && 
                        <p className='text-red-600 text-sm'>
                            {error}
                        </p>
                    }
                    <input type='text'
                        placeholder='Title'
                        value={title}
                        onChange={(e)=> setTitle(e.target.value)}
                        className='border border-ink/20 rounded-md px-4 py-2 outline-none focus:border-ink'
                        required
                    />
                    <input type='text'
                        placeholder='Category (e.g. React, Node.js)'
                        value={category}
                        onChange={(e)=> setCategory(e.target.value)}
                        className='border border-ink/20 rounded-md px-4 py-2 outline-none focus:border-ink'
                        required
                    />
                    <input type='text'
                        placeholder='Short excerpt (preview text)'
                        value={excerpt}
                        onChange={(e)=> setExcerpt(e.target.value)}
                        className='border border-ink/20 rounded-md px-4 py-2 outline-none focus:border-ink'
                        required
                    />
                    <textarea 
                        placeholder='Blog content....'
                        value={content}
                        onChange={(e)=> setContent(e.target.value)}
                        className='border border-ink/20 rounded-md px-4 py-2 outline-none focus:border-ink'
                        required
                    />
                    <button type='submit'
                        className='bg-ink text-cream py-2 rounded-md hover:opacity-90 transition'>
                        Publish Blog
                    </button>
                </form>
        </div>
    )
}
export default CreateBlog;