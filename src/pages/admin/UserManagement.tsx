import { motion } from 'framer-motion';
import { UserPlus, Trash2 } from 'lucide-react';

const UserManagement = () => {
    const users = [
        { id: 'usr_01', email: 'admin@fusionguard.ai', role: 'admin', status: 'active' },
        { id: 'usr_02', email: 'user@fusionguard.ai', role: 'user', status: 'active' },
        { id: 'usr_03', email: 'guest@fusionguard.ai', role: 'user', status: 'inactive' },
    ];

    return (
        <div className="space-y-6 container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <h1 className="text-3xl font-extrabold text-white tracking-widest relative inline-block">
                    USER MANAGEMENT
                    <motion.div
                        className="absolute -bottom-2 left-0 h-0.5 bg-neon-cyan"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1 }}
                    />
                </h1>

                <button className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-neon-cyan/10 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black font-bold uppercase tracking-widest rounded transition-all">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add User
                </button>
            </div>

            <div className="glass-card border-dark-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-dark-surface/50 text-xs uppercase font-mono tracking-widest text-gray-300">
                            <tr>
                                <th className="px-6 py-4">Operator ID</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-border">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-dark-surface/30 transition-colors">
                                    <td className="px-6 py-4 font-mono text-white">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs rounded uppercase tracking-wider ${user.role === 'admin' ? 'bg-neon-red/10 text-neon-red border border-neon-red/20' : 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center">
                                            <span className={`w-2 h-2 rounded-full mr-2 ${user.status === 'active' ? 'bg-neon-green shadow-neon-green' : 'bg-gray-500'}`}></span>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-500 hover:text-neon-red transition-colors p-2">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
