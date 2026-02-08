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
    const [needsPermission, setNeedsPermission] = useState(false);
    const shake = useShake();

    const memories = [
        { id: 1, img: img1, text: "Every moment with you..." },
        { id: 2, img: img2, text: "Is a beautiful dream come true..." },
        { id: 3, img: img3, text: "And it keeps getting better ✨" },
        { id: 4, img: img4, text: "You make my world shine 🌟" },
        { id: 5, img: img5, text: "Forever isn't long enough ❤️" }
    ];

    // Check for iOS permission requirement on mount
    useEffect(() => {
        if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
            setNeedsPermission(true);
        }
    }, []);

    const requestMotionPermission = async () => {
        try {
            const response = await DeviceMotionEvent.requestPermission();
            if (response === 'granted') {
                setNeedsPermission(false);
            } else {
                alert("Permission needed for shake feature! Tap 'Next' manually.");
                setNeedsPermission(false);
            }
        } catch (e) {
            console.error(e);
            setNeedsPermission(false);
        }
    };

    // Effect to handle shake
    useEffect(() => {
        if (shake && !isRevealed) {
            setIsRevealed(true);
            if (navigator.vibrate) navigator.vibrate(200);
        }
    }, [shake, isRevealed]);

    const handleNext = () => {
        if (!isRevealed) {
            // Fallback: Click to reveal
            setIsRevealed(true);
            return;
        }

        if (step < memories.length - 1) {
            setStep(step + 1);
            setIsRevealed(false);
        } else {
            onComplete();
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden cursor-pointer touch-manipulation">

            {/* iOS Permission Request Overlay */}
            {needsPermission && step === 0 && !isRevealed && (
                <div className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
                    <p className="text-rose-300 text-xl mb-4 font-serif">Enable Magic Shake? ✨</p>
                    <button
                        onClick={requestMotionPermission}
                        className="px-6 py-3 bg-white text-rose-600 rounded-full font-bold shadow-lg animate-bounce"
                    >
                        Yes, Activate! 📱
                    </button>
                    <p className="text-gray-500 text-sm mt-4">(Or tap anywhere to continue without shaking)</p>
                </div>
            )}

            {/* Dynamic Confetti */}
            {isRevealed && (
                <div className="absolute inset-0 pointer-events-none z-40">
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

            <div
                className="z-10 text-center space-y-8 animate-fadeIn w-full max-w-4xl px-4 flex flex-col items-center"
                onClick={handleNext}
            >
                <div key={step} className="animate-pop-in transition-all duration-500 relative w-full flex justify-center">

                    {/* Image Frame */}
                    <div className="relative inline-block group perspective-1000 w-full max-w-xs md:max-w-md">
                        <div className="absolute inset-0 bg-rose-300 rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

                        <div className="relative p-2 md:p-4 bg-white shadow-2xl rounded-xl rotate-y-12 group-hover:rotate-y-0 transition-transform duration-700 transform-style-3d overflow-hidden">

                            {/* Blur Overlay */}
                            <div
                                className={`absolute inset-0 z-20 bg-white/60 backdrop-blur-md rounded-xl flex items-center justify-center transition-all duration-1000 ${isRevealed ? 'opacity-0 pointer-events-none transform scale-150' : 'opacity-100'}`}
                            >
                                <div className="text-center animate-pulse px-4">
                                    <div className="text-5xl md:text-6xl mb-2 md:mb-4">📱</div>
                                    <p className="text-rose-600 font-bold text-lg md:text-xl uppercase tracking-widest">
                                        Shake to Reveal
                                    </p>
                                    <p className="text-xs md:text-sm text-gray-500 mt-2">(or tap to see)</p>
                                </div>
                            </div>

                            <img
                                src={memories[step].img}
                                alt="Memory"
                                className="w-full h-auto object-cover rounded shadow-inner border-2 md:border-4 border-pink-100"
                                style={{ maxHeight: '60vh' }}
                            />

                            {isRevealed && (
                                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-[110%] z-30 animate-pop-in">
                                    <p className="font-handwriting text-lg md:text-2xl text-rose-600 font-bold bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-rose-200 whitespace-nowrap">
                                        {memories[step].text}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="fixed bottom- safe-pb-4 left-0 right-0 text-center text-xs md:text-sm animate-pulse opacity-60 text-gray-400">
                    {isRevealed ? "Tap to see next memory..." : "Waiting for shake (or tap)..."}
                </div>
            </div>

        </div>
    );
};

export default SurpriseSequence;
