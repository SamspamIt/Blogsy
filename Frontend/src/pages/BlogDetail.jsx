import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import Button from "../components/ui/Button";
import { ArrowLeft } from "lucide-react";

const BlogDetail = () => {

    const{ slug } =useParams();
    const [blog, setBlog] = useState(null);
    const[loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(()=>{
        const fetchBlog = async()=>{
            try{
                const response = await axiosInstance.get(`/blogs/${slug}`);
                setBlog(response.data);
            }catch(err){
                setError("Blog not found");
            }finally{
                setLoading(false);
            }
        };
        fetchBlog();
    },[slug]); //re-renders when blog changes

    if(loading){
        return(
            <div className='bg-cream min-h-screen flex items-center justify-center'>
                <p className='text-ink'>
                    Loading...
                </p>
            </div>
        );
    }

    if(error || !blog){
        return(
            <div className='bg-cream min-h-screen flex items-center  justify-center'>
                <p className='text-ink'>
                    {error || "Blog not found"}
                </p>
            </div>
        )
    }
    return (
        <div className='bg-cream min-h-screen px-8 py-12'>
            <div className='max-w-6xl mx-auto'>
                <div className="mb-10">
                    <Button
                        to="/"
                        variant="ghost"
                        size="sm"
                        icon={ArrowLeft}
                        iconPosition="left"
                    >
                        Back to all blogs
                    </Button>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
                    
                    {/* Left Side */}
                    {blog.coverImage && (
                        <div className='md:sticky md:top-12'>
                            <img src={blog.coverImage} alt={blog.title}
                                className='w-full rounded-lg object-cover aspect-4/5'/>
                        </div>
                    )}

                    {/* Right Side */}
                    <div className={!blog.coverImage ? "md:col-span-2 max-w-2xl" : ""}>
                        <span className='block text-xs uppercase tracking-wide text-ink/50'>
                            {blog.category}
                        </span>
                        <h1 className='font-serif text-4xl text-ink mt-2 mb-4'>
                            {blog.title}
                        </h1>
                        <p className='text-ink/60 text-sm mb-8'>
                            By {blog.author?.name}·{""}
                            {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                        <p className='text-ink/90 leading-relaxed whitespace-pre-line'>
                            {blog.content}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
