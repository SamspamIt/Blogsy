import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Button from '../components/ui/Button';
import { Search, BookOpen, ArrowRight, Calendar, User, Tag, Sparkles } from 'lucide-react';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axiosInstance.get("/blogs");
                setBlogs(response.data);
            } catch (err) {
                console.error("Error fetching blogs:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    // Extract unique categories from blogs
    const categories = ["All", ...new Set(blogs.map(blog => blog.category).filter(Boolean))];

    // Filter blogs based on search query and category
    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = 
            (blog.title && blog.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (blog.excerpt && blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (blog.category && blog.category.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="bg-cream min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-ink/20 border-t-ink rounded-full animate-spin" />
                    <p className="text-ink/60 text-sm font-medium">Loading articles...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-cream min-h-screen px-6 md:px-12 py-12">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink/5 border border-ink/10 text-xs font-mono uppercase tracking-wider text-ink/70 mb-4">
                        <Sparkles size={13} className="text-amber-700" />
                        Explore Articles
                    </span>
                    <h1 className="font-serif text-4xl md:text-6xl text-ink font-bold leading-tight">
                        All Tech Stories & Guides
                    </h1>
                    <p className="text-ink/60 text-base md:text-lg mt-4">
                        Discover real debugging stories, project breakdowns, and practical knowledge from building software.
                    </p>
                </div>

                {/* Search & Category Filter Controls */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-8 border-b border-ink/10">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-96">
                        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40" />
                        <input
                            type="text"
                            placeholder="Search by title, topic, or keyword..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/70 border border-ink/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-ink outline-none focus:border-ink transition-all placeholder:text-ink/40 shadow-xs"
                        />
                    </div>

                    {/* Category Filter Pills */}
                    {categories.length > 1 && (
                        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                                        selectedCategory === cat
                                            ? 'bg-ink text-cream shadow-xs'
                                            : 'bg-white/60 border border-ink/10 text-ink/70 hover:bg-ink/5'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Blogs Grid */}
                {filteredBlogs.length === 0 ? (
                    <div className="text-center py-20 bg-white/40 border border-ink/10 rounded-2xl max-w-xl mx-auto">
                        <BookOpen size={40} className="mx-auto text-ink/30 mb-3" />
                        <h3 className="font-serif text-xl font-bold text-ink mb-1">No articles found</h3>
                        <p className="text-ink/50 text-sm mb-6">
                            {searchQuery ? `No results for "${searchQuery}"` : "No articles published yet."}
                        </p>
                        {searchQuery && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("All");
                                }}
                            >
                                Clear search filter
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredBlogs.map((blog) => (
                            <article
                                key={blog._id}
                                className="bg-white/60 border border-ink/10 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col group"
                            >
                                {/* Cover Image */}
                                {blog.coverImage ? (
                                    <Link to={`/blog/${blog.slug}`} className="block overflow-hidden h-48 relative">
                                        <img
                                            src={blog.coverImage}
                                            alt={blog.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {blog.category && (
                                            <span className="absolute top-3 left-3 bg-cream/90 backdrop-blur-md border border-ink/10 text-ink text-[11px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider">
                                                {blog.category}
                                            </span>
                                        )}
                                    </Link>
                                ) : (
                                    <div className="h-48 bg-gradient-to-br from-amber-100/50 via-cream to-blue-100/50 p-6 flex flex-col justify-end relative">
                                        {blog.category && (
                                            <span className="absolute top-3 left-3 bg-cream/90 backdrop-blur-md border border-ink/10 text-ink text-[11px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider">
                                                {blog.category}
                                            </span>
                                        )}
                                        <BookOpen className="text-ink/20 w-12 h-12 mb-2" />
                                    </div>
                                )}

                                {/* Content Body */}
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-3 text-xs text-ink/50 mb-3">
                                        {blog.createdAt && (
                                            <span className="flex items-center gap-1">
                                                <Calendar size={13} />
                                                {new Date(blog.createdAt).toLocaleDateString(undefined, {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        )}
                                        {blog.author?.name && (
                                            <span className="flex items-center gap-1">
                                                <User size={13} />
                                                {blog.author.name}
                                            </span>
                                        )}
                                    </div>

                                    <Link to={`/blog/${blog.slug}`} className="group-hover:text-amber-900 transition-colors">
                                        <h2 className="font-serif text-xl font-bold text-ink mb-2 line-clamp-2 leading-snug">
                                            {blog.title}
                                        </h2>
                                    </Link>

                                    <p className="text-ink/60 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
                                        {blog.excerpt || blog.content?.slice(0, 120) + "..."}
                                    </p>

                                    <div className="pt-4 border-t border-ink/10 mt-auto flex items-center justify-between">
                                        <Button
                                            to={`/blog/${blog.slug}`}
                                            variant="primary"
                                            size="sm"
                                            icon={ArrowRight}
                                            iconPosition="right"
                                        >
                                            Read Article
                                        </Button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blogs;
