import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ className = "" }) => {
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className={`p-2 rounded-xl bg-ink/5 dark:bg-white/10 text-ink hover:bg-ink/10 dark:hover:bg-white/20 transition-all duration-300 flex items-center justify-center focus:outline-none select-none border border-ink/10 dark:border-white/10 ${className}`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
        >
            {isDark ? (
                <Sun size={18} className="text-amber-400 animate-in spin-in-90 duration-300" />
            ) : (
                <Moon size={18} className="text-ink/80 animate-in spin-in-[-90deg] duration-300" />
            )}
        </button>
    );
};

export default ThemeToggle;
