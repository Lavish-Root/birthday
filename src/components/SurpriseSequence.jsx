import React, { useState, useEffect } from 'react';
import useShake from '../hooks/useShake'; // Import custom hook
import img1 from '../assets/1.jpeg';
import img2 from '../assets/2.jpeg';
import img3 from '../assets/3.jpeg';
import img4 from '../assets/4.jpeg';
import img5 from '../assets/5.jpeg';

const SurpriseSequence = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [isRevealed, setIsRevealed] = useState(false); // State to control blur reveal
    const shake = useShake();

    const memories = [
        {
            id: 1,
            img: img1,
            text: "Every moment with you...",
        },
        {
            id: 2,
            img: img2,
            text: "Is a beautiful dream come true...",
        },
        {
            id: 3,
            img: img3,
            text: "And it keeps getting better ✨",
        },
        {
            id: 4,
            img: img4,
            text: "You make my world shine 🌟",
        },
        {
            id: 5,
            img: img5,
            text: "Forever isn't long enough ❤️",
        }
    ];

    // Effect to handle shake
    useEffect(() => {
        if (shake && !isRevealed) {
            setIsRevealed(true);
            // Optional: Add vibration feedback
            if (navigator.vibrate) navigator.vibrate(200);
        }
    }, [shake, isRevealed]);

    const handleNext = () => {
        if (!isRevealed) {
            // Fallback for desktop: Click to reveal if not shaken
            setIsRevealed(true);
            return;
        }

        if (step < memories.length - 1) {
            setStep(step + 1);
            setIsRevealed(false); // Reset reveal state for next photo
        } else {
            onComplete();
        }
    };

    // Request motion permission on mount (iOS 13+)
    useEffect(() => {
        if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
            // We can only request on user gesture, so maybe add a "Start" button overlay if not permitted?
            // For simplicity, we assume permission is granted or non-iOS for now, 
            // or the user has interacted previously.
        }
    }, []);

    return (
        <div
            onClick={handleNext}
            className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden cursor-pointer touch-manipulation"
        >
            {/* Dynamic Confetti for Celebration */}
            {isRevealed && (
                <div className="absolute inset-0 pointer-events-none z-50">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-confetti"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                fontSize: `${Math.random() * 1.5 + 0.5}rem`,
                                top: '-10%',
                            }}
                        >
                            {['❤️', '🌸', '✨', '🦋', '💍'][Math.floor(Math.random() * 5)]}
                        </div>
                    ))}
                </div>
            )}

            <div className="z-10 text-center space-y-8 animate-fadeIn w-full max-w-4xl px-4">
                <div key={step} className="animate-pop-in transition-all duration-500 relative">

                    {/* Image Frame with Tilt & Glow */}
                    <div className="relative inline-block group perspective-1000">
                        <div className="absolute inset-0 bg-rose-300 rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

                        <div className="relative p-4 bg-white shadow-2xl rounded-xl rotate-y-12 group-hover:rotate-y-0 transition-transform duration-700 transform-style-3d">

                            {/* Blur Overlay - The "Scratch/Shake" Effect */}
                            <div
                                className={`absolute inset-0 z-20 bg-white/70 backdrop-blur-md rounded-xl flex items-center justify-center transition-all duration-1000 ${isRevealed ? 'opacity-0 pointer-events-none transform scale-150' : 'opacity-100'}`}
                            >
                                <div className="text-center animate-pulse">
                                    <div className="text-6xl mb-4">📱</div>
                                    <p className="text-rose-600 font-bold text-xl uppercase tracking-widest">
                                        Shake to Reveal
                                    </p>
                                    <p className="text-xs text-gray-400 mt-2">(or tap if on PC)</p>
                                </div>
                            </div>

                            <img
                                src={memories[step].img}
                                alt="Memory"
                                className="w-full max-w-sm md:max-w-md h-auto object-cover rounded shadow-inner border-4 border-pink-100"
                                style={{ maxHeight: '60vh' }}
                            />

                            {isRevealed && (
                                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-max max-w-full z-30 animate-pop-in">
                                    <p className="font-handwriting text-2xl md:text-3xl text-rose-600 font-bold bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg border border-rose-200">
                                        {memories[step].text}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="fixed bottom-10 left-0 right-0 text-center text-sm animate-pulse opacity-60">
                    {isRevealed ? "Tap to see next memory..." : "Waiting for shake..."}
                </div>
            </div>

        </div>
    );
};

export default SurpriseSequence;
