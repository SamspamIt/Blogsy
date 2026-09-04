import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Feather, Code, Terminal, Rocket, Heart, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-cream min-h-screen px-6 md:px-12 py-16 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                {/* Hero Banner */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ink/5 border border-ink/10 text-xs font-mono uppercase tracking-wider text-ink/70 mb-6">
                        <Sparkles size={14} className="text-amber-700 dark:text-amber-400" />
                        About Blogsy
                    </span>
                    <h1 className="font-serif text-4xl md:text-6xl text-ink font-bold leading-tight mb-6">
                        Tech Knowledge, <br /> Born from Real Debugging.
                    </h1>
                    <p className="text-ink/70 text-lg md:text-xl leading-relaxed">
                        Blogsy isn't a recycled tutorial site. It's a living journal of real engineering stories, practical project breakdowns, and lessons learned while building software that actually ships.
                    </p>
                </div>

                {/* Core Philosophy Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    <div className="bg-white/80 dark:bg-zinc-900/80 border border-ink/10 dark:border-white/10 p-8 rounded-2xl flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-ink/5 dark:bg-white/10 flex items-center justify-center text-ink dark:text-cream mb-6">
                                <Terminal size={24} />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-ink dark:text-cream mb-3">
                                Real Debugging Stories
                            </h3>
                            <p className="text-ink/70 dark:text-cream/70 text-sm leading-relaxed">
                                Every line of code and architectural decision comes from actual production challenges, edge-case bugs, and real-world implementations.
                            </p>
                        </div>
                        <span className="font-mono text-xs text-ink/40 dark:text-cream/40 mt-6 block">01 / AUTHENTIC</span>
                    </div>

                    <div className="bg-white/80 dark:bg-zinc-900/80 border border-ink/10 dark:border-white/10 p-8 rounded-2xl flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-ink/5 dark:bg-white/10 flex items-center justify-center text-ink dark:text-cream mb-6">
                                <Code size={24} />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-ink dark:text-cream mb-3">
                                Zero-Assumed Knowledge
                            </h3>
                            <p className="text-ink/70 dark:text-cream/70 text-sm leading-relaxed">
                                Concepts explained logically step by step. We skip jargon and get straight to why solutions work and how to apply them.
                            </p>
                        </div>
                        <span className="font-mono text-xs text-ink/40 dark:text-cream/40 mt-6 block">02 / CLEAR</span>
                    </div>

                    <div className="bg-white/80 dark:bg-zinc-900/80 border border-ink/10 dark:border-white/10 p-8 rounded-2xl flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-ink/5 dark:bg-white/10 flex items-center justify-center text-ink dark:text-cream mb-6">
                                <Rocket size={24} />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-ink dark:text-cream mb-3">
                                Built to Ship
                            </h3>
                            <p className="text-ink/70 dark:text-cream/70 text-sm leading-relaxed">
                                Focused on momentum and completion — moving past theoretical tutorials into tangible projects that deploy successfully.
                            </p>
                        </div>
                        <span className="font-mono text-xs text-ink/40 dark:text-cream/40 mt-6 block">03 / PRACTICAL</span>
                    </div>
                </div>

                {/* Our Mission Statement Card */}
                <div className="bg-white/90 dark:bg-zinc-900/90 border border-ink/10 dark:border-white/10 rounded-3xl p-8 md:p-14 mb-20 shadow-xs">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 mb-4 text-amber-800 dark:text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
                            <Feather size={16} />
                            Our Mission
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl text-ink dark:text-cream font-bold mb-6 leading-tight">
                            Empowering developers to learn, build, and ship with confidence.
                        </h2>
                        <p className="text-ink/70 dark:text-cream/70 text-base md:text-lg leading-relaxed mb-8">
                            Software development is as much about perseverance as it is about code syntax. Blogsy was created to bridge the gap between "getting started" and "shipping to production", sharing honest lessons learned along the developer journey.
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            <Button to="/blogs" size="lg" variant="primary" icon={ArrowRight} iconPosition="right">
                                Explore Articles
                            </Button>
                            <Button to="/register" size="lg" variant="outline">
                                Join Community
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Key Values */}
                <div className="border-t border-ink/15 dark:border-white/10 pt-12">
                    <h3 className="font-serif text-2xl font-bold text-ink dark:text-cream mb-8 text-center">
                        Why Developers Read Blogsy
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-ink/10 dark:border-white/10 shadow-xs">
                            <div className="p-2.5 rounded-xl bg-ink/5 dark:bg-white/10 text-ink dark:text-cream shrink-0 mt-0.5">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-ink dark:text-cream text-base mb-1">Tested Code Snippets</h4>
                                <p className="text-ink/70 dark:text-cream/70 text-sm">No copy-paste bugs. All examples are extracted directly from running applications.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-ink/10 dark:border-white/10 shadow-xs">
                            <div className="p-2.5 rounded-xl bg-ink/5 dark:bg-white/10 text-ink dark:text-cream shrink-0 mt-0.5">
                                <Zap size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-ink dark:text-cream text-base mb-1">Fast & Uncluttered</h4>
                                <p className="text-ink/70 dark:text-cream/70 text-sm">Distraction-free reading experience with clean typography and dark mode support.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
