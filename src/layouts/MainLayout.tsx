import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-dark-base flex flex-col relative text-gray-100">
            <Navbar />

            {/* Background Animated Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 w-full h-1 bg-neon-cyan/50 animate-scanline" />
            </div>

            <main className="flex-grow pt-16 z-10 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full"
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>

            <footer className="border-t border-dark-border/50 bg-dark-surface/50 backdrop-blur-md z-10">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} FusionGuard AI. Final Year Robotics Project.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <span className="flex items-center space-x-2">
                            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                            <span>System Online</span>
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
