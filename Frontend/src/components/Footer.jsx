import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='bg-ink text-cream px-8 py-16 mt-20'>
            <div className='max-w-6xl mx-auto'>
                <div className='flex flex-col md:flex-row justify-between gap-10 pb-12 border-b border-cream/15'>
                    <div>
                        <h3 className='font-serif text-3xl font-black mb-3'>
                            Blogsy
                        </h3>
                        <p className='text-cream/60 text-sm max-w-sm'>
                            Tech Knowledge, debugging stories, and real project breakdowns - written by someone actually building things.
                        </p>
                    </div>
                    <div className='flex gap-16'>
                        <div>
                            <p className='text-sm uppercase tracking-widest text-cream/40 mb-4'>
                                Explore
                            </p>
                            <div className='flex flex-col gap-2 text-sm'>
                                <Link to="/" className='text-cream/80 hover:text-cream transition'>
                                    Home
                                </Link>
                                <a href='#blogs' className='text-cream/80 hover:text-cream transition'>
                                    All Blogs
                                </a>
                            </div>
                        </div>
                        <div>
                            <p className='text-sm uppercase tracking-widest text-cream/40 mb-4'>
                                Connect
                            </p>
                            <div className='flex flex-col gap-2 text-sm'>
                                <a href='https://github.com/SamspamIt/Blogsy' target='_blank' rel='noopener noreferrer'
                                    className='text-cream/80 hover:text-cream transition'>
                                    Github
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <p className='text-cream/40 text-sm mt-8'>
                    ©{new Date().getFullYear()} Blogsy. Built with ❤️
                </p>
            </div>
        </footer>
    )
}

export default Footer
