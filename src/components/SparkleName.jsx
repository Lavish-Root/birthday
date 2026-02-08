import React, { useEffect, useRef } from 'react';

const SparkleName = ({ onComplete }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let textPoints = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // 1. Get Text Coordinates
        const getTextPoints = (text) => {
            const tempCanvas = document.createElement('canvas');
            const tCtx = tempCanvas.getContext('2d');
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;

            tCtx.font = 'bold 80px serif';
            // Adjust font size based on screen width
            if (window.innerWidth < 600) {
                tCtx.font = 'bold 30px serif';
            }

            tCtx.fillStyle = '#fff';
            tCtx.textAlign = 'center';
            tCtx.textBaseline = 'middle';
            tCtx.fillText(text, canvas.width / 2, canvas.height / 2);

            // Skip pixels to reduce density - Lower gap = Higher density/Sharpness
            const imageData = tCtx.getImageData(0, 0, canvas.width, canvas.height).data;
            // Skip pixels to reduce density - Increased gap for performance stability
            const gap = 3;

            for (let y = 0; y < canvas.height; y += gap) {
                for (let x = 0; x < canvas.width; x += gap) {
                    const index = (y * canvas.width + x) * 4;
                    if (imageData[index + 3] > 128) {
                        points.push({ x, y });
                    }
                }
            }
            return points;
        };

        textPoints = getTextPoints("Love u Talluu");

        // 2. Particle Class
        class Particle {
            constructor(targetX, targetY) {
                // Start from center/bottom (explosive start)
                this.x = canvas.width / 2;
                this.y = canvas.height;
                this.destX = targetX;
                this.destY = targetY;
                this.vx = (Math.random() - 0.5) * 10;
                this.vy = (Math.random() - 1) * 20; // Upward initial velocity
                this.accX = 0;
                this.accY = 0;
                this.friction = 0.95;
                this.color = `hsl(${Math.random() * 60 + 30}, 100%, 75%)`; // Brighter Gold/Yellow
                this.size = Math.random() * 2 + 1.5; // Larger and bolder particles for clarity
                this.state = 'launch'; // launch, converge, hold
            }

            update() {
                if (this.state === 'launch') {
                    this.x += this.vx;
                    this.y += this.vy;
                    this.vx *= this.friction;
                    this.vy *= this.friction;

                    // Roughly converge logic switch (simplified)
                    const dx = this.destX - this.x;
                    const dy = this.destY - this.y;
                    this.x += dx * 0.05;
                    this.y += dy * 0.05;

                    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
                        this.state = 'hold';
                    }
                } else if (this.state === 'hold') {
                    // Jitter
                    this.x = this.destX + (Math.random() - 0.5) * 2;
                    this.y = this.destY + (Math.random() - 0.5) * 2;
                }
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles
        textPoints.forEach(pt => {
            particles.push(new Particle(pt.x, pt.y));
        });

        // 3. Animation Loop
        let startTime = Date.now();
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear fully for crisp text

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Auto complete after 5 seconds
            if (Date.now() - startTime > 5000) {
                // Use a flag to prevent multiple calls
                if (onComplete) {
                    onComplete();
                    startTime = Date.now() + 100000; // hack to stop calling
                }
            }
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-50 pointer-events-none" />;
};

export default SparkleName;
