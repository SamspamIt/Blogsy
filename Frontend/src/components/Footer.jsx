import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='bg-[#0a0a0a] dark:bg-[#08090c] text-[#f5f1e8] border-t border-transparent dark:border-white/10 px-8 py-16 mt-20 transition-colors duration-300'>
            <div className='max-w-6xl mx-auto'>
                <div className='flex flex-col md:flex-row justify-between gap-10 pb-12 border-b border-[#f5f1e8]/15'>
                    <div>
                        <h3 className='font-serif text-3xl font-black mb-3 text-[#f5f1e8]'>
                            Blogsy.
                        </h3>
                        <p className='text-[#f5f1e8]/60 text-sm max-w-sm leading-relaxed'>
                            Tech Knowledge, debugging stories, and real project breakdowns - written by someone actually building things.
                        </p>
                    </div>
                    <div className='flex gap-16'>
                        <div>
                            <p className='text-sm uppercase tracking-widest text-[#f5f1e8]/40 mb-4 font-mono'>
                                Explore
                            </p>
                            <div className='flex flex-col gap-2.5 text-sm'>
                                <Link to="/" className='text-[#f5f1e8]/80 hover:text-[#f5f1e8] transition-colors'>
                                    Home
                                </Link>
                                <Link to="/blogs" className='text-[#f5f1e8]/80 hover:text-[#f5f1e8] transition-colors'>
                                    All Blogs
                                </Link>
                                <Link to="/about" className='text-[#f5f1e8]/80 hover:text-[#f5f1e8] transition-colors'>
                                    About Us
                                </Link>
                            </div>
                        </div>
                        <div>
                            <p className='text-sm uppercase tracking-widest text-[#f5f1e8]/40 mb-4 font-mono'>
                                Connect
                            </p>
                            <div className='flex flex-col gap-2.5 text-sm'>
                                <a href='https://github.com/SamspamIt/Blogsy' target='_blank' rel='noopener noreferrer'
                                    className='text-[#f5f1e8]/80 hover:text-[#f5f1e8] transition-colors'>
                                    Github
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <p className='text-[#f5f1e8]/40 text-sm mt-8'>
                    ©{new Date().getFullYear()} Blogsy. Built with ❤️
                </p>
            </div>
        </footer>
    )
}

export default Footer
