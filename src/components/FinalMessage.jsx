import React, { useState } from 'react';

const FinalMessage = () => {
    const [isOpen, setIsOpen] = useState(false);

    if (!isOpen) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
                <p className="text-xl md:text-3xl text-rose-300 font-serif mb-8 leading-relaxed max-w-2xl drop-shadow-md">
                    kuch lines apke liye... ✨
                </p>

                <button
                    onClick={() => setIsOpen(true)}
                    className="px-8 py-3 bg-gradient-to-r from-rose-600 to-purple-600 rounded-full text-white font-bold text-xl shadow-[0_0_20px_rgba(255,105,180,0.5)] hover:scale-110 transition-transform duration-300 animate-bounce cursor-pointer z-50"
                >
                    Surprise ❤️
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 md:p-8 overflow-y-auto">
            {/* Removed white background, using text shadows for readability */}
            <div className="p-4 md:p-12 max-w-3xl w-full animate-fadeIn my-auto text-center space-y-8">

                <h1 className="text-3xl md:text-5xl font-bold text-rose-400 mb-6 font-serif drop-shadow-[0_0_10px_rgba(255,105,180,0.8)]">
                    Today isn’t just special —
                </h1>

                <div className="space-y-8 text-lg md:text-2xl text-white leading-relaxed font-serif drop-shadow-md">
                    <p>
                        it’s the kind of day my heart has been waiting for ✨<br />
                        Because today, the woman meant to be my forever💍🧿<br />
                        was born 🎂
                    </p>

                    <p>
                        I promise that today,<br />
                        I’ll put my whole heart into every little moment 💫<br />
                        so this day becomes a memory<br />
                        you’ll carry with you forever ❤️
                    </p>

                    <p>
                        There was no one like you before,<br />
                        and there will never be anyone like you again 💍<br />
                        How could there be,<br />
                        when no one else was ever created like you?
                    </p>

                    <p>
                        You’re like the moon 🌙<br />
                        soft, radiant, endlessly beautiful ✨<br />
                        I could spend my entire life just looking at you,<br />
                        and still, my heart would never feel full ❤️<br />
                        No matter how much I see you,<br />
                        it will always want more of you 🫂
                    </p>

                    <hr className="border-rose-500/50 w-1/2 mx-auto my-8" />

                    <p className="italic text-rose-300">
                        A few lines, just for you—<br />
                        When you smile, my whole world blooms 🌸<br />
                        And when you get ready,<br />
                        my eyes ache, longing just to see you 👀💖
                    </p>

                    <p className="text-base text-gray-400 mt-4 opacity-80">
                        I’ll stop here…<br />
                        because if I keep praising you,<br />
                        you might start flying a little too high 😂😌
                    </p>

                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-rose-500/30 shadow-2xl mt-8">
                        <p className="font-bold text-rose-200 text-xl md:text-2xl">
                            Just know this —<br />
                            you are my today 💞<br />
                            my tomorrow 🔮<br />
                            and every birthday I’ll celebrate<br />
                            for the rest of my life 🧿❤️
                        </p>
                    </div>

                    <p className="text-3xl md:text-4xl mt-12 font-bold text-rose-500 drop-shadow-[0_0_15px_rgba(255,20,147,0.8)]">
                        Happiest Birthday, my love 🎂😘<br />
                        Forever yours ❤️🫂
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FinalMessage;
