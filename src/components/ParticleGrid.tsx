import { useEffect, useRef } from 'react';

export default function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180,
    };

    // Grid configuration
    const spacing = 28;
    const cols = Math.ceil(width / spacing) + 1;
    const rows = Math.ceil(height / spacing) + 1;

    interface Point {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      phase: number;
    }

    const points: Point[] = [];

    // Initialize points
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = c * spacing;
        const y = r * spacing;
        points.push({
          x,
          y,
          baseX: x,
          baseY: y,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    let time = 0;

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      time += 0.006;

      // Draw subtle green radial glow for background depth
      if (mouse.x > 0) {
        const glowGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          10,
          mouse.x,
          mouse.y,
          mouse.radius * 1.5
        );
        glowGrad.addColorStop(0, 'rgba(217, 255, 0, 0.04)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.fillStyle = 'rgba(217, 255, 0, 0.45)'; // Lime color with alpha

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        // Ambient fluid wave logic
        const waveX = Math.sin(time + pt.phase) * 3;
        const waveY = Math.cos(time + pt.phase) * 3;

        // Interaction calculation
        const dx = mouse.x - pt.baseX;
        const dy = mouse.y - pt.baseY;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        let forceX = 0;
        let forceY = 0;
        let scale = 1;

        if (dist < mouse.radius) {
          // Push particles away slightly
          const force = (mouse.radius - dist) / mouse.radius;
          forceX = (dx / dist) * force * -15;
          forceY = (dy / dist) * force * -15;
          // Increase size of dots close to mouse
          scale = 1 + force * 1.5;
        }

        // Interpolate target coordinate
        const targetX = pt.baseX + waveX + forceX;
        const targetY = pt.baseY + waveY + forceY;

        pt.x += (targetX - pt.x) * 0.1;
        pt.y += (targetY - pt.y) * 0.1;

        // Determine particle brightness/alpha based on vertical position & mouse proximity
        let opacity = 0.08;
        
        // Silhouette overlay shape (soft central vignette of dense thinking space)
        const screenCenterX = width / 2;
        const screenCenterY = height / 2;
        const distCenter = Math.sqrt(
          Math.pow(pt.baseX - screenCenterX, 2) + Math.pow(pt.baseY - screenCenterY, 2)
        );
        
        // Base density silhouette resembling a cognitive network structure
        const silhouette = Math.max(0, 1 - distCenter / (width * 0.65));
        opacity += silhouette * 0.18;

        if (dist < mouse.radius) {
          const factor = (mouse.radius - dist) / mouse.radius;
          opacity += factor * 0.45;
        }

        // Prevent rendering fully invisible particles
        if (opacity <= 0.01) continue;

        ctx.fillStyle = `rgba(217, 255, 0, ${opacity})`;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1.2 * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      id="particle-grid-canvas"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
    />
  );
}
