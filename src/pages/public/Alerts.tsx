import { motion } from 'framer-motion';
import { ShieldAlert, Clock, Info, CheckCircle, TerminalSquare } from 'lucide-react';
import { useState, useEffect } from 'react';

const AlertItem = ({ time, msg, type, status }: any) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`glass-panel p-4 border-l-4 rounded-r-xl bg-dark-surface/50 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 hover:bg-dark-surface/80 ${type === 'critical' ? 'border-neon-red shadow-[inset_4px_0_10px_rgba(255,50,50,0.1)]' : 'border-neon-cyan'
            }`}
    >
        <div className="flex items-start gap-4">
            <div className={`p-2 rounded-lg bg-dark-base border border-dark-border ${type === 'critical' ? 'text-neon-red' : 'text-neon-cyan'}`}>
                {type === 'critical' ? <ShieldAlert size={18} /> : <Info size={18} />}
            </div>
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{time}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter ${type === 'critical' ? 'bg-neon-red/10 text-neon-red' : 'bg-neon-cyan/10 text-neon-cyan'
                        }`}>
                        {type}
                    </span>
                </div>
                <p className="text-sm text-gray-200 font-medium leading-relaxed">{msg}</p>
            </div>
        </div>
        <div className="flex items-center gap-3 self-end md:self-auto uppercase tracking-widest">
            <span className="text-[10px] font-bold text-gray-500">Status:</span>
            <span className={`text-[10px] font-black flex items-center gap-1.5 ${status === 'Logged' ? 'text-neon-cyan' : 'text-neon-green'
                }`}>
                {status === 'Logged' ? <TerminalSquare size={10} /> : <CheckCircle size={10} />}
                {status}
            </span>
        </div>
    </motion.div>
);

const Alerts = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);

    const alertHistory = [
        { time: "23:45:12", msg: "Human heat signature detected in Zone-A perimeter. Thermal delta: +14.2°C.", type: "critical", status: "Logged" },
        { time: "23:42:05", msg: "Ultrasonic sensor US-03 recalibrated. Variance within normal operational parameters.", type: "info", status: "Verified" },
        { time: "23:30:18", msg: "Visual classification node synchronized with Cloud Server. Latency: 42ms.", type: "info", status: "Verified" },
        { time: "22:15:55", msg: "Unidentified movement logged at 4.5m Range Logic limit. Secondary scan active.", type: "critical", status: "Logged" },
        { time: "21:05:42", msg: "System-wide diagnostic completed. All sensor hardware verticals 100% operational.", type: "info", status: "Verified" },
        { time: "18:45:00", msg: "Manual operational override initiated for battery cycle maintenance sweep.", type: "info", status: "Verified" },
    ];

    return (
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
            <header className="space-y-4">
                <div className="flex items-center gap-3 text-neon-cyan">
                    <ShieldAlert className="w-8 h-8 opacity-80" />
                    <h1 className="text-4xl font-black tracking-tight uppercase">System Alerts</h1>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <p className="text-gray-400 text-lg max-w-2xl font-medium">
                        Real-time log of security events and hardware status validation from the FusionGuard AI perimeter.
                    </p>
                    <div className="px-4 py-2 bg-dark-surface rounded-lg border border-dark-border flex items-center gap-3">
                        <Clock className="w-4 h-4 text-neon-cyan animate-pulse" />
                        <span className="text-xs font-mono text-white tracking-widest uppercase">{currentTime}</span>
                    </div>
                </div>
            </header>

            <div className="space-y-4 relative">
                {/* Vertical Timeline Guide */}
                <div className="absolute left-6 top-8 bottom-8 w-px bg-dark-border/30 z-0 hidden md:block" />

                {alertHistory.map((alert, i) => (
                    <AlertItem key={i} {...alert} />
                ))}
            </div>

            <footer className="pt-10 flex justify-center">
                <div className="px-6 py-3 border border-dark-border rounded-full text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-neon-green animate-breathing" />
                    Monitoring Perimeter Live...
                </div>
            </footer>
        </div>
    );
};

export default Alerts;
