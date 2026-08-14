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
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview,setImagePreview] = useState("");
    const [uploading, setUploading] = useState(false);

    const navigate = useNavigate();
    const {user}=useSelector((state)=>state.auth);

    //random file chose by user
    const handleImageChange =(e)=>{
        const file = e.target.files[0];
        if(!file)
            return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file)) ; // for local preview
    }

    //convert file into base 64 string
    const convertToBase64 = (file)=>{
        return new Promise((resolve, reject )=>{
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload =()=> resolve(reader.result);
            reader.onerror=(error)=> reject(error);
        });
    };
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError("");


        try{
            let uploadedImageUrl = "";

            //upload image
            if(imageFile){
                setUploading(true);
                const base64Image = await convertToBase64(imageFile);

                const uploadResponse = await axiosInstance.post("/upload",{
                    image:base64Image,
                    fileName:imageFile.name,
                });
                console.log("Upload response:", uploadResponse.data);
                uploadedImageUrl = uploadResponse.data.url
                setUploading(false);
            }

            //create blog with coverImage url
            const blogPayload = {
                title,
                category,
                excerpt,
                content,
                coverImage: uploadedImageUrl,
            }
            console.log("Sending blog payload:", blogPayload);
            
            const response = await axiosInstance.post("/blogs", blogPayload);

            navigate(`/blog/${response.data.slug}`);
        }catch(err){
            setUploading(false);
            setError(err.response?.data?.message || "Something went wrong");
            console.error(err)
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
        <div className='bg-cream min-h-screen flex items-center justify-center px-4 py-12'>
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
                    <div>
                        <label className='text-ink text-sm mb-2 block'>
                            Cover Image (optional)
                        </label>
                        <input type='file'
                            accept='image/*'
                            onChange={handleImageChange}
                            className='text-ink text-sm'
                        />
                        {imagePreview && (
                            <img src={imagePreview} alt='Preview'
                                className='mt-3 w-full max-h-64 object-cover rounded-md'/>
                        )}
                    </div>
                    <button type='submit'
                        disabled={uploading}
                        className='bg-ink text-cream py-2 rounded-md hover:opacity-90 transition disabled:opacity-50'>
                        {uploading ? "Uploading Image..." :"Publish Blog"}
                    </button>
                </form>
        </div>
    );
};
export default CreateBlog;