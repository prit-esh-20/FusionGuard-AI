import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Camera, Activity, Wifi, ShieldAlert, Cpu,
    ThermometerSun, Target, Hexagon, Volume2, VolumeX, TerminalSquare
} from 'lucide-react';

// Simulated Telemetry Data Hook
const useTelemetry = () => {
    const [data, setData] = useState({
        fps: 30,
        latency: 45,
        thermalTemp: 22.5,
        distance: 4.2,
        servoAngle: 90,
        mlProb: 0.1,
        isHumanDetected: false,
        patrolMode: 'Active Scanning',
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => {
                // Randomly simulate an alert event
                const simulateAlert = Math.random() > 0.95;

                return {
                    fps: Math.round(28 + Math.random() * 5),
                    latency: Math.round(40 + Math.random() * 15),
                    thermalTemp: simulateAlert ? 36.5 : 22 + Math.random(),
                    distance: simulateAlert ? 1.5 : 4 + Math.random() * 2,
                    servoAngle: (prev.servoAngle + 5) % 180,
                    mlProb: simulateAlert ? 0.96 : Math.random() * 0.2,
                    isHumanDetected: simulateAlert,
                    patrolMode: simulateAlert ? 'Target Logged' : 'Active Scanning'
                };
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return data;
};

const TelemetryNode = ({ icon: Icon, label, value, unit, isAlert }: any) => (
    <div className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${isAlert ? 'bg-red-500/10 border-neon-red neon-border-red animate-pulse-red' : 'glass-panel border-dark-border'}`}>
        <div className="flex items-center space-x-3">
            <Icon className={`w-5 h-5 ${isAlert ? 'text-neon-red' : 'text-neon-cyan'}`} />
            <span className="text-gray-400 font-mono text-sm uppercase">{label}</span>
        </div>
        <div className="text-right">
            <span className={`text-xl font-bold font-mono ${isAlert ? 'text-white' : 'text-neon-cyan'}`}>{value}</span>
            <span className="text-xs text-gray-500 ml-1">{unit}</span>
        </div>
    </div>
);

const UserDashboard = () => {
    const t = useTelemetry();
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [logs, setLogs] = useState<{ time: string, msg: string, type: 'info' | 'alert' }[]>([]);

    useEffect(() => {
        const time = new Date().toLocaleTimeString();
        if (t.isHumanDetected) {
            setLogs(prev => [{ time, msg: `CRITICAL: Human heat signature confirmed via ML (Prob: ${(t.mlProb * 100).toFixed(1)}%)`, type: 'alert' as const }, ...prev].slice(0, 10));
        } else if (Math.random() > 0.8) {
            setLogs(prev => [{ time, msg: `SYSTEM: Sensor sweep completed at ${t.servoAngle}°`, type: 'info' as const }, ...prev].slice(0, 10));
        }
    }, [t.isHumanDetected, t.servoAngle, t.mlProb]);

    return (
        <div className="flex flex-col h-full container mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="flex flex-col space-y-1">
                <h1 className="text-3xl font-extrabold text-white tracking-widest relative inline-block w-fit">
                    OPERATOR DASHBOARD
                    <motion.div
                        className="absolute -bottom-2 left-0 h-0.5 bg-neon-cyan"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1 }}
                    />
                </h1>
                <span className="text-neon-cyan/80 text-sm font-mono tracking-widest uppercase mt-4 block">
                    Monitoring Interface
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
                {/* LEFT: Live Camera Feed */}
                <div className="lg:col-span-2 flex flex-col space-y-4">
                    <div className={`relative flex-grow glass-card border-2 overflow-hidden flex flex-col ${t.isHumanDetected ? 'border-neon-red animate-pulse-red' : 'border-dark-border'}`}>
                        {/* Top Bar overlay */}
                        <div className="absolute top-0 w-full p-4 flex justify-between items-start z-10 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                            <div className="flex items-center space-x-2">
                                <span className={`w-3 h-3 rounded-full animate-pulse ${t.isHumanDetected ? 'bg-neon-red' : 'bg-neon-green'}`} />
                                <span className="text-white font-mono font-bold tracking-widest text-sm uppercase drop-shadow-md">
                                    {t.isHumanDetected ? '! INTRUSION DETECTED !' : 'LIVE FEED: ESP32-CAM [SEC-01]'}
                                </span>
                            </div>
                            <div className="flex flex-col items-end space-y-1">
                                <span className="text-xs font-mono text-neon-cyan bg-black/50 px-2 py-1 rounded">FPS: {t.fps}</span>
                                <span className="text-xs font-mono text-neon-cyan bg-black/50 px-2 py-1 rounded">LATENCY: {t.latency}ms</span>
                            </div>
                        </div>

                        {/* Simulated Video Placeholder */}
                        <div className="flex-grow bg-black relative flex items-center justify-center">
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/tv-noise.png')] animate-pulse" />
                            <Camera className="w-24 h-24 text-gray-800" />

                            {/* Crosshair Overlay */}
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                                <div className="w-64 h-64 border border-neon-cyan rounded-full border-dashed animate-[spin_10s_linear_infinite]" />
                                <div className="w-full h-px bg-neon-cyan/20 absolute" />
                                <div className="h-full w-px bg-neon-cyan/20 absolute" />
                            </div>

                            {/* ML Bounding Box simulation */}
                            <AnimatePresence>
                                {t.isHumanDetected && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 1.2 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute w-48 h-64 border-2 border-neon-red bg-red-500/10 z-20 flex flex-col justify-end p-1 shadow-red"
                                    >
                                        <span className="bg-neon-red text-black text-xs font-bold px-1 w-fit">PERSON {(t.mlProb * 100).toFixed(0)}%</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* BOTTOM LEFT: Detection Pipeline Visualizer */}
                    <div className="glass-panel p-4 rounded-xl border border-dark-border flex items-center justify-between">
                        <h3 className="text-xs text-gray-400 font-mono uppercase w-24">Fusion Pipeline</h3>
                        <div className="flex-1 flex justify-between items-center px-4">
                            <div className={`flex flex-col items-center ${t.thermalTemp > 30 ? 'text-neon-red animate-pulse' : 'text-neon-cyan'}`}>
                                <ThermometerSun className="w-5 h-5 mb-1" />
                                <span className="text-[10px] uppercase font-bold text-center">Thermal</span>
                            </div>
                            <div className={`h-px flex-1 mx-2 ${t.isHumanDetected ? 'bg-neon-red' : 'bg-dark-border'}`} />
                            <div className={`flex flex-col items-center ${t.distance < 2.0 ? 'text-neon-red animate-pulse' : 'text-neon-cyan'}`}>
                                <Activity className="w-5 h-5 mb-1" />
                                <span className="text-[10px] uppercase font-bold text-center">Ultrasonic</span>
                            </div>
                            <div className={`h-px flex-1 mx-2 ${t.isHumanDetected ? 'bg-neon-red' : 'bg-dark-border'}`} />
                            <div className={`flex flex-col items-center ${t.mlProb > 0.8 ? 'text-neon-red animate-pulse' : 'text-neon-cyan'}`}>
                                <Cpu className="w-5 h-5 mb-1" />
                                <span className="text-[10px] uppercase font-bold text-center">Vision ML</span>
                            </div>
                            <div className={`h-px flex-1 mx-2 ${t.isHumanDetected ? 'bg-neon-red line-glow-red' : 'bg-dark-border'}`} />
                            <div className={`flex flex-col items-center ${t.isHumanDetected ? 'text-neon-red bg-red-500/20 p-2 rounded animate-pulse-red' : 'text-gray-600'}`}>
                                <ShieldAlert className="w-5 h-5 mb-1" />
                                <span className="text-[10px] uppercase font-bold text-center">Alert</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Telemetry & Logs */}
                <div className="flex flex-col space-y-4 h-full">
                    {/* Real-time Telemetry */}
                    <div className="glass-card p-4 border border-dark-border flex-1">
                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-dark-border">
                            <h3 className="text-sm font-bold text-white flex items-center bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-cyan">
                                <Hexagon className="w-4 h-4 mr-2 text-neon-cyan" />
                                SYSTEM TELEMETRY
                            </h3>
                            <button onClick={() => setSoundEnabled(!soundEnabled)} className="text-gray-400 hover:text-white transition-colors">
                                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                            </button>
                        </div>

                        <div className="space-y-3">
                            <TelemetryNode
                                icon={Target} label="Patrol Mode" value={t.patrolMode} unit=""
                                isAlert={t.isHumanDetected}
                            />
                            <TelemetryNode
                                icon={ThermometerSun} label="IR Array Max" value={t.thermalTemp.toFixed(1)} unit="°C"
                                isAlert={t.thermalTemp > 30}
                            />
                            <TelemetryNode
                                icon={Activity} label="Proximity" value={t.distance.toFixed(1)} unit="m"
                                isAlert={t.distance < 2.0}
                            />
                            <TelemetryNode
                                icon={Cpu} label="AI Confidence" value={(t.mlProb * 100).toFixed(1)} unit="%"
                                isAlert={t.mlProb > 0.8}
                            />
                            <TelemetryNode
                                icon={Wifi} label="Servo Pan Angle" value={t.servoAngle} unit="°"
                                isAlert={false}
                            />
                        </div>
                    </div>

                    {/* Event Logs Terminal */}
                    <div className="glass-card flex-1 border border-dark-border overflow-hidden flex flex-col max-h-64">
                        <div className="bg-dark-surface p-2 border-b border-dark-border flex items-center space-x-2">
                            <TerminalSquare className="w-4 h-4 text-neon-cyan" />
                            <span className="text-xs font-mono text-gray-400 uppercase">SYS.LOG</span>
                        </div>
                        <div className="flex-1 p-3 overflow-y-auto font-mono text-xs space-y-2 bg-black/50 custom-scrollbar flex flex-col-reverse">
                            {logs.map((log, i) => (
                                <div key={i} className={`flex items-start space-x-2 ${log.type === 'alert' ? 'text-neon-red' : 'text-neon-cyan'}`}>
                                    <span className="opacity-50 shrink-0">[{log.time}]</span>
                                    <span>{log.msg}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserDashboard;
