import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;
    
    // Config
    const particleCount = 40;
    const maxDistance = 150;
    const colors = ['#066665', '#0D4F4E', '#C7A76C'];
    const particles = [];
    
    let gridOffset = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 2 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Add a subtle glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Init particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(235, 230, 216, 0.03)'; // Very subtle grid
      ctx.lineWidth = 1;
      const gridSize = 40;
      
      gridOffset += 0.2;
      if (gridOffset > gridSize) gridOffset = 0;

      ctx.beginPath();
      // Vertical lines
      for (let x = gridOffset; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      // Horizontal lines
      for (let y = gridOffset; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw moving grid
      drawGrid();

      // Update and draw particles
      particles.forEach(p => p.update());
      
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            // Opacity based on distance
            const opacity = 1 - (distance / maxDistance);
            // Use primary teal for lines
            ctx.strokeStyle = `rgba(6, 102, 101, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => p.draw());

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: '#0A0F0E' }}
    />
  );
};

export default AnimatedBackground;
