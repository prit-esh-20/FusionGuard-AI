import { motion } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell
} from 'recharts';
import { CheckCircle, Clock, ShieldAlert, Zap } from 'lucide-react';

const latencyData = [
    { time: '00:00', latency: 45 },
    { time: '04:00', latency: 42 },
    { time: '08:00', latency: 55 },
    { time: '12:00', latency: 60 },
    { time: '16:00', latency: 48 },
    { time: '20:00', latency: 50 },
    { time: '24:00', latency: 44 },
];

const detectionData = [
    { name: 'Human', rate: 94.5 },
    { name: 'Vehicle', rate: 88.2 },
    { name: 'Animal', rate: 91.0 },
    { name: 'Unknown', rate: 12.5 },
];

const StatHighlight = ({ icon: Icon, value, label, colorClass }: any) => (
    <div className="flex flex-col items-center glass-card p-6 border-dark-border text-center">
        <Icon className={`w-8 h-8 text-${colorClass} mb-4`} />
        <span className="text-4xl font-bold text-white mb-2">{value}</span>
        <span className="text-sm text-gray-400 uppercase tracking-widest">{label}</span>
    </div>
);

const ExperimentalResults = () => {
    return (
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6"
            >
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-panel border-purple-500/50 text-purple-400 uppercase text-xs font-bold tracking-widest">
                    <Zap className="w-4 h-4" />
                    <span>Real-World Field Testing</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white">EXPERIMENTAL RESULTS</h1>
                <p className="max-w-2xl mx-auto text-gray-400 text-lg">
                    Empirical data gathered from 500+ hours of autonomous patrolling across varied environmental conditions.
                </p>
            </motion.div>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <StatHighlight icon={ShieldAlert} value="99.2%" label="False Alarm Reduction" colorClass="neon-cyan" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <StatHighlight icon={Clock} value="48ms" label="Average Latency" colorClass="neon-blue" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <StatHighlight icon={CheckCircle} value="10,000+" label="Frames Processed" colorClass="neon-green" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <StatHighlight icon={Zap} value="94.5%" label="Peak Accuracy" colorClass="purple-500" />
                </motion.div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Latency Area Chart */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-panel p-6 rounded-2xl border-dark-border"
                >
                    <h3 className="text-xl font-bold text-white mb-6">System Latency Over 24h</h3>
                    <div className="h-72 w-full text-xs">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={latencyData}>
                                <defs>
                                    <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00A3FF" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#00A3FF" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                                <XAxis dataKey="time" stroke="#64748b" />
                                <YAxis stroke="#64748b" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0B0F17', borderColor: '#00A3FF', color: '#fff' }}
                                    itemStyle={{ color: '#00F0FF' }}
                                />
                                <Area type="monotone" dataKey="latency" stroke="#00F0FF" fillOpacity={1} fill="url(#colorLatency)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Detection Rate Bar Chart */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-panel p-6 rounded-2xl border-dark-border"
                >
                    <h3 className="text-xl font-bold text-white mb-6">Detection Accuracy by Target</h3>
                    <div className="h-72 w-full text-xs">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={detectionData} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                                <XAxis type="number" stroke="#64748b" domain={[0, 100]} />
                                <YAxis dataKey="name" type="category" stroke="#E2E8F0" />
                                <Tooltip
                                    cursor={{ fill: '#1E293B' }}
                                    contentStyle={{ backgroundColor: '#0B0F17', borderColor: '#00F0FF', color: '#fff' }}
                                />
                                <Bar dataKey="rate" fill="#00F0FF" radius={[0, 4, 4, 0]} barSize={20}>
                                    {detectionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.rate > 90 ? '#00F0FF' : (entry.rate > 50 ? '#00A3FF' : '#64748B')} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Component Performance Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-2 glass-panel p-6 rounded-2xl border-dark-border overflow-x-auto scrollbar-custom"
                >
                    <h3 className="text-xl font-bold text-white mb-6">Algorithm Performance Comparison</h3>
                    <table className="min-w-full text-sm text-left text-gray-400">
                        <thead className="text-xs text-neon-cyan uppercase bg-dark-surface/50 border-b border-dark-border">
                            <tr>
                                <th className="px-6 py-4 rounded-tl-lg">Detection Type</th>
                                <th className="px-6 py-4">Precision</th>
                                <th className="px-6 py-4">Recall</th>
                                <th className="px-6 py-4">F1 Score</th>
                                <th className="px-6 py-4 rounded-tr-lg">Processing Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-dark-border hover:bg-dark-surface/30 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">YOLOv8 Edge</td>
                                <td className="px-6 py-4 text-neon-green">94.2%</td>
                                <td className="px-6 py-4">91.5%</td>
                                <td className="px-6 py-4">92.8%</td>
                                <td className="px-6 py-4">28ms</td>
                            </tr>
                            <tr className="border-b border-dark-border hover:bg-dark-surface/30 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">Thermal Thresholding</td>
                                <td className="px-6 py-4">88.5%</td>
                                <td className="px-6 py-4 text-neon-green">96.0%</td>
                                <td className="px-6 py-4">92.1%</td>
                                <td className="px-6 py-4 text-neon-green">12ms</td>
                            </tr>
                            <tr className="hover:bg-dark-surface/30 transition-colors">
                                <td className="px-6 py-4 font-medium text-neon-cyan">Sensor Fusion (Combined)</td>
                                <td className="px-6 py-4 text-neon-cyan font-bold">98.1%</td>
                                <td className="px-6 py-4 text-neon-cyan font-bold">97.4%</td>
                                <td className="px-6 py-4 text-neon-cyan font-bold">97.7%</td>
                                <td className="px-6 py-4 font-bold">45ms</td>
                            </tr>
                        </tbody>
                    </table>
                </motion.div>
            </div>
        </div>
    );
};

export default ExperimentalResults;
