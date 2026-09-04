import React from 'react';
import { Link } from 'react-router-dom';
import { Feather, Heart, ArrowUpRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#0b0c10] dark:bg-[#07080b] text-[#f5f1e8] border-t border-white/10 pt-16 pb-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/10">
                    
                    {/* Brand & Description Column (5 cols) */}
                    <div className="md:col-span-5 flex flex-col justify-between">
                        <div>
                            <Link to="/" className="flex items-center gap-2.5 mb-4 group w-fit">
                                <div className="w-9 h-9 rounded-xl bg-cream text-ink flex items-center justify-center group-hover:rotate-6 transition-transform shadow-xs">
                                    <Feather size={20} />
                                </div>
                                <span className="font-serif text-2xl text-cream font-black tracking-tight">
                                    Blogsy<span className="text-amber-500 text-3xl leading-none">.</span>
                                </span>
                            </Link>

                            <p className="text-white/60 text-sm max-w-md leading-relaxed mb-6">
                                Tech knowledge, real debugging stories, and project breakdowns. Built by developers, for curious minds who learn by shipping real software.
                            </p>
                        </div>

                        {/* Social Links using Clean SVGs */}
                        <div className="flex items-center gap-3">
                            <a
                                href="https://github.com/SamspamIt/Blogsy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all"
                                title="GitHub Repository"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                                </svg>
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all"
                                title="Twitter / X"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all"
                                title="LinkedIn"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Links Grid (7 cols) */}
                    <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {/* Navigation */}
                        <div>
                            <p className="text-xs uppercase tracking-widest text-white/40 mb-4 font-mono font-semibold">
                                Navigation
                            </p>
                            <ul className="flex flex-col gap-2.5 text-sm">
                                <li>
                                    <Link to="/" className="text-white/70 hover:text-cream transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/blogs" className="text-white/70 hover:text-cream transition-colors">
                                        All Articles
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about" className="text-white/70 hover:text-cream transition-colors">
                                        About Blogsy
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Topics */}
                        <div>
                            <p className="text-xs uppercase tracking-widest text-white/40 mb-4 font-mono font-semibold">
                                Topics
                            </p>
                            <ul className="flex flex-col gap-2.5 text-sm">
                                <li>
                                    <Link to="/blogs" className="text-white/70 hover:text-cream transition-colors">
                                        Debugging Stories
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/blogs" className="text-white/70 hover:text-cream transition-colors">
                                        Fullstack Tech
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/blogs" className="text-white/70 hover:text-cream transition-colors">
                                        Project Breakdowns
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Community & Account */}
                        <div>
                            <p className="text-xs uppercase tracking-widest text-white/40 mb-4 font-mono font-semibold">
                                Account
                            </p>
                            <ul className="flex flex-col gap-2.5 text-sm">
                                <li>
                                    <Link to="/login" className="text-white/70 hover:text-cream transition-colors">
                                        Sign In
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/register" className="text-white/70 hover:text-cream transition-colors">
                                        Create Account
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/SamspamIt/Blogsy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/70 hover:text-cream transition-colors flex items-center gap-1"
                                    >
                                        Source Code <ArrowUpRight size={13} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Bar */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
                    <p className="flex items-center gap-1.5">
                        © {new Date().getFullYear()} Blogsy. Built with <Heart size={13} className="text-red-500 fill-red-500 inline" /> for developers.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="font-mono text-[11px] text-white/30">
                            React · Redux · Node.js · Express
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
