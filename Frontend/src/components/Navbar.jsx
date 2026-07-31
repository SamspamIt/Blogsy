import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='bg-cream border-b border-ink/10 px-8 py-4 flex items-center justify-between'>
            <Link to="/" className='font-serif text-2xl text-ink font-semibold'>
                Blogsy .
            </Link>
            <div className='flex items-center gap-6'>
                <Link to="/" className='text-ink hover:opacity-60 transition'>
                    Home
                </Link>
                <Link to="/login" className='text-ink hover:opacity-60 transition'>
                    Login
                </Link>
                <Link to="/register" className='bg-ink text-cream px-4 py-2 rounded-md hover:opacity-90 transition'>
                    Register
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;
