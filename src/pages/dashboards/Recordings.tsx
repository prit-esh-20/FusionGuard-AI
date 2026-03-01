import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Download, Video, X, Calendar, Clock, HardDrive, Filter, FileVideo } from 'lucide-react';

// Mock Data
const MOCK_RECORDINGS = [
    { id: 1, title: 'Motion Detection – Sector 3', type: 'Motion', date: '15 June 2023 – 14:30', duration: '00:45', size: '24.5 MB', timestamp: 1686839400000 },
    { id: 2, title: 'Intrusion Alert – Main Entrance', type: 'Intrusion', date: '14 June 2023 – 02:15', duration: '03:20', size: '112.0 MB', timestamp: 1686708900000 },
    { id: 3, title: 'Night Patrol – Perimeter', type: 'Patrol', date: '13 June 2023 – 23:00', duration: '45:00', size: '1.2 GB', timestamp: 1686697200000 },
    { id: 4, title: 'Tamper Detection – Parking Lot', type: 'Tamper', date: '12 June 2023 – 09:45', duration: '01:15', size: '45.8 MB', timestamp: 1686563100000 },
    { id: 5, title: 'Motion Detection – Server Room', type: 'Motion', date: '10 June 2023 – 11:30', duration: '00:30', size: '18.2 MB', timestamp: 1686396600000 },
];

const Recordings = () => {
    const [filter, setFilter] = useState('All');
    const [sort, setSort] = useState('Latest First');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedVideo, setSelectedVideo] = useState<any | null>(null);

    const filteredAndSorted = useMemo(() => {
        let result = MOCK_RECORDINGS;

        if (filter !== 'All') {
            result = result.filter(r => r.type === filter);
        }

        result.sort((a, b) => {
            if (sort === 'Latest First') return b.timestamp - a.timestamp;
            return a.timestamp - b.timestamp;
        });

        return result;
    }, [filter, sort]);

    const handleDownload = (e: React.MouseEvent, title: string) => {
        e.stopPropagation();
        // Simulate download
        alert(`Simulating download for: ${title}`);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto flex flex-col">
            <div className="mb-10 text-center flex flex-col items-center">
                <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest drop-shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center justify-center w-full">
                    <Video className="w-6 h-6 md:w-8 md:h-8 mr-4 text-neon-cyan inline-block shrink-0" />
                    SECURITY RECORDINGS
                </h1>
                <p className="text-sm text-neon-cyan/70 font-mono mt-3 tracking-widest uppercase text-center w-full block">Captured incidents and patrol recordings</p>
                <div className="h-1 w-24 bg-gradient-to-r from-transparent via-neon-cyan to-transparent mt-6 opacity-40 mx-auto" />
            </div>

            {/* Filter and Sort Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-[#0b1220]/80 border border-neon-cyan/20 p-4 rounded-xl backdrop-blur-md gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)] relative z-10">
                <div className="flex items-center space-x-2 sm:space-x-4 w-full md:w-auto overflow-x-auto custom-scrollbar pb-2 md:pb-0 scroll-smooth snap-x">
                    <Filter className="w-4 h-4 text-gray-400 hidden sm:block shrink-0" />
                    {['All', 'Motion', 'Intrusion', 'Patrol', 'Tamper'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap snap-center shrink-0 ${filter === f ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]' : 'bg-transparent text-gray-400 border border-transparent hover:text-white hover:border-dark-border hover:bg-white/5'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div className="w-full md:w-auto flex justify-end shrink-0">
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="w-full md:w-auto bg-black/50 border border-neon-cyan/30 text-neon-cyan text-xs font-bold uppercase tracking-widest rounded-lg px-4 py-3 focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] appearance-none cursor-pointer pr-10 hover:border-neon-cyan/60 transition-colors"
                        style={{ backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2300f0ff%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.7rem top 50%', backgroundSize: '0.65rem auto' }}
                    >
                        <option value="Latest First" className="bg-[#0b1220]">Latest First</option>
                        <option value="Oldest First" className="bg-[#0b1220]">Oldest First</option>
                    </select>
                </div>
            </div>

            {/* Grid */}
            {filteredAndSorted.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 min-h-[400px]">
                    <AnimatePresence mode="popLayout">
                        {filteredAndSorted.map((rec) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                                transition={{ duration: 0.3 }}
                                key={rec.id}
                                className="bg-[#0b1220]/80 backdrop-blur-sm border border-dark-border rounded-xl overflow-hidden hover:border-neon-cyan/40 hover:shadow-[0_0_25px_rgba(0,240,255,0.1)] transition-all duration-300 group flex flex-col h-full shadow-lg"
                            >
                                {/* Thumbnail */}
                                <div className="relative aspect-video bg-[#05080f] overflow-hidden flex items-center justify-center cursor-pointer" onClick={() => setSelectedVideo(rec)}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-transparent to-transparent z-10 opacity-90" />
                                    <FileVideo className="w-12 h-12 text-neon-cyan/5 group-hover:scale-125 transition-transform duration-700 absolute" />

                                    {/* Play Button Overlay */}
                                    <div className="z-20 w-12 h-12 rounded-full bg-neon-cyan/10 backdrop-blur-md border border-neon-cyan/50 flex items-center justify-center text-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.2)] group-hover:bg-neon-cyan group-hover:text-black group-hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] group-hover:scale-110 group-hover:border-neon-cyan transition-all duration-300">
                                        <Play className="w-5 h-5 ml-1" fill="currentColor" />
                                    </div>

                                    <div className="absolute bottom-2 right-2 z-20 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest text-white border border-white/10 shadow-md">
                                        {rec.duration}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex flex-col flex-grow relative z-20 bg-gradient-to-b from-[#0b1220]/0 to-[#0b1220]/80">
                                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 leading-normal group-hover:text-neon-cyan transition-colors h-10 line-clamp-2">
                                        {rec.title}
                                    </h3>

                                    <div className="space-y-2 mb-6 flex-grow bg-black/20 p-3 rounded-lg border border-white/5">
                                        <div className="flex items-center text-xs font-mono text-gray-400">
                                            <Calendar className="w-3.5 h-3.5 mr-2 text-neon-cyan" />
                                            {rec.date}
                                        </div>
                                        <div className="flex items-center text-xs font-mono text-gray-400">
                                            <Clock className="w-3.5 h-3.5 mr-2 text-neon-cyan" />
                                            {rec.duration}
                                        </div>
                                        <div className="flex items-center text-xs font-mono text-gray-400">
                                            <HardDrive className="w-3.5 h-3.5 mr-2 text-neon-cyan" />
                                            {rec.size}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="grid grid-cols-2 gap-3 mt-auto">
                                        <button
                                            onClick={() => setSelectedVideo(rec)}
                                            className="w-full py-2.5 bg-neon-cyan/10 border border-neon-cyan text-neon-cyan rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center space-x-2"
                                        >
                                            <Play className="w-3.5 h-3.5" fill="currentColor" />
                                            <span>Play</span>
                                        </button>
                                        <button
                                            onClick={(e) => handleDownload(e, rec.title)}
                                            className="w-full py-2.5 bg-transparent border border-neon-green/50 text-neon-green rounded-lg text-[10px] font-black uppercase tracking-widest hover:border-neon-green hover:bg-neon-green/10 hover:shadow-[0_0_15px_rgba(0,255,100,0.2)] transition-all flex items-center justify-center space-x-2 group/btn"
                                        >
                                            <Download className="w-3.5 h-3.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                            <span>Save</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-grow flex flex-col items-center justify-center py-24 bg-[#0b1220]/30 rounded-2xl border border-dark-border border-dashed backdrop-blur-sm"
                >
                    <div className="w-24 h-24 rounded-full bg-black/50 border border-dark-border flex items-center justify-center mb-6 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
                        <FileVideo className="w-10 h-10 text-gray-700" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-2">No Recordings Found</h3>
                    <p className="text-sm text-gray-500 font-mono text-center max-w-sm">No security captures match the current filtering parameters. Adjust filters to search past archives.</p>
                </motion.div>
            )}

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#0b1220] border border-neon-cyan/40 rounded-2xl w-full max-w-5xl overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.15)] relative flex flex-col max-h-[90vh]"
                        >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent shadow-[0_0_10px_rgba(0,240,255,0.5)]" />

                            <div className="p-4 sm:p-6 border-b border-white/5 flex justify-between items-start bg-[#060a12]/80 backdrop-blur-md shrink-0 relative z-20">
                                <div>
                                    <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-widest leading-tight pr-8 text-neon-cyan drop-shadow-md flex items-center">
                                        <Video className="w-5 h-5 mr-3 hidden sm:block opacity-70" />
                                        {selectedVideo.title}
                                    </h2>
                                    <div className="flex flex-wrap items-center gap-3 mt-3">
                                        <span className="text-xs font-mono text-gray-400 bg-black/60 px-2.5 py-1 rounded border border-white/5 shadow-inner">
                                            {selectedVideo.date}
                                        </span>
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-neon-cyan bg-neon-cyan/5 px-2.5 py-1 rounded border border-neon-cyan/20">
                                            {selectedVideo.type} Alert
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedVideo(null)}
                                    className="p-2 sm:p-2.5 rounded-full bg-dark-surface border border-dark-border text-gray-400 hover:text-white hover:border-neon-red/50 hover:bg-neon-red/10 hover:shadow-[0_0_15px_rgba(255,50,50,0.2)] transition-all group shrink-0"
                                >
                                    <X className="w-5 h-5 group-hover:scale-110 transition-transform group-hover:text-neon-red" />
                                </button>
                            </div>

                            <div className="aspect-video bg-black relative flex items-center justify-center overflow-hidden shrink-0">
                                {/* Simulated Player */}
                                <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/tv-noise.png')]" />

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 1 }}
                                    className="absolute animate-pulse text-neon-cyan/20 flex flex-col items-center"
                                >
                                    <Play className="w-20 h-20 mb-6 drop-shadow-[0_0_20px_rgba(0,240,255,0.5)]" />
                                    <span className="font-mono text-sm uppercase tracking-[0.2em] font-bold bg-black/40 px-4 py-2 rounded-lg border border-neon-cyan/20">Playing Secure Stream...</span>
                                </motion.div>

                                {/* Overlay scanline */}
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-1 bg-neon-cyan/20 blur-[2px] z-10"
                                    animate={{ top: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                                />

                                <div className="absolute bottom-4 left-4 z-20 flex space-x-3">
                                    <span className="text-[10px] font-mono text-white/70 font-bold bg-black/80 px-3 py-1.5 rounded tracking-widest border border-white/10 flex items-center shadow-lg">
                                        <span className="w-1.5 h-1.5 rounded-full bg-neon-red mr-2 animate-pulse" />
                                        PLAYBACK SEC-01
                                    </span>
                                    <span className="text-[10px] font-mono text-neon-cyan font-bold bg-black/80 px-3 py-1.5 rounded tracking-widest border border-neon-cyan/20 shadow-lg">
                                        {selectedVideo.duration}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 bg-[#060a12]/80 border-t border-white/5 flex justify-end shrink-0">
                                <button
                                    onClick={(e) => handleDownload(e, selectedVideo.title)}
                                    className="py-2.5 px-6 bg-transparent border border-neon-green text-neon-green rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-neon-green/10 hover:shadow-[0_0_15px_rgba(0,255,100,0.2)] transition-all flex items-center justify-center space-x-2"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Download File</span>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default Recordings;
