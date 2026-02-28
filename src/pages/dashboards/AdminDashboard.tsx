import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystem } from '../../context/SystemContext';
import {
    Settings, Camera, Cpu, Zap, Sliders, Users, UserPlus, Trash2, Battery, Wifi, Clock, ShieldAlert, AlertTriangle
} from 'lucide-react';

const ControlPanel = ({ title, icon: Icon, children, className = '' }: any) => (
    <div className={`glass-card border border-dark-border p-5 relative overflow-hidden group hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,240,255,0.05)] transition-all duration-300 ${className}`}>
        <div className="flex items-center space-x-2 text-white mb-4 border-b border-dark-border pb-3 group-hover:border-neon-cyan/50 transition-colors">
            <Icon className="w-5 h-5 text-neon-cyan group-hover:animate-pulse group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all" />
            <h3 className="font-bold uppercase tracking-wider text-sm text-gray-200 group-hover:text-white transition-colors">{title}</h3>
        </div>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const AdminDashboard = () => {
    const { systemMode } = useSystem();
    const [patrolActive, setPatrolActive] = useState(true);
    const [mlEnabled, setMlEnabled] = useState(true);
    const [testMode, setTestMode] = useState(false);
    const [servoAngle, setServoAngle] = useState(90);
    const [mlThreshold, setMlThreshold] = useState(85);
    const [ultraThreshold, setUltraThreshold] = useState(2.5);
    const [thermSens, setThermSens] = useState(28.0);
    const [uptime] = useState('24:15:33');
    const [confirmAction, setConfirmAction] = useState<null | 'stop-motors' | 'reboot-esp32'>(null);

    interface Identity {
        id: string;
        name: string;
        email: string;
        role: 'Admin' | 'Operator' | 'Viewer';
        password?: string;
        status: 'Active' | 'Inactive';
    }

    const [users, setUsers] = useState<Identity[]>(() => {
        const saved = localStorage.getItem('fusionguard_users');
        if (saved) return JSON.parse(saved);
        return [
            { id: '1', name: 'admin_root', email: 'admin@fusionguard.ai', role: 'Admin', password: 'admin123', status: 'Active' },
            { id: '2', name: 'viewer_01', email: 'user@fusionguard.ai', role: 'Operator', password: 'user123', status: 'Active' },
        ];
    });

    React.useEffect(() => {
        localStorage.setItem('fusionguard_users', JSON.stringify(users));
    }, [users]);

    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [addUserState, setAddUserState] = useState<Partial<Identity>>({ name: '', email: '', role: 'Operator', password: '', status: 'Active' });
    const [addUserError, setAddUserError] = useState('');
    const [userSuccessToast, setUserSuccessToast] = useState('');
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    const activeUsersCount = users.filter(u => u.status === 'Active').length;
    const adminCount = users.filter(u => u.role === 'Admin').length;

    const handleCreateUser = () => {
        if (!addUserState.name || !addUserState.email || !addUserState.password || !addUserState.role) {
            setAddUserError('All fields are required.');
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(addUserState.email)) {
            setAddUserError('Invalid email format.');
            return;
        }
        if (addUserState.password.length < 6) {
            setAddUserError('Password must be at least 6 characters.');
            return;
        }
        if (users.some(u => u.email === addUserState.email)) {
            setAddUserError('Email already exists.');
            return;
        }

        const newUser: Identity = {
            id: Date.now().toString(),
            name: addUserState.name,
            email: addUserState.email,
            role: addUserState.role as Identity['role'],
            password: addUserState.password,
            status: addUserState.status as Identity['status'] || 'Active'
        };
        setUsers([...users, newUser]);
        setShowAddUserModal(false);
        setAddUserState({ name: '', email: '', role: 'Operator', password: '', status: 'Active' });
        setAddUserError('');
        setUserSuccessToast('Identity Successfully Provisioned');
        setTimeout(() => setUserSuccessToast(''), 3000);
    };

    const handleDeleteUser = () => {
        if (!userToDelete) return;
        const user = users.find(u => u.id === userToDelete);
        if (user?.email === 'admin@fusionguard.ai') {
            setUserToDelete(null);
            return;
        }
        if (user?.role === 'Admin' && adminCount <= 1) {
            setUserToDelete(null);
            return; // Prevent demoting last admin
        }
        setUsers(users.filter(u => u.id !== userToDelete));
        setUserToDelete(null);
    };

    const toggleUserStatus = (id: string) => {
        setUsers(users.map(u => {
            if (u.id === id) {
                if (u.email === 'admin@fusionguard.ai') return u;
                if (u.role === 'Admin' && u.status === 'Active' && adminCount <= 1) return u;
                return { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' };
            }
            return u;
        }));
    };

    return (
        <div className="max-w-7xl mx-auto space-y-4 pb-20 p-2 md:p-6 h-full overflow-y-auto custom-scrollbar relative">

            <AnimatePresence>
                {userSuccessToast && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, x: '-50%' }}
                        animate={{ opacity: 1, y: 30, x: '-50%' }}
                        exit={{ opacity: 0, y: -50, x: '-50%' }}
                        className="fixed top-0 left-1/2 z-50 px-6 py-3 rounded-full flex items-center space-x-3 bg-neon-cyan/10 border border-neon-cyan text-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    >
                        <span className="font-bold tracking-widest uppercase text-sm">{userSuccessToast}</span>
                    </motion.div>
                )}

                {showAddUserModal && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-dark-base border border-neon-cyan/50 shadow-[0_0_30px_rgba(0,240,255,0.15)] p-6 max-w-md w-full relative pointer-events-auto rounded-lg"
                        >
                            <h3 className="text-white font-bold uppercase tracking-widest text-lg mb-6 flex items-center"><UserPlus className="w-5 h-5 text-neon-cyan mr-2" /> Create System Identity</h3>

                            <div className="space-y-4 mb-6">
                                {addUserError && (
                                    <div className="bg-red-500/10 border border-neon-red/50 text-neon-red px-3 py-2 text-xs font-mono rounded">
                                        {addUserError}
                                    </div>
                                )}
                                <input type="text" placeholder="Full Name" value={addUserState.name} onChange={e => setAddUserState({ ...addUserState, name: e.target.value })} className="w-full bg-dark-surface border border-dark-border px-3 py-2 text-white font-mono text-sm focus:border-neon-cyan outline-none rounded" />
                                <input type="email" placeholder="Email Address" value={addUserState.email} onChange={e => setAddUserState({ ...addUserState, email: e.target.value })} className="w-full bg-dark-surface border border-dark-border px-3 py-2 text-white font-mono text-sm focus:border-neon-cyan outline-none rounded" />

                                <select value={addUserState.role} onChange={e => setAddUserState({ ...addUserState, role: e.target.value as Identity['role'] })} className="w-full bg-dark-surface border border-dark-border px-3 py-2 text-white font-mono text-sm focus:border-neon-cyan outline-none rounded appearance-none">
                                    <option value="Admin">Admin</option>
                                    <option value="Operator">Operator</option>
                                    <option value="Viewer">Viewer (Read-only)</option>
                                </select>

                                <input type="password" placeholder="Temporary Password" value={addUserState.password} onChange={e => setAddUserState({ ...addUserState, password: e.target.value })} className="w-full bg-dark-surface border border-dark-border px-3 py-2 text-white font-mono text-sm focus:border-neon-cyan outline-none rounded" />

                                <div className="flex items-center justify-between bg-dark-surface border border-dark-border p-3 rounded">
                                    <span className="text-gray-400 font-mono text-xs uppercase tracking-widest">Account Status</span>
                                    <button onClick={() => setAddUserState({ ...addUserState, status: addUserState.status === 'Active' ? 'Inactive' : 'Active' })} className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded transition-colors ${addUserState.status === 'Active' ? 'bg-green-500/20 text-green-500 border border-green-500' : 'bg-gray-500/20 text-gray-500 border border-gray-500'}`}>
                                        {addUserState.status}
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button onClick={() => { setShowAddUserModal(false); setAddUserError(''); }} className="px-4 py-2 text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-white transition-colors">Cancel</button>
                                <button onClick={handleCreateUser} className="px-4 py-2 text-xs font-bold tracking-widest uppercase bg-neon-cyan/20 text-neon-cyan border border-neon-cyan hover:bg-neon-cyan hover:text-black transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)]">Create Identity</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {userToDelete && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-dark-base border border-neon-red/50 shadow-[0_0_30px_rgba(255,50,50,0.15)] p-6 max-w-sm w-full relative before:absolute before:inset-0 before:border before:border-neon-red/20 before:animate-pulse pointer-events-auto rounded-lg"
                        >
                            <h3 className="text-neon-red font-bold uppercase tracking-widest text-lg mb-2">Delete Identity</h3>
                            <p className="text-gray-300 font-mono text-sm mb-6">This action will permanently revoke access for this user. Continue?</p>
                            <div className="flex justify-end space-x-4 relative z-10">
                                <button onClick={() => setUserToDelete(null)} className="px-4 py-2 text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-white transition-colors">Cancel</button>
                                <button onClick={handleDeleteUser} className="px-4 py-2 text-xs font-bold tracking-widest uppercase bg-neon-red/20 text-neon-red border border-neon-red hover:bg-neon-red hover:text-black transition-all shadow-[0_0_10px_rgba(255,50,50,0.2)]">Confirm</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {confirmAction && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-dark-base border border-neon-red/50 shadow-[0_0_30px_rgba(255,50,50,0.15)] p-6 max-w-sm w-full relative before:absolute before:inset-0 before:border before:border-neon-red/20 before:animate-pulse pointer-events-auto"
                        >
                            <h3 className="text-neon-red font-bold uppercase tracking-widest text-lg mb-2">Confirm Action</h3>
                            <p className="text-gray-300 font-mono text-sm mb-6">This action will interrupt active system processes. Continue?</p>
                            <div className="flex justify-end space-x-4 relative z-10">
                                <button
                                    onClick={() => setConfirmAction(null)}
                                    className="px-4 py-2 text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        if (confirmAction === 'stop-motors') setPatrolActive(!patrolActive);
                                        // Fake reboot
                                        setConfirmAction(null);
                                    }}
                                    className="px-4 py-2 text-xs font-bold tracking-widest uppercase bg-neon-red/20 text-neon-red border border-neon-red hover:bg-neon-red hover:text-black transition-all shadow-[0_0_10px_rgba(255,50,50,0.2)]"
                                >
                                    Confirm
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 mb-4 mt-4 md:mt-0">
                <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                        <h1 className="text-3xl font-extrabold text-white tracking-widest relative inline-block w-fit">
                            SYSTEM CONTROL CENTER
                            <motion.div
                                className="absolute -bottom-2 left-0 h-0.5 bg-neon-cyan"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1 }}
                            />
                        </h1>
                        <div className={`flex items-center space-x-2 border px-3 py-1.5 rounded-full self-start ml-3 transition-all duration-500 ${systemMode === 'ACTIVE' ? 'bg-green-500/10 border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.1)]' : 'bg-neon-red/10 border-neon-red/50 shadow-[0_0_10px_rgba(255,50,50,0.1)]'}`}>
                            <span className={`w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)] ${systemMode === 'ACTIVE' ? 'bg-green-500' : 'bg-neon-red'}`} />
                            <span className={`text-[10px] font-bold tracking-widest uppercase ${systemMode === 'ACTIVE' ? 'text-green-500' : 'text-neon-red'}`}>
                                {systemMode === 'ACTIVE' ? 'System Active' : 'System Deactivated'}
                            </span>
                        </div>
                    </div>
                    <span className="text-neon-cyan/80 text-sm font-mono tracking-widest uppercase mt-4 block">
                        Administrative Command Interface
                    </span>

                    <AnimatePresence>
                        {systemMode === 'INACTIVE' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-neon-red/10 border border-neon-red/50 rounded-lg p-3 flex items-center space-x-3 mt-4"
                            >
                                <AlertTriangle className="w-5 h-5 text-neon-red flex-shrink-0 animate-pulse" />
                                <p className="text-neon-red text-xs font-mono uppercase tracking-wider font-bold">
                                    System is currently deactivated. Autonomous operations paused.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Header Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass-panel p-4 flex items-center justify-between border-l-2 border-dark-border hover:bg-white/5 hover:border-gray-500 transition-colors group">
                    <div><p className="text-[10px] text-gray-500 uppercase tracking-widest">Sys Uptime</p><p className="font-mono text-gray-300 text-lg font-bold group-hover:text-white transition-colors">{uptime}</p></div>
                    <Clock className="text-gray-500 w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:text-gray-300 transition-all" />
                </div>
                <div className="glass-panel p-4 flex items-center justify-between border-l-2 border-dark-border hover:bg-white/5 hover:border-neon-blue transition-colors group">
                    <div><p className="text-[10px] text-gray-500 uppercase tracking-widest">CPU Load</p><p className="font-mono text-gray-300 text-lg font-bold group-hover:text-white transition-colors">42%</p></div>
                    <Cpu className="text-gray-500 w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:text-neon-blue transition-all" />
                </div>
                <div className="glass-panel p-4 flex items-center justify-between border-l-4 border-neon-green/80 hover:border-neon-green hover:shadow-[0_0_15px_rgba(50,255,50,0.1)] transition-all group duration-300 hover:-translate-y-0.5">
                    <div><p className="text-xs text-neon-green/80 uppercase tracking-widest font-bold drop-shadow-[0_0_2px_rgba(50,255,50,0.5)]">Bat. Voltage</p><p className="font-mono text-white text-xl font-bold group-hover:text-neon-green transition-colors">11.4V</p></div>
                    <Battery className="text-neon-green/80 w-6 h-6 drop-shadow-[0_0_5px_rgba(50,255,50,0.5)] group-hover:text-neon-green transition-all" />
                </div>
                <div className="glass-panel p-4 flex items-center justify-between border-l-4 border-purple-500/80 hover:border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.1)] transition-all group duration-300 hover:-translate-y-0.5">
                    <div><p className="text-xs text-purple-500/80 uppercase tracking-widest font-bold drop-shadow-[0_0_2px_rgba(168,85,247,0.5)]">WiFi Signal</p><p className="font-mono text-white text-xl font-bold group-hover:text-purple-400 transition-colors">-68 dBm</p></div>
                    <Wifi className="text-purple-500/80 w-6 h-6 drop-shadow-[0_0_5px_rgba(168,85,247,0.5)] group-hover:text-purple-400 transition-all" />
                </div>
            </div>

            <div className="text-right pb-1">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Last System Sync: 12:42:08 | Server: Connected</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* System Control Panel */}
                <ControlPanel title="Core Hardware Control" icon={Settings}>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-300 font-mono text-sm">Patrol Subsystem</span>
                        <button
                            title={systemMode === 'INACTIVE' ? 'System must be activated before starting patrol.' : ''}
                            disabled={systemMode === 'INACTIVE'}
                            onClick={() => {
                                if (patrolActive) setConfirmAction('stop-motors');
                                else setPatrolActive(true);
                            }}
                            className={`px-4 py-2 rounded font-bold uppercase text-xs tracking-wider transition-colors ${systemMode === 'INACTIVE' ? 'bg-dark-surface border-dark-border text-gray-600 grayscale' : (patrolActive ? 'bg-neon-red/20 text-neon-red border border-neon-red hover:bg-neon-red hover:text-black' : 'bg-neon-green/20 text-neon-green border border-neon-green hover:bg-neon-green hover:text-black')}`}
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
                            className="w-full accent-neon-cyan cursor-grab active:cursor-grabbing"
                            title={`${servoAngle}°`}
                            disabled={patrolActive}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                        <button className="flex items-center justify-center space-x-2 bg-dark-surface hover:bg-white/10 px-3 py-2 border border-dark-border text-xs font-mono uppercase transition-colors">
                            <Camera className="w-4 h-4 text-neon-cyan" /> <span>Force Cap</span>
                        </button>
                        <button
                            onClick={() => setConfirmAction('reboot-esp32')}
                            className="flex items-center justify-center space-x-2 bg-red-500/10 hover:bg-neon-red hover:text-black px-3 py-2 border border-neon-red/50 text-neon-red text-xs font-mono uppercase transition-colors"
                        >
                            <Zap className="w-4 h-4" /> <span>Reboot ESP32</span>
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
                                title={`${ultraThreshold.toFixed(1)}m`}
                                type="range" min="0.5" max="5.0" step="0.1" value={ultraThreshold}
                                onChange={(e) => setUltraThreshold(parseFloat(e.target.value))}
                                className="w-full accent-neon-blue cursor-grab active:cursor-grabbing"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-gray-400 font-mono">
                                <span>Thermal Alert Base Sensitivity</span>
                                <span className="text-neon-red">{thermSens.toFixed(1)}°C</span>
                            </div>
                            <input
                                title={`${thermSens.toFixed(1)}°C`}
                                type="range" min="20" max="40" step="0.5" value={thermSens}
                                onChange={(e) => setThermSens(parseFloat(e.target.value))}
                                className="w-full accent-neon-red line-glow-red cursor-grab active:cursor-grabbing"
                            />
                        </div>
                    </div>
                </ControlPanel>

                {/* ML Configuration Panel */}
                <ControlPanel title="Machine Learning Parameters" icon={Cpu}>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-300 font-mono text-sm">Vision Engine</span>
                        <button
                            onClick={() => setMlEnabled(!mlEnabled)}
                            className={`w-12 h-6 rounded-full relative transition-all duration-300 ${mlEnabled ? 'bg-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.4)]' : 'bg-dark-surface border border-dark-border'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${mlEnabled ? 'translate-x-[22px]' : 'translate-x-1'}`} />
                        </button>
                    </div>

                    <div className="space-y-2 py-2">
                        <div className="flex justify-between text-xs text-gray-400 font-mono">
                            <span>Confidence Threshold</span>
                            <span className="text-neon-cyan">{mlThreshold}%</span>
                        </div>
                        <input
                            title={`${mlThreshold}%`}
                            type="range" min="70" max="99" value={mlThreshold}
                            onChange={(e) => setMlThreshold(parseInt(e.target.value))}
                            className="w-full accent-neon-cyan cursor-grab active:cursor-grabbing"
                        />
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-dark-border mt-4">
                        <span className="text-gray-300 font-mono text-sm">Diagnostic Mode (Mock Data)</span>
                        <button
                            onClick={() => setTestMode(!testMode)}
                            className={`px-3 py-1 rounded text-xs uppercase font-bold border transition-colors ${testMode ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-black' : 'text-gray-500 border-dark-border hover:border-gray-500'}`}
                        >
                            {testMode ? 'Active' : 'Standby'}
                        </button>
                    </div>
                </ControlPanel>

                {/* Alert Summary Panel */}
                <ControlPanel title="System Alerts Summary" icon={ShieldAlert}>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-dark-surface/50 p-3 rounded border border-dark-border hover:border-neon-cyan/50 hover:shadow-[0_0_10px_rgba(0,240,255,0.1)] transition-colors">
                            <span className="text-sm text-gray-300 font-mono">Today's Alerts</span>
                            <span className="text-neon-cyan font-bold font-mono">12</span>
                        </div>
                        <div className="flex justify-between items-center bg-red-500/10 p-3 rounded border border-red-500/30 hover:border-red-500/80 hover:shadow-[0_0_10px_rgba(255,50,50,0.1)] transition-colors">
                            <span className="text-sm text-red-400 font-mono">Critical Incidents</span>
                            <span className="text-neon-red font-bold font-mono">3</span>
                        </div>
                        <div className="flex justify-between items-center bg-dark-surface/50 p-3 rounded border border-dark-border hover:border-neon-cyan/50 hover:shadow-[0_0_10px_rgba(0,240,255,0.1)] transition-colors">
                            <span className="text-sm text-gray-300 font-mono">False Positives</span>
                            <span className="text-gray-400 font-bold font-mono">0</span>
                        </div>
                    </div>
                </ControlPanel>

            </div>

            {/* User Management */}
            <div className="grid grid-cols-1 mt-5">
                <ControlPanel title="Identity Access Management" icon={Users}>
                    <div className="flex items-center space-x-6 mb-4 text-[10px] uppercase font-mono tracking-widest text-gray-400 border-b border-dark-border/50 pb-3">
                        <span>Active Users: <strong className="text-white">{activeUsersCount}</strong></span>
                        <span>Administrators: <strong className="text-neon-cyan">{adminCount}</strong></span>
                    </div>

                    <button onClick={() => setShowAddUserModal(true)} className="w-full flex justify-center items-center space-x-2 border border-dashed border-dark-border text-gray-400 py-3 rounded hover:border-neon-cyan hover:text-neon-cyan hover:bg-neon-cyan/5 transition-all mb-4 neon-border-cyan group">
                        <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="uppercase font-bold text-xs">Provision New Identity</span>
                    </button>

                    <div className="space-y-2">
                        <AnimatePresence>
                            {users.map(u => (
                                <motion.div
                                    key={u.id}
                                    initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                                    className={`flex justify-between items-center p-2 border rounded hover:border-neon-cyan/50 hover:shadow-[0_0_10px_rgba(0,240,255,0.1)] transition-all ${u.status === 'Inactive' ? 'bg-dark-base border-dark-border opacity-50' : 'bg-dark-surface/50 border-dark-border'}`}
                                >
                                    <div className="flex flex-col">
                                        <div className="flex items-center space-x-2">
                                            <p className="text-sm text-white font-bold tracking-wide">{u.name}</p>
                                            {u.role === 'Admin' && <span className="px-1.5 py-0.5 text-[8px] font-bold text-neon-red border border-neon-red/50 bg-neon-red/10 rounded tracking-widest uppercase">Admin</span>}
                                        </div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">{u.email} • {u.role}</p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <button onClick={() => toggleUserStatus(u.id)} className={`text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded border transition-colors ${u.status === 'Active' ? 'text-green-500 bg-green-500/10 border-green-500/20 hover:bg-green-500/30' : 'text-gray-400 bg-gray-500/10 border-gray-500/20 hover:bg-gray-500/30'}`}>
                                            {u.status}
                                        </button>
                                        {u.email !== 'admin@fusionguard.ai' && (
                                            <button onClick={() => setUserToDelete(u.id)} className="text-gray-500 hover:text-neon-red transition-colors p-1" title="Revoke Access">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </ControlPanel>
            </div>
        </div>
    );
};

export default AdminDashboard;
