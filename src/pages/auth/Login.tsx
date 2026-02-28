import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Shield, User, Key, ChevronRight, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isUnlocked, setIsUnlocked] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/user/dashboard';

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            setError('System credentials required.');
            return;
        }

        setIsLoading(true);
        setError('');

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (username === 'admin' && password === 'admin') {
            setIsUnlocked(true);
            login('admin');
            setTimeout(() => navigate(from === '/' ? '/admin/dashboard' : from, { replace: true }), 1000);
        } else if (username === 'user' && password === 'user') {
            setIsUnlocked(true);
            login('user');
            setTimeout(() => navigate(from === '/' ? '/user/dashboard' : from, { replace: true }), 1000);
        } else {
            setError('Access Denied: Invalid parameters.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark-base">
            {/* Animated Hex Grid Background */}
            <div className="absolute inset-0 z-0 opacity-20"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-opacity='0' stroke='%2300F0FF' stroke-width='1'/%3E%3C/svg%3E")`,
                    backgroundSize: '40px 40px',
                    animation: 'scanline 20s linear infinite'
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-base to-transparent z-0" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, type: 'spring' }}
                className="w-full max-w-md p-8 glass-card border-dark-border z-10 relative shadow-login before:content-[''] before:absolute before:inset-0 before:border before:border-neon-cyan/20 before:rounded-xl before:animate-pulse"
            >
                <div className="text-center mb-8">
                    <motion.div
                        animate={{ rotateY: isUnlocked ? 180 : 0 }}
                        transition={{ duration: 0.8, type: 'spring' }}
                        className="w-20 h-20 bg-dark-surface/80 rounded-full border border-dark-border flex items-center justify-center mx-auto mb-4 neon-border-cyan shadow-lg relative"
                    >
                        {isUnlocked ? (
                            <Unlock className="w-10 h-10 text-neon-green ml-1 drop-shadow-neon-green" />
                        ) : (
                            <Lock className="w-10 h-10 text-neon-cyan drop-shadow-neon-cyan" />
                        )}
                        {/* Spinning Radar Effect */}
                        <div className="absolute inset-0 rounded-full border border-neon-cyan/30 border-r-transparent animate-spin" style={{ animationDuration: '3s' }} />
                    </motion.div>

                    <h2 className="text-3xl font-extrabold text-white tracking-widest relative inline-block">
                        AUTHENTICATION
                        <motion.div
                            className="absolute -bottom-2 left-0 h-0.5 bg-neon-cyan"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ delay: 0.5, duration: 1 }}
                        />
                    </h2>
                    <p className="text-neon-cyan text-sm uppercase tracking-widest mt-4 opacity-80 font-mono">
                        System Sub-routine 0xA1
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-red-500/10 border border-neon-red/50 text-neon-red px-4 py-3 rounded-md text-sm font-mono flex items-center space-x-2 animate-pulse-red"
                            >
                                <Shield className="w-4 h-4" />
                                <span>{error}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-4">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-500 group-focus-within:text-neon-cyan transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Operator ID (admin or user)"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={isLoading || isUnlocked}
                                className="w-full pl-10 pr-3 py-3 bg-dark-surface/50 border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all font-mono"
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Key className="h-5 w-5 text-gray-500 group-focus-within:text-neon-cyan transition-colors" />
                            </div>
                            <input
                                type="password"
                                placeholder="Access Key (admin or user)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading || isUnlocked}
                                className="w-full pl-10 pr-3 py-3 bg-dark-surface/50 border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all font-mono"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || isUnlocked}
                        className={`w-full py-4 px-4 rounded-lg flex items-center justify-center space-x-2 font-bold uppercase tracking-widest transition-all ${isUnlocked
                                ? 'bg-neon-green text-black neon-border-green'
                                : 'bg-neon-cyan/10 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black neon-border-cyan group'
                            }`}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Decrypting...</span>
                            </>
                        ) : isUnlocked ? (
                            <>
                                <Unlock className="w-5 h-5" />
                                <span>Access Granted</span>
                            </>
                        ) : (
                            <>
                                <span>Initialize Login</span>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 border-t border-dark-border overflow-hidden pt-4 text-center">
                    <span className="text-[10px] text-gray-600 font-mono tracking-widest uppercase flex items-center justify-center">
                        <Shield className="w-3 h-3 mr-1" />
                        FusionGuard Encrypted Protocol
                    </span>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
