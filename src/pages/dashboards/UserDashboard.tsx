import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Battery, Wifi, Clock, AlertTriangle, ShieldCheck, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const navigate = useNavigate();

    // Simulated simple state
    const [battery] = useState(78);
    const [status] = useState('Patrolling'); // Patrolling, Idle, Charging, Alert Mode
    const [network] = useState('Online');
    const [lastActivity] = useState('Last sweep: 2 mins ago');
    const [fps, setFps] = useState(30);
    const [latency, setLatency] = useState(42);

    useEffect(() => {
        const interval = setInterval(() => {
            setFps(Math.round(28 + Math.random() * 4));
            setLatency(Math.round(40 + Math.random() * 8));
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    // Simulated alerts
    const alerts = [
        { id: 1, time: '10:42 AM', desc: 'Motion detected in Sector Alpha', severity: 'warning', status: 'Logged' },
        { id: 2, time: '10:15 AM', desc: 'Routine scan completed', severity: 'info', status: 'Verified' },
        { id: 3, time: '09:30 AM', desc: 'Unauthorized entry attempt', severity: 'critical', status: 'Logged' },
        { id: 4, time: '08:45 AM', desc: 'System boot sequence clear', severity: 'info', status: 'Verified' },
        { id: 5, time: '08:00 AM', desc: 'Scheduled maintenance check', severity: 'info', status: 'Verified' },
    ];

    const getSeverityStyles = (severity: string) => {
        switch (severity) {
            case 'critical': return 'border-neon-red/50 bg-neon-red/10 text-neon-red';
            case 'warning': return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-500';
            case 'info': return 'border-neon-blue/50 bg-neon-blue/10 text-neon-blue';
            default: return 'border-dark-border text-gray-400';
        }
    };

    const getSeverityIcon = (severity: string) => {
        switch (severity) {
            case 'critical': return <AlertTriangle className="w-4 h-4 text-neon-red" />;
            case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
            case 'info': return <Info className="w-4 h-4 text-neon-blue" />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto flex flex-col">

            <div className="mb-8">
                <h1 className="text-3xl font-black text-white uppercase tracking-tight">Operator Dashboard</h1>
                <p className="text-sm text-gray-400 font-medium">Real-time perimeter monitoring and system status</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-6 lg:gap-8 flex-grow">

                {/* LEFT COLUMN: ROBOT STATUS */}
                <div className="flex flex-col space-y-6 order-2 lg:order-1">
                    <div className="glass-card p-6 border-dark-border flex flex-col h-full rounded-2xl shadow-glass relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />

                        <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center">
                            <ShieldCheck className="w-4 h-4 mr-2 text-neon-cyan" />
                            Robot Status
                        </h2>

                        <div className="space-y-8 relative z-10 flex-grow">
                            {/* Current Mode */}
                            <div>
                                <span className="block text-xs font-mono text-gray-500 uppercase mb-2">Current Mode</span>
                                <div className={`inline-flex items-center px-4 py-2 rounded-lg border font-bold text-sm tracking-widest uppercase transition-colors ${status === 'Patrolling' ? 'bg-neon-cyan/10 border-neon-cyan text-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.2)]' :
                                        status === 'Alert Mode' ? 'bg-neon-red/10 border-neon-red text-neon-red shadow-[0_0_15px_rgba(255,50,50,0.2)] animate-pulse' :
                                            'bg-dark-base border-dark-border text-gray-300'
                                    }`}>
                                    {status === 'Patrolling' && <span className="w-2 h-2 rounded-full bg-neon-cyan mr-2 animate-ping" />}
                                    {status === 'Alert Mode' && <span className="w-2 h-2 rounded-full bg-neon-red mr-2 animate-ping" />}
                                    {status}
                                </div>
                            </div>

                            {/* Battery Level */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-mono text-gray-500 uppercase flex items-center">
                                        <Battery className="w-3.5 h-3.5 mr-1" /> Power Core
                                    </span>
                                    <span className="text-sm font-bold text-white font-mono">{battery}%</span>
                                </div>
                                <div className="h-2 w-full bg-dark-base rounded-full overflow-hidden border border-dark-border">
                                    <motion.div
                                        className="h-full bg-neon-cyan"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${battery}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                    />
                                </div>
                            </div>

                            {/* Network Status */}
                            <div>
                                <span className="block text-xs font-mono text-gray-500 uppercase mb-2 flex items-center">
                                    <Wifi className="w-3.5 h-3.5 mr-1" /> Connection Link
                                </span>
                                <div className="flex items-center space-x-2 bg-dark-base px-3 py-2 rounded-lg border border-dark-border w-fit">
                                    <span className={`w-2.5 h-2.5 rounded-full ${network === 'Online' ? 'bg-neon-green shadow-[0_0_8px_rgba(0,255,100,0.8)]' : 'bg-red-500'}`} />
                                    <span className="text-sm font-bold text-gray-300 tracking-wider">{network}</span>
                                </div>
                            </div>

                            {/* Last Activity */}
                            <div>
                                <span className="block text-xs font-mono text-gray-500 uppercase mb-2 flex items-center">
                                    <Clock className="w-3.5 h-3.5 mr-1" /> Operational Log
                                </span>
                                <p className="text-sm text-gray-300 font-medium">{lastActivity}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CENTER COLUMN: LIVE MONITORING */}
                <div className="flex flex-col space-y-4 order-1 lg:order-2">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-black text-white uppercase tracking-wider">Live Monitoring</h2>
                    </div>

                    <div className="glass-card border-none rounded-2xl overflow-hidden flex flex-col shadow-2xl relative group h-[400px] lg:h-full min-h-[500px]">
                        {/* Outer Glow */}
                        <div className="absolute inset-0 border-2 border-neon-cyan/30 rounded-2xl pointer-events-none group-hover:border-neon-cyan/60 transition-colors duration-500 z-20" />
                        <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,240,255,0.05)] pointer-events-none z-10" />

                        {/* Top Bar overlay */}
                        <div className="absolute top-0 w-full p-4 flex justify-between items-start z-30 bg-gradient-to-b from-black/90 via-black/40 to-transparent pointer-events-none">
                            <div className="flex items-center space-x-3 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-dark-border/50">
                                <span className="w-2.5 h-2.5 rounded-full bg-neon-green animate-pulse" />
                                <span className="text-white font-mono font-bold tracking-widest text-xs uppercase drop-shadow-md">
                                    LIVE – SEC-01
                                </span>
                            </div>
                            <div className="flex space-x-2">
                                <span className="text-[10px] font-mono font-bold text-neon-cyan bg-black/60 backdrop-blur-sm border border-neon-cyan/20 px-2.5 py-1 rounded">FPS: {fps}</span>
                                <span className="text-[10px] font-mono font-bold text-neon-cyan bg-black/60 backdrop-blur-sm border border-neon-cyan/20 px-2.5 py-1 rounded">LAT: {latency}ms</span>
                            </div>
                        </div>

                        {/* Simulated Video Feed Area */}
                        <div className="flex-grow bg-[#05080f] relative flex items-center justify-center overflow-hidden">
                            {/* Static noise texture */}
                            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/tv-noise.png')]" />

                            {/* Scanning line animation */}
                            <motion.div
                                className="absolute top-0 left-0 right-0 h-1 bg-neon-cyan/20 blur-[2px] z-10"
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                            />

                            <Camera className="w-16 h-16 text-gray-800/50 absolute z-0" />

                            {/* Crosshair Overlay */}
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40 z-20">
                                {/* Center target */}
                                <div className="w-32 h-32 border border-neon-cyan/30 rounded-full flex items-center justify-center">
                                    <div className="w-1 h-1 bg-neon-cyan rounded-full" />
                                </div>
                                <div className="w-40 h-40 border border-neon-cyan/20 rounded-full border-dashed animate-[spin_20s_linear_infinite] absolute" />

                                {/* Guide lines */}
                                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/10 to-transparent absolute" />
                                <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-neon-cyan/10 to-transparent absolute" />
                            </div>

                            {/* Timestamp overlay bottom left */}
                            <div className="absolute bottom-4 left-4 z-30 pointer-events-none">
                                <span className="text-[10px] font-mono text-white/50 bg-black/50 px-2 py-1 rounded">
                                    {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: RECENT ALERTS */}
                <div className="flex flex-col space-y-6 order-3 lg:order-3">
                    <div className="glass-card p-6 border-dark-border flex flex-col h-full rounded-2xl shadow-glass">
                        <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />
                            Recent Alerts
                        </h2>

                        <div className="space-y-4 overflow-y-auto custom-scrollbar pr-2 flex-grow max-h-[500px]">
                            <AnimatePresence>
                                {alerts.map((alert, idx) => (
                                    <motion.div
                                        key={alert.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className={`p-4 rounded-xl border ${getSeverityStyles(alert.severity)} bg-opacity-5 backdrop-blur-sm relative overflow-hidden`}
                                    >
                                        <div className="flex justify-between items-start mb-2 relative z-10">
                                            <span className="text-[10px] font-mono opacity-70 flex items-center gap-1">
                                                {getSeverityIcon(alert.severity)}
                                                {alert.time}
                                            </span>
                                            <span className="text-[9px] font-bold uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded border border-current opacity-80">
                                                {alert.status}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium leading-snug relative z-10">
                                            {alert.desc}
                                        </p>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="mt-6 pt-6 border-t border-dark-border/50">
                            <button
                                onClick={() => navigate('/alerts')}
                                className="w-full py-3 px-4 bg-dark-base border border-dark-border rounded-xl text-xs font-bold text-gray-300 uppercase tracking-widest hover:border-neon-cyan hover:text-neon-cyan transition-colors"
                            >
                                View All Alerts
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserDashboard;
