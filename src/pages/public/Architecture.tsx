import { motion } from 'framer-motion';
import { Cpu, Server, Wifi, Activity, Database, Smartphone, ShieldCheck } from 'lucide-react';

const ArchNode = ({ title, icon: Icon, desc, delay, gradient }: any) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ y: -5 }}
        className="glass-card p-6 flex flex-col relative overflow-hidden group border-dark-border"
    >
        <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${gradient} rounded-full opacity-20 blur-xl group-hover:opacity-40 transition-opacity`} />
        <Icon className="w-10 h-10 mb-4 text-white group-hover:scale-110 transition-transform" />
        <h3 className="text-xl font-bold mb-2 text-white bg-clip-text text-transparent group-hover:bg-gradient-to-r group-hover:from-neon-cyan group-hover:to-neon-blue transition-all">
            {title}
        </h3>
        <p className="text-sm text-gray-400">{desc}</p>
    </motion.div>
);

const Architecture = () => {
    return (
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6"
            >
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-panel border-neon-blue/50 text-neon-blue uppercase text-xs font-bold tracking-widest">
                    <Database className="w-4 h-4" />
                    <span>System Blueprint</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white">HARDWARE & SOFTWARE ARCHITECTURE</h1>
                <p className="max-w-2xl mx-auto text-gray-400 text-lg">
                    A seamless fusion of microcontrollers, IoT protocol stack, and cloud-native machine learning infrastructure.
                </p>
            </motion.div>

            {/* Main Arch Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                {/* Connection Lines (hidden on mobile, abstract idea on desktop) */}
                <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
                    <svg className="w-full h-full" style={{ strokeDasharray: 5 }}>
                        <line x1="20%" y1="20%" x2="80%" y2="20%" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="2" className="animate-pulse" />
                        <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="2" />
                    </svg>
                </div>

                <ArchNode
                    title="ESP32-CAM"
                    icon={Camera}
                    desc="Edge device responsible for capturing real-time image frames and establishing WebSocket connection."
                    delay={0.1}
                    gradient="from-neon-cyan to-blue-600"
                />
                <ArchNode
                    title="Arduino Mega"
                    icon={Cpu}
                    desc="Master controller managing motor drivers, servomechanisms, and sensor data polling."
                    delay={0.2}
                    gradient="from-neon-blue to-purple-600"
                />
                <ArchNode
                    title="Thermal Payload"
                    icon={Activity}
                    desc="AMG8833 IR Grid array operating at 10Hz to feed human heat map signatures."
                    delay={0.3}
                    gradient="from-neon-red to-orange-600"
                />
                <ArchNode
                    title="Ultrasonic Array"
                    icon={Wifi}
                    desc="HC-SR04 modules distributed 360°, continuously mapping spatial proximity."
                    delay={0.4}
                    gradient="from-neon-green to-emerald-600"
                />
                <ArchNode
                    title="Cloud Server Pipeline"
                    icon={Server}
                    desc="FastAPI backend hosting the YOLO/MobileNet model for real-time inference and risk calculation."
                    delay={0.5}
                    gradient="from-neon-cyan to-indigo-600"
                />
                <ArchNode
                    title="Command Dashboard"
                    icon={Smartphone}
                    desc="React/Vite frontend delivering <50ms latency telemetry, video feeds, and system controls."
                    delay={0.6}
                    gradient="from-purple-500 to-pink-600"
                />
            </div>

            {/* Expandable Flow Diagram Section Placeholder */}
            <section className="glass-panel p-8 rounded-2xl border-dark-border space-y-6">
                <div className="flex items-center space-x-3 text-neon-cyan">
                    <ShieldCheck className="w-6 h-6 animate-pulse" />
                    <h2 className="text-2xl font-bold">SENSOR FUSION LOGIC</h2>
                </div>
                <p className="text-gray-400">
                    The system implements a multi-stage validation algorithm to eliminate false positive alarms. An alarm is only triggered when heat signature dimensions, ultrasonic depth mapping, and ML visual inference align within a target probability threshold.
                </p>

                <div className="w-full h-48 bg-dark-surface/50 border border-dark-border/50 rounded-xl relative overflow-hidden flex items-center justify-center">
                    <span className="text-neon-cyan/50 font-mono tracking-widest text-sm uppercase">[ Interactive Data Flow Diagram Rendered Here ]</span>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                </div>
            </section>
        </div>
    );
};

// add missing imports
import { Camera } from 'lucide-react';

export default Architecture;
