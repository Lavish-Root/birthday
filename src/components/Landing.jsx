import React, { useState, useEffect } from 'react';

const Landing = ({ onStart }) => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowButton(true);
        }, 5000); // 5 seconds delay
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black text-rose-300">
            <div className="relative w-full h-screen flex flex-col items-center justify-center">
                <h1 className="text-3xl md:text-5xl font-bold animate-fadeIn text-center px-4 font-serif tracking-wide drop-shadow-lg">
                    bas abb kuch nahi hai age byy 👋
                </h1>

                {showButton && (
                    <button
                        onClick={onStart}
                        className="absolute bottom-10 right-10 z-50 px-6 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white font-serif hover:bg-white/20 transition-all animate-bounce shadow-[0_0_15px_rgba(255,255,255,0.3)] cursor-pointer animate-fadeIn"
                    >
                        See the Magic ✨
                    </button>
                )}
            </div>
        </div>
    );
};

export default Landing;
