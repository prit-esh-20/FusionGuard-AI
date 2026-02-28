import { useState } from 'react';
import {
    Settings, Camera, Cpu, Zap, Sliders, Users, UserPlus, Trash2, Battery, Wifi, Clock
} from 'lucide-react';

const ControlPanel = ({ title, icon: Icon, children }: any) => (
    <div className="glass-card border border-dark-border p-5 relative overflow-hidden group">
        <div className="flex items-center space-x-2 text-white mb-4 border-b border-dark-border pb-3">
            <Icon className="w-5 h-5 text-neon-cyan group-hover:animate-pulse" />
            <h3 className="font-bold uppercase tracking-wider text-sm">{title}</h3>
        </div>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const AdminDashboard = () => {
    const [patrolActive, setPatrolActive] = useState(true);
    const [mlEnabled, setMlEnabled] = useState(true);
    const [testMode, setTestMode] = useState(false);
    const [servoAngle, setServoAngle] = useState(90);
    const [mlThreshold, setMlThreshold] = useState(85);
    const [ultraThreshold, setUltraThreshold] = useState(2.5);
    const [thermSens, setThermSens] = useState(28.0);
    const [uptime] = useState('24:15:33');

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-20 p-2 md:p-6 h-full overflow-y-auto custom-scrollbar">

            {/* Header Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass-panel p-4 flex items-center justify-between border-l-4 border-neon-cyan">
                    <div><p className="text-xs text-gray-500 uppercase">Sys Uptime</p><p className="font-mono text-white text-lg font-bold">{uptime}</p></div>
                    <Clock className="text-neon-cyan w-6 h-6 opacity-50" />
                </div>
                <div className="glass-panel p-4 flex items-center justify-between border-l-4 border-neon-blue">
                    <div><p className="text-xs text-gray-500 uppercase">CPU Load</p><p className="font-mono text-white text-lg font-bold">42%</p></div>
                    <Cpu className="text-neon-blue w-6 h-6 opacity-50" />
                </div>
                <div className="glass-panel p-4 flex items-center justify-between border-l-4 border-neon-green">
                    <div><p className="text-xs text-gray-500 uppercase">Bat. Voltage</p><p className="font-mono text-white text-lg font-bold">11.4V</p></div>
                    <Battery className="text-neon-green w-6 h-6 opacity-50" />
                </div>
                <div className="glass-panel p-4 flex items-center justify-between border-l-4 border-purple-500">
                    <div><p className="text-xs text-gray-500 uppercase">WiFi Signal</p><p className="font-mono text-white text-lg font-bold">-68 dBm</p></div>
                    <Wifi className="text-purple-500 w-6 h-6 opacity-50" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {/* System Control Panel */}
                <ControlPanel title="Core Hardware Control" icon={Settings}>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-300 font-mono text-sm">Patrol Subsystem</span>
                        <button
                            onClick={() => setPatrolActive(!patrolActive)}
                            className={`px-4 py-2 rounded font-bold uppercase text-xs tracking-wider transition-colors ${patrolActive ? 'bg-neon-red/20 text-neon-red border border-neon-red' : 'bg-neon-green/20 text-neon-green border border-neon-green'}`}
                        >
                            {patrolActive ? 'Stop Motors' : 'Initialize Sweep'}
                        </button>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-400 font-mono">
                            <span>Manual Override (Servo)</span>
                            <span>{servoAngle}°</span>
                        </div>
                        <input
                            type="range" min="0" max="180" value={servoAngle}
                            onChange={(e) => setServoAngle(parseInt(e.target.value))}
                            className="w-full accent-neon-cyan"
                            disabled={patrolActive}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <button className="flex items-center justify-center space-x-2 bg-dark-surface hover:bg-white/10 px-3 py-2 border border-dark-border text-xs font-mono uppercase transition-colors">
                            <Camera className="w-4 h-4 text-neon-cyan" /> <span>Force Cap</span>
                        </button>
                        <button className="flex items-center justify-center space-x-2 bg-red-500/10 hover:bg-neon-red hover:text-black px-3 py-2 border border-neon-red/50 text-neon-red text-xs font-mono uppercase transition-colors">
                            <Zap className="w-4 h-4" /> <span>Reboot ESP32</span>
                        </button>
                    </div>
                </ControlPanel>

                {/* ML Configuration Panel */}
                <ControlPanel title="Machine Learning Parameters" icon={Cpu}>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-300 font-mono text-sm">Vision Engine</span>
                        <button
                            onClick={() => setMlEnabled(!mlEnabled)}
                            className={`w-12 h-6 rounded-full relative transition-colors ${mlEnabled ? 'bg-neon-cyan' : 'bg-dark-surface border border-dark-border'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${mlEnabled ? 'right-1' : 'left-1'}`} />
                        </button>
                    </div>

                    <div className="space-y-2 py-2">
                        <div className="flex justify-between text-xs text-gray-400 font-mono">
                            <span>Confidence Threshold</span>
                            <span className="text-neon-cyan">{mlThreshold}%</span>
                        </div>
                        <input
                            type="range" min="70" max="99" value={mlThreshold}
                            onChange={(e) => setMlThreshold(parseInt(e.target.value))}
                            className="w-full accent-neon-cyan"
                        />
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-dark-border mt-4">
                        <span className="text-gray-300 font-mono text-sm">Diagnostic Mode (Mock Data)</span>
                        <button
                            onClick={() => setTestMode(!testMode)}
                            className={`px-3 py-1 rounded text-xs uppercase font-bold border transition-colors ${testMode ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500' : 'text-gray-500 border-dark-border'}`}
                        >
                            {testMode ? 'Active' : 'Standby'}
                        </button>
                    </div>
                </ControlPanel>

                {/* Sensor Configuration */}
                <ControlPanel title="Sensor Calibration" icon={Sliders}>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-gray-400 font-mono">
                                <span>Ultrasonic Trigger Distance</span>
                                <span className="text-neon-blue">{ultraThreshold.toFixed(1)}m</span>
                            </div>
                            <input
                                type="range" min="0.5" max="5.0" step="0.1" value={ultraThreshold}
                                onChange={(e) => setUltraThreshold(parseFloat(e.target.value))}
                                className="w-full accent-neon-blue"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-gray-400 font-mono">
                                <span>Thermal Alert Base Sensitivity</span>
                                <span className="text-neon-red">{thermSens.toFixed(1)}°C</span>
                            </div>
                            <input
                                type="range" min="20" max="40" step="0.5" value={thermSens}
                                onChange={(e) => setThermSens(parseFloat(e.target.value))}
                                className="w-full accent-neon-red line-glow-red"
                            />
                        </div>
                    </div>
                </ControlPanel>

                {/* User Management */}
                <ControlPanel title="Identity Access Management" icon={Users}>
                    <button className="w-full flex justify-center items-center space-x-2 border border-dashed border-dark-border text-gray-400 py-3 rounded hover:border-neon-cyan hover:text-neon-cyan transition-colors mb-4 neon-border-cyan group">
                        <UserPlus className="w-5 h-5 group-hover:scale-110" />
                        <span className="uppercase font-bold text-xs">Provision New Identity</span>
                    </button>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-dark-surface/50 border border-dark-border rounded">
                            <div>
                                <p className="text-sm text-white font-bold">admin_root</p>
                                <p className="text-[10px] text-neon-cyan uppercase tracking-wider">Superuser</p>
                            </div>
                            <span className="text-xs text-green-500 bg-green-500/10 px-2 rounded">Active</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-dark-surface/50 border border-dark-border rounded">
                            <div>
                                <p className="text-sm text-white font-bold">viewer_01</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Read Only</p>
                            </div>
                            <button className="text-gray-500 hover:text-neon-red transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </ControlPanel>

            </div>
        </div>
    );
};

export default AdminDashboard;
