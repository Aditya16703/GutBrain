import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { GutBrainIcon } from "../icons/GutBrain";
import { TwitterIcon } from "../icons/twitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { LinkedinIcon } from "../icons/LinkedinIcon";
import { OtherIcon } from "../icons/OtherIcon";

export function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F9FBFC] overflow-x-hidden font-sans text-slate-900">
            {/* Navigation */}
            <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto backdrop-blur-sm bg-white/30 sticky top-0 z-50">
                <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate("/")}>
                    <GutBrainIcon />
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">GutBrain</span>
                </div>
                <div className="flex gap-4">
                    <Button 
                        variant="secondary" 
                        size="md" 
                        title="Sign In" 
                        onClick={() => navigate("/signin")}
                    />
                    <Button 
                        variant="primary" 
                        size="md" 
                        title="Sign Up" 
                        onClick={() => navigate("/signup")}
                    />
                </div>
            </nav>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-8 pt-20 pb-32 flex flex-col items-center text-center">
                <div className="space-y-6 max-w-3xl mb-16">
                    <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                        Master Your <br />
                        <span className="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">Digital Mind</span>
                    </h1>
                    <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
                        Collect, Organize, and connect your ideas and thoughts into an intelligent network. Stop losing information and start building knowledge.
                    </p>
                    <div className="pt-6 flex justify-center">
                        <Button 
                            variant="primary" 
                            size="lg" 
                            title="Join Now" 
                            onClick={() => navigate("/signup")}
                        />
                    </div>
                </div>

                {/* Diagram Section */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-11 gap-4 items-center mt-12 bg-white/50 backdrop-blur-xl p-10 md:p-14 rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(147,51,234,0.12)] border border-white transition-all duration-700 hover:shadow-[0_32px_64px_-12px_rgba(147,51,234,0.2)]">
                    
                    {/* Input Column */}
                    <div className="lg:col-span-3 space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-8 px-2">Input Sources</h3>
                        <div className="grid grid-cols-2 gap-5">
                            {[<TwitterIcon />, <YoutubeIcon />, <LinkedinIcon />, <OtherIcon />].map((icon, i) => (
                                <div key={i} className="aspect-square bg-white rounded-[2rem] flex items-center justify-center shadow-sm border border-slate-100 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-100/50 transition-all duration-300 group cursor-default">
                                    <div className="scale-110 opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 text-slate-600 group-hover:text-purple-600">
                                        {icon}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Arrow 1 */}
                    <div className="lg:col-span-1 flex justify-center py-6 lg:py-0">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute w-12 h-12 bg-purple-100 rounded-full animate-ping opacity-20"></div>
                            <svg className="w-8 h-8 text-slate-300 rotate-90 lg:rotate-0 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>

                    {/* GutBrain Processing Hub */}
                    <div className="lg:col-span-3 flex flex-col items-center justify-center p-12 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-[2.5rem] border border-white shadow-inner relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative z-10 flex flex-col items-center gap-8">

                            <div className="flex items-center gap-4 group-hover:scale-105 transition-transform duration-500">
                                <div className="text-purple-600 scale-125">
                                    <GutBrainIcon />
                                </div>
                                <h3 className="text-3xl font-black text-slate-800 tracking-tighter">GutBrain</h3>
                            </div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-[11px] font-bold text-white uppercase tracking-widest rounded-full shadow-lg shadow-purple-200">
                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                Syncing...
                            </div>
                        </div>
                    </div>

                    {/* Arrow 2 */}
                    <div className="lg:col-span-1 flex justify-center py-6 lg:py-0">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute w-12 h-12 bg-indigo-100 rounded-full animate-ping opacity-20 delay-500"></div>
                            <svg className="w-8 h-8 text-slate-300 rotate-90 lg:rotate-0 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>

                    {/* Organized Knowledge Cards */}
                    <div className="lg:col-span-3 space-y-6 text-left">
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-8 px-2">Knowledge Base</h3>
                        <div className="space-y-4">
                            {[
                                { icon: <TwitterIcon />, color: "text-slate-600", width: "w-3/4" },
                                { icon: <YoutubeIcon />, color: "text-slate-600", width: "w-1/2" },
                                { icon: <LinkedinIcon />, color: "text-slate-600", width: "w-2/3" },
                                { icon: <OtherIcon />, color: "text-slate-600", width: "w-3/5" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-50 hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-default">
                                    <div className={`scale-75 ${item.color}`}>
                                        {item.icon}
                                    </div>
                                    <div className="flex-grow space-y-2">
                                        <div className={`h-2.5 ${item.width} bg-slate-100/80 rounded-full`}></div>
                                        <div className="h-1.5 w-1/4 bg-slate-50 rounded-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-100 py-12 text-center text-slate-400 text-sm">
                <p>&copy; 2026 GutBrain. Build your intelligent network today.</p>
            </footer>
        </div>
    );
}
