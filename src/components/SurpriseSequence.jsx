import React, { useState } from 'react';
import img1 from '../assets/1.jpeg';
import img2 from '../assets/2.jpeg';
import img3 from '../assets/3.jpeg';
import img4 from '../assets/4.jpeg';
import img5 from '../assets/5.jpeg';

const SurpriseSequence = ({ onComplete }) => {
    const [step, setStep] = useState(0);

    const memories = [
        { id: 1, img: img1, text: "Every moment with you..." },
        { id: 2, img: img2, text: "Is a beautiful dream come true..." },
        { id: 3, img: img3, text: "And it keeps getting better ✨" },
        { id: 4, img: img4, text: "You make my world shine 🌟" },
        { id: 5, img: img5, text: "Forever isn't long enough ❤️" }
    ];

    const handleNext = () => {
        if (step < memories.length - 1) {
            setStep(step + 1);
        } else {
            onComplete();
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden cursor-pointer touch-manipulation" onClick={handleNext}>

            {/* Dynamic Confetti */}
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

            <div className="z-10 text-center space-y-8 animate-fadeIn w-full max-w-4xl px-4 flex flex-col items-center">
                <div key={step} className="animate-pop-in transition-all duration-500 relative w-full flex flex-col items-center">

                    {/* Image Frame */}
                    <div className="relative inline-block group perspective-1000 w-full max-w-xs md:max-w-md">
                        <div className="absolute inset-0 bg-rose-300 rounded-lg blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

                        <div className="relative p-2 md:p-4 bg-white shadow-2xl rounded-xl rotate-y-12 group-hover:rotate-y-0 transition-transform duration-700 transform-style-3d overflow-hidden">
                            <img
                                src={memories[step].img}
                                alt="Memory"
                                className="w-full h-auto object-cover rounded shadow-inner border-2 md:border-4 border-pink-100"
                                style={{ maxHeight: '60vh' }}
                            />
                        </div>
                    </div>

                    {/* Caption Below Image */}
                    <div className="mt-8 z-30 animate-pop-in">
                        <p className="font-handwriting text-xl md:text-3xl text-rose-300 font-bold drop-shadow-md px-4 py-2 text-center">
                            {memories[step].text}
                        </p>
                    </div>

                </div>

                <div className="fixed bottom- safe-pb-4 left-0 right-0 text-center text-xs md:text-sm animate-pulse opacity-60 text-gray-400">
                    Tap to see next memory...
                </div>
            </div>

        </div>
    );
};

export default SurpriseSequence;
