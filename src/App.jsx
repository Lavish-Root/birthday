import React, { useState } from 'react';
import Landing from './components/Landing';
import SurpriseSequence from './components/SurpriseSequence';
import FinalMessage from './components/FinalMessage';
import Login from './components/Login';
import Fireworks from './components/Fireworks';
import SparkleName from './components/SparkleName';
import bgMusic from './assets/bg-music.m4a';
import bgMusic1 from './assets/bg-music1.mp3';

function App() {
  const [stage, setStage] = useState('login'); // Start with login
  const [userName, setUserName] = useState('');
  const [isDarkUniverse, setIsDarkUniverse] = useState(false);

  const handleTransitionStart = () => {
    // Play audio immediately on interaction
    const audio = document.getElementById('global-audio');
    if (audio) {
      audio.volume = 0.5; // Start audibly
      audio.play().catch(console.error);
    }
  };

  const handleLogin = (name) => {
    setUserName(name);
    setIsDarkUniverse(true); // Switch to dark universe
    setStage('landing');

    // Fade in music at Landing
    const audio = document.getElementById('global-audio');
    if (audio) {
      audio.volume = 0.5;
      // Ensure it's playing (in case transition start failed or was skipped)
      if (audio.paused) audio.play().catch(console.error);
    }
  };



  const handleStart = () => {
    setStage('name-reveal'); // Go to sparkle name first

    // Switch Audio IMMEDIATELY on button click
    const audio1 = document.getElementById('global-audio');
    const audio2 = document.getElementById('surprise-audio');

    if (audio1) {
      audio1.pause();
      audio1.currentTime = 0;
    }

    if (audio2) {
      audio2.volume = 0.6;
      audio2.play().catch(console.error);
    }
  };

  const handleNameComplete = () => {
    setStage('surprise');
  };

  const handleSurpriseComplete = () => {
    setStage('final');
  };

  return (
    <div className={`font-sans min-h-screen transition-colors duration-1000 ${isDarkUniverse ? 'bg-black text-white' : 'bg-pink-50 text-gray-800'}`}>



      {/* Global Fireworks in Dark Universe */}
      {isDarkUniverse && <Fireworks />}

      {/* Global Background Music */}
      <audio id="global-audio" src={bgMusic} loop />
      <audio id="surprise-audio" src={bgMusic1} loop />

      <div className="relative z-10">
        {stage === 'login' && <Login onLogin={handleLogin} onTransitionStart={handleTransitionStart} onInteraction={handleTransitionStart} />}

        {stage === 'landing' && (
          // Pass user name if we want to personalize later
          <Landing onStart={handleStart} />
        )}



        {stage === 'name-reveal' && <SparkleName onComplete={handleNameComplete} />}

        {stage === 'surprise' && <SurpriseSequence onComplete={handleSurpriseComplete} />}

        {stage === 'final' && <FinalMessage />}
      </div>
    </div>
  );
}

export default App;
