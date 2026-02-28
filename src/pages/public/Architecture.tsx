import { motion, AnimatePresence } from 'framer-motion';
import {
    Cpu, Server, Activity, Smartphone,
    ShieldCheck, Download, FileText, Camera,
    ChevronRight, Info, Zap, Layers, Waves
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const ArchNode = ({ title, icon: Icon, desc, metric, delay, accentClass, glowColor }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.4 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className={`glass-card p-5 flex flex-col relative overflow-hidden group border-dark-border hover:border-${accentClass}/50 transition-all duration-300`}
    >
        <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-all duration-500 ${glowColor}`} />

        <div className="flex items-start justify-between mb-3">
            <div className={`p-2 rounded-lg bg-dark-base border border-dark-border group-hover:border-${accentClass}/30 transition-colors`}>
                <Icon className={`w-5 h-5 text-${accentClass} group-hover:scale-110 transition-transform duration-300`} />
            </div>
            <div className="text-[9px] font-mono text-gray-500 bg-dark-base/50 px-2 py-0.5 rounded border border-dark-border flex items-center gap-1.5 uppercase tracking-tighter">
                <div className={`w-1 h-1 rounded-full animate-pulse bg-${accentClass}`} />
                Active_Node
            </div>
        </div>

        <h3 className="text-lg font-bold mb-1.5 text-white group-hover:text-white transition-colors">
            {title}
        </h3>
        <p className="text-sm text-gray-300/90 group-hover:text-white leading-relaxed mb-4 flex-grow transition-colors">
            {desc}
        </p>

        {metric && (
            <div className="pt-3 border-t border-dark-border/40 flex items-center gap-2">
                <Zap className={`w-3 h-3 text-${accentClass} opacity-80`} />
                <span className="text-[10px] font-mono text-gray-400 group-hover:text-gray-300 uppercase tracking-tighter transition-colors">
                    {metric}
                </span>
            </div>
        )}
    </motion.div>
);

const FlowVisualization = () => (
    <div className="flex flex-col items-center py-6 relative">
        <div className="flex flex-col items-center relative h-16">
            <div className="w-[1px] h-full bg-gradient-to-b from-dark-border via-dark-border to-dark-border relative">
                <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-8 bg-gradient-to-b from-transparent via-neon-cyan to-transparent opacity-60 blur-[3px]"
                    animate={{
                        top: ["-20%", "120%"]
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-10 bg-white opacity-80"
                    animate={{
                        top: ["-20%", "120%"]
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                <span className="text-[8px] font-mono text-gray-700 uppercase tracking-[0.3em] rotate-90 font-bold">Telemetry</span>
            </div>
        </div>
    </div>
);

const FusionStage = ({ number, title, tooltip, isActive, onHover }: any) => (
    <div
        className="relative flex flex-col items-center group cursor-crosshair px-6 py-4 z-10 transition-transform duration-300"
        onMouseEnter={() => onHover(number)}
        onMouseLeave={() => onHover(null)}
    >
        {/* Interaction Buffer Hitbox */}
        <div className="absolute inset-x-0 -inset-y-4 z-0 bg-transparent group-hover:block" />

        <motion.div
            className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-700 relative z-20 ${isActive ? 'border-neon-cyan bg-neon-cyan/10 shadow-[0_0_20px_rgba(0,240,255,0.3)]' : 'border-dark-border bg-dark-surface group-hover:border-dark-border/80'
                }`}
        >
            <span className={`text-base font-bold font-mono ${isActive ? 'text-neon-cyan' : 'text-gray-600'}`}>0{number}</span>
            {isActive && (
                <motion.div
                    layoutId="outer-ring"
                    className="absolute -inset-1.5 border border-neon-cyan/20 rounded-full"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            )}
        </motion.div>
        <span className={`mt-4 text-[10px] font-black uppercase tracking-widest text-center max-w-[80px] transition-all duration-500 relative z-20 ${isActive ? 'text-white' : 'text-gray-600'
            }`}>
            {title}
        </span>

        <AnimatePresence mode="wait">
            {isActive && (
                <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute bottom-full mb-10 w-60 p-5 glass-card border-neon-cyan/40 z-50 pointer-events-none"
                    style={{ filter: 'drop-shadow(0 0 15px rgba(0,240,255,0.15))' }}
                >
                    <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-dark-border pb-2.5 mb-2.5">
                            <span className="text-[11px] text-neon-cyan font-bold uppercase tracking-widest flex items-center gap-2">
                                <Activity size={12} /> Validation_Ops
                            </span>
                            <Info size={11} className="text-gray-500" />
                        </div>
                        {Object.entries(tooltip).map(([key, val]: any) => (
                            <div key={key} className="flex justify-between items-center leading-none">
                                <span className="text-[10px] text-gray-500 uppercase tracking-tighter">{key}</span>
                                <span className="text-[11px] text-white font-mono font-bold">{val}</span>
                            </div>
                        ))}
                    </div>
                    {/* Tooltip Arrow */}
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-dark-surface border-r border-b border-neon-cyan/40 rotate-45 shadow-[2px_2px_5px_rgba(0,0,0,0.3)]" />
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const Architecture = () => {
    const [activeStage, setActiveStage] = useState<number | null>(null);
    const [autoAnimate, setAutoAnimate] = useState(true);
    const hoverTimeoutRef = useRef<any>(null);

    const handleHover = (num: number | null) => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

        if (num === null) {
            hoverTimeoutRef.current = setTimeout(() => {
                setActiveStage(null);
                setAutoAnimate(true);
            }, 150);
        } else {
            setActiveStage(num);
            setAutoAnimate(false);
        }
    };

    useEffect(() => {
        if (!autoAnimate) return;
        const interval = setInterval(() => {
            setActiveStage(prev => {
                if (prev === null || prev >= 5) return 1;
                return prev + 1;
            });
        }, 3000);
        return () => {
            clearInterval(interval);
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        };
    }, [autoAnimate]);

    const fusionStages = [
        { title: "Thermal Scan", tooltip: { "Data type": "Thermal IR", "Latency": "12ms", "Threshold": "32.5°C" } },
        { title: "Ultrasonic Validation", tooltip: { "Data type": "Distance", "Latency": "8ms", "Threshold": "±2cm" } },
        { title: "Visual Capture", tooltip: { "Data type": "JPEG/RGB", "Latency": "45ms", "Threshold": "95% Quality" } },
        { title: "Neural Verification", tooltip: { "Data type": "Tensors", "Latency": "220ms", "Threshold": "0.85 Conf" } },
        { title: "Alert Dispatch", tooltip: { "Data type": "WebSocket", "Latency": "<30ms", "Threshold": "Instant" } },
    ];

    return (
        <div className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-0 relative">
            {/* Background Vertical Guide */}
            <div className="absolute left-1/2 top-48 bottom-48 w-[1px] bg-gradient-to-b from-transparent via-dark-border/30 to-transparent -translate-x-1/2 pointer-events-none z-0" />

            {/* Header section with System Overview Strip */}
            <header className="space-y-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-dark-surface/50 border border-neon-blue/20 text-neon-blue uppercase text-xs font-bold tracking-[0.3em]">
                        <Layers className="w-3.5 h-3.5" />
                        <span>System Architecture</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                        ENGINEERING <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue">BLUEPRINT</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-gray-300/80 text-lg leading-relaxed">
                        A distributed multi-layered infrastructure designed for real-time edge intelligence
                        and cloud-native inference synchronization.
                    </p>
                </motion.div>

                {/* System Overview Strip */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-dark-surface/80 backdrop-blur-md border border-dark-border/80 py-4 px-8 rounded-xl flex flex-wrap justify-between items-center gap-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative overflow-hidden"
                >
                    {/* Subtle Scanline Effect for the Strip */}
                    <div className="absolute inset-x-0 h-[1px] bg-white/5 top-0" />
                    <div className="absolute inset-x-0 h-[1px] bg-white/5 bottom-0" />
                    {[
                        { label: "Pipeline", value: "Edge → Cloud ML → Dashboard", icon: Layers, color: "text-neon-cyan" },
                        { label: "Processing Latency", value: "150–600ms", icon: Zap, color: "text-neon-blue" },
                        { label: "Alert Dispatch", value: "<300ms", icon: Activity, color: "text-purple-400" },
                        { label: "False Alarm Rate", value: "0% in trials", icon: ShieldCheck, color: "text-neon-green" },
                    ].map((item, i, arr) => (
                        <div key={i} className="flex items-center">
                            <div className="flex items-center gap-4">
                                <div className={`p-1.5 rounded bg-dark-base border border-dark-border shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]`}>
                                    <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                                </div>
                                <div className="min-w-max">
                                    <p className="text-[9px] text-gray-500 uppercase font-black tracking-[0.1em]">{item.label}</p>
                                    <p className="text-xs font-mono text-white/90 mt-0.5">{item.value}</p>
                                </div>
                            </div>
                            {i < arr.length - 1 && (
                                <div className="hidden lg:block h-8 w-[1px] bg-gradient-to-b from-transparent via-dark-border/60 to-transparent ml-8 mr-2" />
                            )}
                        </div>
                    ))}
                </motion.div>
            </header>

            {/* 1. COMMAND & CONTROL LAYER */}
            <section className="space-y-6 flex flex-col items-center relative z-10">
                <div className="flex flex-col items-center text-center space-y-1.5 mb-2">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.2em] px-2.5 py-0.5 bg-indigo-500/5 rounded border border-indigo-500/20">
                        Command & Control Layer
                    </span>
                    <p className="text-[11px] text-gray-500 font-medium max-w-xs uppercase tracking-tight">
                        Telemetry delivery & operational overrides.
                    </p>
                </div>

                <div className="w-full max-w-lg">
                    <ArchNode
                        title="Command Dashboard"
                        icon={Smartphone}
                        desc="Cloud-native React cockpit for real-time surveillance management and active defense monitoring."
                        metric="WebSocket latency < 50ms"
                        delay={0.1}
                        accentClass="indigo-400"
                        glowColor="bg-indigo-500"
                    />
                </div>
            </section>

            <FlowVisualization />

            {/* 2. CLOUD INFERENCE LAYER */}
            <section className="space-y-6 flex flex-col items-center pt-2 relative z-10">
                <div className="flex flex-col items-center text-center space-y-1.5 mb-2">
                    <span className="text-[10px] font-mono text-neon-blue uppercase tracking-[0.2em] px-2.5 py-0.5 bg-neon-blue/5 rounded border border-neon-blue/20">
                        Cloud Inference Layer
                    </span>
                    <p className="text-[11px] text-gray-500 font-medium max-w-xs uppercase tracking-tight">
                        High-performance neural processing engine.
                    </p>
                </div>

                <div className="w-full max-w-lg">
                    <ArchNode
                        title="Cloud Server Pipeline"
                        icon={Server}
                        desc="FastAPI neural processing pipeline with multi-tenant stream handling and secondary threshold validation."
                        metric="Inference latency: 150–600ms"
                        delay={0.1}
                        accentClass="neon-blue"
                        glowColor="bg-neon-blue"
                    />
                </div>
            </section>

            <FlowVisualization />

            {/* 3. EDGE INTELLIGENCE LAYER */}
            <section className="space-y-6 pt-2 pb-16 relative z-10">
                <div className="flex flex-col items-center text-center space-y-1.5 mb-2">
                    <span className="text-[10px] font-mono text-neon-cyan uppercase tracking-[0.2em] px-2.5 py-0.5 bg-neon-cyan/5 rounded border border-neon-cyan/20">
                        Edge Intelligence Layer
                    </span>
                    <p className="text-[11px] text-gray-500 font-medium max-w-xs uppercase tracking-tight">
                        Real-time sensing and device-level control.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <ArchNode
                        title="ESP32-CAM"
                        icon={Camera}
                        desc="Primary optical node capturing 160° FOV frames for live processing streams."
                        metric="Streaming at 12–18 FPS | JPEG compression enabled"
                        delay={0.1}
                        accentClass="neon-cyan"
                        glowColor="bg-neon-cyan"
                    />
                    <ArchNode
                        title="Arduino Mega"
                        icon={Cpu}
                        desc="Mission-critical logic hub managing actuators, servos, and low-level peripheral polling."
                        metric="PWM motor control @ 50–100Hz loop"
                        delay={0.15}
                        accentClass="neon-cyan"
                        glowColor="bg-neon-cyan"
                    />
                    <ArchNode
                        title="Thermal Payload"
                        icon={Activity}
                        desc="Far-infrared sensing component for biological heat signature detection and verification."
                        metric="24×32 IR grid | 10Hz sampling rate"
                        delay={0.2}
                        accentClass="neon-cyan"
                        glowColor="bg-neon-cyan"
                    />
                    <ArchNode
                        title="Ultrasonic Array"
                        icon={Waves}
                        desc="Environment mapping sensors providing depth perception and physical barrier detection."
                        metric="3-400cm range | ±3mm precision"
                        delay={0.25}
                        accentClass="neon-cyan"
                        glowColor="bg-neon-cyan"
                    />
                </div>
            </section>

            {/* SENSOR FUSION LOGIC SECTION */}
            <section className="pt-10 scroll-mt-24">
                <div className="glass-panel p-10 rounded-3xl border-dark-border relative overflow-visible group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                        <div className="flex items-center space-x-3 text-neon-cyan">
                            <ShieldCheck className="w-8 h-8 drop-shadow-neon-cyan" />
                            <h2 className="text-3xl font-black uppercase tracking-tight">Sensor Fusion Logic</h2>
                        </div>
                        <p className="max-w-2xl text-gray-400 text-lg leading-relaxed">
                            A multi-stage probabilistic validation engine that synchronizes data from three distinct hardware verticals
                            to achieve near-zero false positive rates.
                        </p>

                        <motion.div
                            layout
                            animate={{
                                paddingTop: activeStage ? '120px' : '64px',
                                paddingBottom: activeStage ? '80px' : '64px'
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="w-full px-4 bg-dark-base rounded-2xl border border-dark-border/50 relative overflow-visible min-h-[380px] flex items-center mt-12"
                        >
                            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#00F0FF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

                            {/* Diagram Stages */}
                            <div className="flex flex-wrap justify-center items-start gap-4 md:gap-11 lg:gap-14 relative z-10 w-full">
                                {fusionStages.map((stage, idx) => (
                                    <div key={idx} className="flex items-center">
                                        <FusionStage
                                            number={idx + 1}
                                            title={stage.title}
                                            tooltip={stage.tooltip}
                                            isActive={activeStage === idx + 1}
                                            onHover={handleHover}
                                        />
                                        {idx < 4 && (
                                            <div className="hidden lg:flex items-center mx-1 pt-6">
                                                <div className="w-6 h-[1px] bg-dark-border relative">
                                                    {activeStage && activeStage > idx + 1 && (
                                                        <motion.div
                                                            className="absolute inset-0 bg-neon-cyan shadow-[0_0_8px_rgba(0,240,255,0.5)]"
                                                            initial={{ scaleX: 0 }}
                                                            animate={{ scaleX: 1 }}
                                                        />
                                                    )}
                                                </div>
                                                <ChevronRight className={`w-3.5 h-3.5 ${activeStage && activeStage > idx + 1 ? 'text-neon-cyan' : 'text-gray-800'}`} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <p className="text-[11px] font-mono text-gray-500 uppercase tracking-widest pt-6">
                            “Multi-stage probabilistic validation eliminates false positives before alert dispatch.”
                        </p>
                    </div>
                </div>
            </section>

            {/* Technical Documentation Section */}
            <section className="space-y-10 pt-10">
                <div className="flex items-center space-x-3 text-white">
                    <FileText className="w-7 h-7 text-neon-blue" />
                    <h2 className="text-3xl font-black tracking-tight uppercase">Technical Assets</h2>
                </div>

                <div className="glass-card p-10 border border-dark-border hover:border-neon-blue/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-10 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-neon-blue/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                    <div className="space-y-4 max-w-2xl relative z-10">
                        <div className="flex items-center gap-2 text-neon-blue font-bold text-xs uppercase tracking-widest">
                            <div className="w-4 h-[1px] bg-neon-blue" />
                            Research Publication
                        </div>
                        <h3 className="text-3xl font-black text-white group-hover:text-neon-blue transition-colors tracking-tight">
                            Technical Whitepaper v2.0
                        </h3>
                        <p className="text-gray-400 text-base leading-relaxed">
                            Comprehensive documentation detailing the hardware layer specifications, edge intelligence logic,
                            ML model architecture, and empirical results from field deployment trials.
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-gray-500 pt-4">
                            <span className="flex items-center gap-2 px-3 py-1.5 bg-dark-base rounded border border-dark-border">
                                <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></span> IEEE ARCH FORMAT
                            </span>
                            <span className="px-3 py-1.5 bg-dark-base rounded border border-dark-border uppercase">14 Technical Pages</span>
                            <span className="px-3 py-1.5 bg-dark-base rounded border border-dark-border uppercase">Includes Schematics</span>
                        </div>
                    </div>

                    <div className="w-full md:w-auto flex-shrink-0 relative z-10">
                        <motion.a
                            href="/FusionGuard-AI-Whitepaper.pdf"
                            download="FusionGuard-AI-Whitepaper.pdf"
                            whileHover={{ y: -4, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full md:w-auto inline-flex items-center justify-center gap-4 px-10 py-5 bg-dark-surface border border-neon-cyan/50 text-neon-cyan font-black rounded shadow-[0_0_20px_rgba(0,240,255,0.1)] hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] hover:border-neon-cyan transition-all group/btn overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-neon-cyan/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 pointer-events-none" />
                            <Download className="w-5 h-5 group-hover/btn:-translate-y-1 transition-transform" />
                            <span className="relative uppercase tracking-widest text-sm">Download Paper</span>
                        </motion.a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Architecture;
