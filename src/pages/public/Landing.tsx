import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Eye, Cpu, BellRing, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, desc, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5, type: 'spring' }}
        whileHover={{ scale: 1.05, y: -5 }}
        className="glass-card p-6 flex flex-col items-center text-center group border-dark-border hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all cursor-pointer"
    >
        <div className="w-16 h-16 rounded-full bg-dark-base border border-dark-border flex items-center justify-center mb-4 group-hover:neon-border-cyan transition-all">
            <Icon className="w-8 h-8 text-neon-cyan group-hover:animate-pulse" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-neon-cyan transition-colors">{title}</h3>
        <p className="text-gray-400 text-sm">{desc}</p>
    </motion.div>
);

const PipelineNode = ({ label, delay, icon: Icon, isLast }: any) => (
    <div className="flex items-center">
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay, duration: 0.5 }}
            className="glass-card p-4 flex flex-col items-center relative z-10 w-32 border-neon-blue/40"
        >
            <Icon className="w-6 h-6 text-neon-blue mb-2" />
            <span className="text-xs font-bold uppercase text-center text-gray-300">{label}</span>
        </motion.div>
        {!isLast && (
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: delay + 0.3, duration: 0.4 }}
                className="h-1 w-12 md:w-20 bg-gradient-to-r from-neon-blue to-neon-cyan origin-left relative"
            >
                <motion.div
                    className="absolute inset-0 bg-white w-full h-full opacity-50 blur-[2px]"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
            </motion.div>
        )}
    </div>
);

const Landing = () => {
    return (
        <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-32">
            {/* Hero Section */}
            <section className="text-center flex flex-col items-center justify-center min-h-[60vh] relative">
                <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="w-[600px] h-[600px] border border-neon-cyan rounded-full border-dashed animate-[spin_20s_linear_infinite]" />
                    <div className="w-[400px] h-[400px] border border-neon-blue rounded-full border-dashed animate-[spin_15s_linear_infinite_reverse] absolute" />
                    <div className="w-[200px] h-[200px] border border-neon-red rounded-full border-solid animate-pulse absolute" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 space-y-6"
                >
                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-panel border-neon-cyan/50 text-neon-cyan animate-pulse-glow mb-4">
                        <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
                        <span className="text-xs font-bold tracking-widest uppercase">System Online • Monitoring Active</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                        <span className="block text-white pb-2 text-shadow-sm">FUSIONGUARD AI</span>
                        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan via-neon-blue to-purple-500 pb-2">
                            AUTONOMOUS SECURITY
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mt-6 leading-relaxed">
                        Next-generation robotic patrolling system powered by sensor fusion, real-time machine learning, and advanced computer vision for total perimeter defense.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-10">
                        <Link to="/login">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-neon-cyan/10 border border-neon-cyan text-neon-cyan font-bold rounded-lg uppercase tracking-wide flex items-center space-x-2 hover:bg-neon-cyan hover:text-dark-base transition-all neon-border-cyan group"
                            >
                                <span>Enter Dashboard</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>

                        <Link to="/architecture">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 glass-panel border-dark-border text-white font-bold rounded-lg uppercase tracking-wide hover:border-gray-400 transition-all group"
                            >
                                <span>View Architecture</span>
                                <Cpu className="w-5 h-5 inline-block ml-2 group-hover:rotate-12 transition-transform" />
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Highlights Section */}
            <section className="space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wide">SYSTEM HIGHLIGHTS</h2>
                    <div className="w-24 h-1 bg-neon-cyan mx-auto rounded-full neon-border-cyan" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FeatureCard icon={Activity} title="Thermal Detection" desc="Advanced IR arrays instantly detect heat signatures in pitch darkness." delay={0.1} />
                    <FeatureCard icon={ShieldCheck} title="Ultrasonic Validation" desc="Cross-verifies object distance and proximity to eliminate false alerts." delay={0.2} />
                    <FeatureCard icon={Eye} title="Cloud ML Verification" desc="Real-time inference on edge cases using robust deep learning models." delay={0.3} />
                    <FeatureCard icon={Activity} title="Real-time Monitoring" desc="Ultra-low latency web socket dashboard for command center control." delay={0.4} />
                </div>
            </section>

            {/* Detection Pipeline Section */}
            <section className="space-y-16 pb-20">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wide">DETECTION PIPELINE</h2>
                    <div className="w-24 h-1 bg-neon-blue mx-auto rounded-full" />
                    <p className="text-gray-400 max-w-xl mx-auto">Seamlessly integrated multi-modal sensor fusion ensures unmatched accuracy.</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center overflow-x-auto pb-8 pt-4">
                    <PipelineNode label="Thermal Scan" delay={0.2} icon={Activity} />
                    <PipelineNode label="Ultrasonic Range" delay={0.8} icon={ShieldCheck} />
                    <PipelineNode label="Camera Capture" delay={1.4} icon={Eye} />
                    <PipelineNode label="ML Inference" delay={2.0} icon={Cpu} />
                    <PipelineNode label="Human Alert" delay={2.6} icon={BellRing} isLast={true} />
                </div>
            </section>
        </div>
    );
};

export default Landing;
