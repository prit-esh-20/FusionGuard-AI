import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Trash2, X } from 'lucide-react';

const UserManagement = () => {
    const [users, setUsers] = useState([
        { id: 'usr_01', email: 'admin@astravision.ai', role: 'admin', status: 'active' },
        { id: 'usr_02', email: 'user@astravision.ai', role: 'user', status: 'active' },
        { id: 'usr_03', email: 'guest@astravision.ai', role: 'user', status: 'inactive' },
    ]);

    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [newRole, setNewRole] = useState('user');

    const handleAddUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEmail.trim()) return;

        const newUser = {
            id: `usr_${Math.random().toString(36).substr(2, 6)}`,
            email: newEmail,
            role: newRole,
            status: 'active'
        };

        setUsers([...users, newUser]);
        setNewEmail('');
        setNewRole('user');
        setIsAddUserOpen(false);
    };

    const handleDeleteUser = (id: string) => {
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div className="space-y-6 container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <h1 className="text-2xl md:text-3xl font-bold font-heading text-white uppercase tracking-[0.1em] drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                    USER MANAGEMENT
                </h1>

                <button
                    onClick={() => setIsAddUserOpen(true)}
                    className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-neon-cyan/10 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black font-bold uppercase tracking-widest rounded transition-all"
                >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add User
                </button>
            </div>

            <div className="glass-card border-dark-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-dark-surface/50 text-xs uppercase font-mono tracking-widest text-gray-300 border-b border-dark-border">
                            <tr>
                                <th className="px-6 py-4">Operator ID</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-border">
                            <AnimatePresence>
                                {users.map((user) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="hover:bg-dark-surface/30 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-mono text-white">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-[10px] rounded font-bold uppercase tracking-wider ${user.role === 'admin' ? 'bg-neon-red/10 text-neon-red border border-neon-red/20' : 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center text-xs uppercase tracking-widest font-bold">
                                                <span className={`w-2 h-2 rounded-full mr-2 ${user.status === 'active' ? 'bg-neon-green shadow-[0_0_8px_rgba(57,255,20,0.8)]' : 'bg-gray-500'}`}></span>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDeleteUser(user.id)}
                                                className="text-gray-500 hover:text-neon-red transition-colors p-2"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add User Modal */}
            <AnimatePresence>
                {isAddUserOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-dark-surface border border-neon-cyan/30 rounded-xl shadow-[0_0_40px_rgba(0,240,255,0.1)] w-full max-w-md overflow-hidden relative"
                        >
                            <div className="flex justify-between items-center p-4 border-b border-dark-border bg-black/40">
                                <h3 className="text-lg font-bold font-heading text-white uppercase tracking-widest flex items-center">
                                    <UserPlus className="w-5 h-5 mr-3 text-neon-cyan" />
                                    Add New User
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setIsAddUserOpen(false)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleAddUser} className="p-6 space-y-6 bg-dark-base">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Operator ID / Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        className="w-full bg-black/50 border border-dark-border rounded px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all font-mono placeholder:text-gray-600"
                                        placeholder="user@astravision.ai"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Assign Role</label>
                                    <div className="flex space-x-4">
                                        <button
                                            type="button"
                                            onClick={() => setNewRole('user')}
                                            className={`flex-1 py-3 border rounded text-xs font-bold uppercase tracking-widest transition-all ${newRole === 'user' ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.3)]' : 'bg-black/30 border-dark-border text-gray-400 hover:border-gray-500'}`}
                                        >
                                            Operator
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setNewRole('admin')}
                                            className={`flex-1 py-3 border rounded text-xs font-bold uppercase tracking-widest transition-all ${newRole === 'admin' ? 'bg-neon-red/20 border-neon-red text-neon-red shadow-[0_0_15px_rgba(255,50,50,0.3)]' : 'bg-black/30 border-dark-border text-gray-400 hover:border-gray-500'}`}
                                        >
                                            Admin
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end space-x-4 border-t border-dark-border mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddUserOpen(false)}
                                        className="px-6 py-2 border border-dark-border text-gray-300 rounded font-bold uppercase tracking-widest hover:bg-dark-surface transition-colors text-xs hover:text-white"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-neon-cyan/10 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black font-bold uppercase tracking-widest rounded transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)] text-xs"
                                    >
                                        Deploy User
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserManagement;
