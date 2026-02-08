import React, { useState } from 'react';

const Login = ({ onLogin, onInteraction, onTransitionStart }) => {
    const [name, setName] = useState('');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const handleInputChange = (e) => {
        setName(e.target.value);
        if (!hasInteracted) {
            setHasInteracted(true);
            if (onInteraction) onInteraction();
        }
    };

    const handleLogin = () => {
        if (!name.trim()) return;

        setIsTransitioning(true);
        setTimeout(() => {
            onLogin(name);
        }, 2000); // Shorter transition for this flow
    };

    return (
        <div
            onClick={() => {
                if (!hasInteracted) {
                    setHasInteracted(true);
                    if (onInteraction) onInteraction();
                }
            }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 transition-colors duration-1000"
        >
            {!isTransitioning ? (
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl text-center space-y-6 animate-fadeIn max-w-md w-full mx-4 border border-white/20">
                    <div className="text-5xl mb-2 animate-bounce">🧁</div>
                    <h1 className="text-3xl font-bold text-rose-300 font-serif">Sweet Login</h1>
                    <p className="text-gray-300">Who is the birthday girl?</p>

                    <input
                        type="text"
                        placeholder="Enter your name..."
                        value={name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 text-center text-lg"
                    />

                    <button
                        onClick={handleLogin}
                        disabled={!name.trim()}
                        className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
                    >
                        <span>Enter Birthday World</span>
                        <span>🎂</span>
                    </button>
                </div>
            ) : (
                <div className="fixed inset-0 bg-black flex items-center justify-center z-50 transition-colors duration-1000">
                    <div className="text-center px-6">
                        <p className="text-2xl md:text-3xl text-rose-300 font-serif animate-pulse leading-relaxed">
                            Traveling to the universe... 🚀✨
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
