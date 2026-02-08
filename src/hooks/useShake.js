import { useState, useEffect } from 'react';

const useShake = (threshold = 15) => {
    const [shake, setShake] = useState(false);

    useEffect(() => {
        let lastX = 0;
        let lastY = 0;
        let lastZ = 0;
        let lastTime = 0;

        const handleMotion = (e) => {
            const current = e.accelerationIncludingGravity;
            if (!current) return;

            const currentTime = Date.now();
            if ((currentTime - lastTime) > 100) {
                const diffTime = currentTime - lastTime;
                lastTime = currentTime;

                const speed = Math.abs(current.x + current.y + current.z - lastX - lastY - lastZ) / diffTime * 10000;

                if (speed > threshold) {
                    setShake(true);
                    // Auto-reset after a delay to allow re-shaking if needed, 
                    // but for our case, we might want to handle reset manually in the component.
                    // For now, let's just trigger it.
                    setTimeout(() => setShake(false), 1000);
                }

                lastX = current.x;
                lastY = current.y;
                lastZ = current.z;
            }
        };

        // Check if permission is needed (iOS 13+)
        if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
            // We can't request permission here in a hook automatically as it needs user interaction.
            // We'll trust the component to handle the permission request UI if needed,
            // or just add the listener if allowed.
        }

        window.addEventListener('devicemotion', handleMotion);

        return () => {
            window.removeEventListener('devicemotion', handleMotion);
        };
    }, [threshold]);

    return shake;
};

export default useShake;
