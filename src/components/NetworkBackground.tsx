import { useCallback, useEffect, useRef, useState } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { 
  Point, 
  Line,
  initializePoints, 
  updatePoints, 
  createLines, 
  drawNetwork 
} from '../utils/canvasUtils';

const NETWORK_CONFIG = {
  numPoints: 50,
  connectionDistance: 200,
  pointSpeed: 0.3
};

export default function NetworkBackground() {
  const [points, setPoints] = useState<Point[]>([]);
  const animationRef = useRef<number>();
  const mousePos = useRef<{ x: number; y: number } | null>(null);

  const handleResize = useCallback((width: number, height: number) => {
    setPoints(initializePoints(
      width, 
      height, 
      NETWORK_CONFIG.numPoints, 
      NETWORK_CONFIG.pointSpeed
    ));
  }, []);

  const { canvasRef, contextRef } = useCanvas({ onResize: handleResize });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!contextRef.current || !canvasRef.current || points.length === 0) return;

    const ctx = contextRef.current;
    const canvas = canvasRef.current;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create base gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width
      );
      gradient.addColorStop(0, 'rgba(234, 88, 12, 0.15)'); // orange-500
      gradient.addColorStop(0.5, 'rgba(251, 146, 60, 0.05)'); // orange-400
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid pattern
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      
      const gridSize = 30;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Update and draw network
      updatePoints(points, canvas.width, canvas.height, mousePos.current);
      const lines = createLines(points, NETWORK_CONFIG.connectionDistance);
      drawNetwork(ctx, points, lines, mousePos.current);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [points]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0"
    />
  );
}