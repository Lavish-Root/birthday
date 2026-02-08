import React, { useEffect, useRef } from 'react';

const Fireworks = () => {
    const canvasRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        // Play sound
        if (audioRef.current) {
            audioRef.current.volume = 0.3; // Lower volume
            audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor(x, y, color) {
                this.x = x;
                this.y = y;
                this.color = color;
                // Slow motion: lower velocity
                this.velocity = {
                    x: (Math.random() - 0.5) * 3,
                    y: (Math.random() - 0.5) * 3
                };
                this.alpha = 1;
                this.friction = 0.99;
                this.gravity = 0.02; // Lower gravity for floaty feel
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            }

            update() {
                this.velocity.x *= this.friction;
                this.velocity.y *= this.friction;
                this.velocity.y += this.gravity;
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.alpha -= 0.005; // Slow fade
            }
        }

        const createFirework = () => {
            const x = Math.random() * canvas.width;
            const y = Math.random() * (canvas.height / 2);
            const color = `hsl(${Math.random() * 360}, 50%, 50%)`;

            for (let i = 0; i < 50; i++) {
                particles.push(new Particle(x, y, color));
            }
        };

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Trail effect
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, index) => {
                if (particle.alpha > 0) {
                    particle.update();
                    particle.draw();
                } else {
                    particles.splice(index, 1);
                }
            });

            if (Math.random() < 0.03) { // Occasional random firework
                createFirework();
            }
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none z-0"
                style={{ mixBlendMode: 'screen' }}
            />
            <audio
                ref={audioRef}
                src="https://cdn.pixabay.com/download/audio/2022/03/10/audio_5b383eb64f.mp3?filename=fireworks-29629.mp3"
                loop
            />
        </>
    );
};

export default Fireworks;
