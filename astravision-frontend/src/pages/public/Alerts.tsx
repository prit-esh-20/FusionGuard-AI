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
    const [alerts, setAlerts] = useState<any[]>([]);

    const fetchAlerts = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/alerts");
            const data = await res.json();
            setAlerts(data);
        } catch (err) {
            console.error("Failed to fetch alerts", err);
        }
    };

    useEffect(() => {
        fetchAlerts();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto flex flex-col">
            <header className="space-y-4">
                <div className="flex items-center gap-3 text-neon-cyan">
                    <ShieldAlert className="w-8 h-8 opacity-80" />
                    <h1 className="text-4xl font-black tracking-tight uppercase">System Alerts</h1>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <p className="text-gray-400 text-lg max-w-2xl font-medium">
                        Real-time log of security events and hardware status validation from the AstraVision perimeter.
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

                {alerts.map((alert, i) => (
                    <AlertItem 
                        key={alert.id || i} 
                        time={alert.created_at ? new Date(alert.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'N/A'}
                        msg={alert.message}
                        type={alert.severity || alert.type || 'info'}
                        status={alert.status || 'LOGGED'}
                    />
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
