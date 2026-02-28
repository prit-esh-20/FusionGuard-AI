import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, ChevronDown, BookOpen, Quote } from 'lucide-react';
import { useState } from 'react';

const sections = [
    {
        id: 'intro',
        title: '1. Introduction',
        content: 'Autonomous robotic patrolling systems play a crucial role in modern security infrastructure, reducing human risk and increasing round-the-clock monitoring efficiency. However, traditional systems suffer from high false positive rates due to fluctuating environmental conditions. This paper introduces "FusionGuard AI," an edge-computing solution that implements multi-modal sensor fusion to achieve 98.1% detection precision.',
    },
    {
        id: 'method',
        title: '2. Methodology',
        content: 'The system architecture relies on an ESP32 master node coordinating an AMG8833 thermal array (10Hz) and a 360° ultrasonic ranging module. Visual inference is offloaded to a YOLOv8 quantized model running on a FastAPI cloud dashboard. The validation algorithm requires simultaneous anomalous heat signature detection, unexpected proximity disruption, and positive visual classification before a "Human Alert" state is triggered.',
    },
    {
        id: 'results',
        title: '3. Empirical Results',
        content: 'Over 500 hours of continuous field testing in varied illumination scenarios (daylight, low-light, absolute darkness) demonstrated a false positive reduction from 12% (vision-only baseline) to 0.02%. System latency maintained a consistent average of 48ms from frame capture to dashboard alert visualization over WebSockets.',
    },
    {
        id: 'conclusion',
        title: '4. Conclusion',
        content: 'FusionGuard AI successfully demonstrates the viability of low-cost, multi-layered sensor fusion for high-reliability autonomous patrolling. The integration of edge-level hardware filtering with cloud-native deep learning provides a scalable framework for future robotic security deployments.',
    }
];

const AbstractDropdown = ({ section, isOpen, onToggle }: any) => (
    <motion.div
        initial={false}
        animate={{ backgroundColor: isOpen ? 'rgba(19, 26, 38, 0.8)' : 'rgba(19, 26, 38, 0.5)' }}
        className="border border-dark-border rounded-xl overflow-hidden glass-panel transition-colors"
    >
        <button
            onClick={onToggle}
            className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-white/5 transition-colors focus:outline-none"
        >
            <span className={`font-bold text-lg ${isOpen ? 'text-neon-cyan' : 'text-gray-300'}`}>
                {section.title}
            </span>
            <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-neon-cyan' : 'text-gray-500'}`} />
            </motion.div>
        </button>

        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    <div className="px-6 pb-6 pt-2 text-gray-400 leading-relaxed border-t border-dark-border/50">
                        {section.content}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
);

const ResearchPaper = () => {
    const [openSection, setOpenSection] = useState<string | null>('intro');

    return (
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-16">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6"
            >
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-panel border-gray-500/50 text-gray-300 uppercase text-xs font-bold tracking-widest">
                    <BookOpen className="w-4 h-4" />
                    <span>Project Documentation</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                    Multi-Modal Sensor Fusion for Autonomous Robotic Patrolling
                </h1>
                <div className="flex flex-wrap justify-center gap-2 text-sm text-neon-cyan">
                    <span className="px-3 py-1 glass-card border-none bg-neon-cyan/10">Computer Vision</span>
                    <span className="px-3 py-1 glass-card border-none bg-neon-cyan/10">Sensor Fusion</span>
                    <span className="px-3 py-1 glass-card border-none bg-neon-cyan/10">Edge Computing</span>
                    <span className="px-3 py-1 glass-card border-none bg-neon-cyan/10">Robotics</span>
                </div>
            </motion.div>

            {/* Abstract Panel */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative glass-card p-8 md:p-10 border-neon-cyan/30 overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Quote className="w-32 h-32" />
                </div>
                <div className="relative z-10 space-y-4">
                    <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                        <FileText className="w-6 h-6 text-neon-cyan" />
                        <span>Abstract Preview</span>
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed text-justify">
                        This paper presents a scalable architecture for an autonomous security robot utilizing integrated thermal, ultrasonic, and optical sensors verified by a cloud-based quantized neural network. By offloading heavy inference to a WebSocket-enabled backend while maintaining immediate edge-level hardware polling, the system virtually eliminates false positive alerts common in traditional single-modality surveillance solutions. Results demonstrate a 48ms latency pipeline and 94.5% precision in human detection across dynamic environmental noise.
                    </p>
                </div>
            </motion.div>

            {/* Download Action */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center"
            >
                <button className="flex items-center space-x-3 px-8 py-4 bg-neon-cyan text-dark-base font-bold rounded-xl hover:bg-white hover:text-black transition-all group shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                    <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                    <span>Download Full PDF (2.4 MB)</span>
                </button>
            </motion.div>

            {/* Expandable Sections */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4 pt-10 border-t border-dark-border"
            >
                <h3 className="text-xl font-bold text-gray-400 mb-6 uppercase tracking-wider text-center">Paper Excerpts</h3>
                {sections.map((section) => (
                    <AbstractDropdown
                        key={section.id}
                        section={section}
                        isOpen={openSection === section.id}
                        onToggle={() => setOpenSection(openSection === section.id ? null : section.id)}
                    />
                ))}
            </motion.div>
        </div>
    );
};

export default ResearchPaper;
