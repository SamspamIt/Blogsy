import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import { clearUser } from "../redux/authSlice.js";
import Button from './ui/Button';
import ThemeToggle from './ui/ThemeToggle';
import { PenSquare, LogIn, LogOut, ArrowRight, Menu, X, User, Feather } from 'lucide-react';

const Navbar = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/auth/logout");
            dispatch(clearUser());
            setMobileMenuOpen(false);
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-ink/10 transition-all shadow-xs">
            <nav className="max-w-7xl mx-auto px-6 md:px-10 py-3.5 flex items-center justify-between">
                {/* Brand Logo */}
                <Link to="/" className="flex items-center gap-2 group focus:outline-none">
                    <div className="w-8 h-8 rounded-lg bg-ink text-cream flex items-center justify-center group-hover:rotate-6 transition-transform shadow-xs">
                        <Feather size={18} />
                    </div>
                    <span className="font-serif text-2xl text-ink font-black tracking-tight flex items-center">
                        Blogsy<span className="text-amber-700 text-3xl leading-none">.</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-2">
                    <Link
                        to="/"
                        className={`text-sm font-medium transition-all duration-200 px-4 py-2 rounded-full ${
                            isActive('/') 
                                ? 'bg-ink/10 text-ink font-semibold' 
                                : 'text-ink/70 hover:text-ink hover:bg-ink/5'
                        }`}
                    >
                        Home
                    </Link>

                    <Link
                        to="/blogs"
                        className={`text-sm font-medium transition-all duration-200 px-4 py-2 rounded-full ${
                            isActive('/blogs') 
                                ? 'bg-ink/10 text-ink font-semibold' 
                                : 'text-ink/70 hover:text-ink hover:bg-ink/5'
                        }`}
                    >
                        Blogs
                    </Link>

                    <Link
                        to="/about"
                        className={`text-sm font-medium transition-all duration-200 px-4 py-2 rounded-full ${
                            isActive('/about') 
                                ? 'bg-ink/10 text-ink font-semibold' 
                                : 'text-ink/70 hover:text-ink hover:bg-ink/5'
                        }`}
                    >
                        About
                    </Link>

                    {isAuthenticated && user?.role === "admin" && (
                        <Link
                            to="/create-blog"
                            className={`text-sm font-medium transition-all duration-200 px-4 py-2 rounded-full flex items-center gap-1.5 ${
                                isActive('/create-blog') 
                                    ? 'bg-ink/10 text-ink font-semibold' 
                                    : 'text-ink/70 hover:text-ink hover:bg-ink/5'
                            }`}
                        >
                            <PenSquare size={15} />
                            Write
                        </Link>
                    )}
                </div>

                {/* Desktop User Actions */}
                <div className="hidden md:flex items-center gap-3">
                    <ThemeToggle />
                    {isAuthenticated ? (
                        <>
                            {/* User Profile Pill */}
                            <div className="flex items-center gap-2 bg-white/60 border border-ink/10 px-3 py-1.5 rounded-full text-xs font-medium text-ink/80 mr-1">
                                <div className="w-5 h-5 rounded-full bg-ink/10 flex items-center justify-center text-ink">
                                    <User size={12} />
                                </div>
                                <span className="font-medium max-w-[120px] truncate">{user?.name || "User"}</span>
                                {user?.role === "admin" && (
                                    <span className="bg-ink text-cream text-[10px] uppercase font-mono px-1.5 py-0.5 rounded tracking-wider">
                                        Admin
                                    </span>
                                )}
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                icon={LogOut}
                                iconPosition="right"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="ghost"
                                size="sm"
                                icon={LogIn}
                                iconPosition="left"
                                to="/login"
                            >
                                Login
                            </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                icon={ArrowRight}
                                iconPosition="right"
                                to="/register"
                            >
                                Register
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle Button */}
                <div className="md:hidden flex items-center gap-2">
                    <ThemeToggle />
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 text-ink hover:bg-ink/5 rounded-lg transition-colors focus:outline-none"
                        aria-label="Toggle Navigation Menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation Drawer */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-cream border-b border-ink/15 px-6 py-5 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
                    <Link
                        to="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-base font-medium py-2 border-b border-ink/5 ${
                            isActive('/') ? 'text-ink font-bold' : 'text-ink/70'
                        }`}
                    >
                        Home
                    </Link>

                    <Link
                        to="/blogs"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-base font-medium py-2 border-b border-ink/5 ${
                            isActive('/blogs') ? 'text-ink font-bold' : 'text-ink/70'
                        }`}
                    >
                        Blogs
                    </Link>

                    <Link
                        to="/about"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-base font-medium py-2 border-b border-ink/5 ${
                            isActive('/about') ? 'text-ink font-bold' : 'text-ink/70'
                        }`}
                    >
                        About
                    </Link>

                    {isAuthenticated && user?.role === "admin" && (
                        <Link
                            to="/create-blog"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`text-base font-medium py-2 border-b border-ink/5 flex items-center gap-2 ${
                                isActive('/create-blog') ? 'text-ink font-bold' : 'text-ink/70'
                            }`}
                        >
                            <PenSquare size={18} />
                            Write Blog
                        </Link>
                    )}

                    <div className="pt-2 flex flex-col gap-3">
                        {isAuthenticated ? (
                            <>
                                <div className="flex items-center gap-2 py-2 text-sm text-ink/80">
                                    <User size={16} />
                                    <span>Logged in as <strong>{user?.name}</strong></span>
                                    {user?.role === "admin" && (
                                        <span className="bg-ink text-cream text-[10px] font-mono px-1.5 py-0.5 rounded">
                                            Admin
                                        </span>
                                    )}
                                </div>
                                <Button
                                    variant="outline"
                                    size="md"
                                    fullWidth
                                    icon={LogOut}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <div className="flex flex-col gap-3 w-full">
                                <Button
                                    variant="outline"
                                    size="md"
                                    fullWidth
                                    icon={LogIn}
                                    to="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="primary"
                                    size="md"
                                    fullWidth
                                    icon={ArrowRight}
                                    to="/register"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Register
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;