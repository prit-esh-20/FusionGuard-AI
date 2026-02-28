import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Menu, X, Terminal, Cpu, LineChart } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const links = [
        { name: 'Home', path: '/', icon: Shield },
        { name: 'Architecture', path: '/architecture', icon: Cpu },
        { name: 'Machine Learning', path: '/machine-learning', icon: Terminal },
        { name: 'Results', path: '/experimental-results', icon: LineChart },
    ];

    const handleDragClose = () => setIsOpen(false);

    return (
        <nav className="fixed w-full z-50 glass-panel border-b-0 border-dark-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2 group">
                        <Shield className="w-8 h-8 text-neon-cyan animate-pulse-glow rounded-full" />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-blue uppercase tracking-wider group-hover:neon-text-cyan transition-all">
                            FusionGuard AI
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {links.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="relative group flex items-center space-x-1"
                                >
                                    <span className={`text-sm font-medium transition-colors ${isActive ? 'text-neon-cyan' : 'text-gray-400 group-hover:text-white'}`}>
                                        {link.name}
                                    </span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-underline"
                                            className="absolute -bottom-6 left-0 right-0 h-0.5 bg-neon-cyan"
                                            initial={false}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                        <Link
                            to="/login"
                            className="px-4 py-2 border border-neon-cyan text-neon-cyan rounded-md font-medium hover:bg-neon-cyan/10 transition-all neon-border-cyan whitespace-nowrap"
                        >
                            Sys Login
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-400 hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Drawer */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="md:hidden glass-panel border-t border-dark-border"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {links.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={handleDragClose}
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-neon-cyan bg-neon-cyan/10' : 'text-gray-400 hover:text-white hover:bg-dark-surface'
                                        }`}
                                >
                                    <link.icon className="w-4 h-4" />
                                    <span>{link.name}</span>
                                </Link>
                            );
                        })}
                        <Link
                            to="/login"
                            onClick={handleDragClose}
                            className="block w-full text-center mt-4 px-4 py-2 border border-neon-cyan text-neon-cyan rounded-md font-medium hover:bg-neon-cyan/10 neon-border-cyan uppercase"
                        >
                            System Login
                        </Link>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
