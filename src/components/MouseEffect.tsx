import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Position {
  x: number;
  y: number;
  timestamp: number;
}

interface ButtonTarget {
  element: HTMLElement;
  rect: DOMRect;
  center: { x: number; y: number };
}

export default function MouseEffect() {
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0, timestamp: Date.now() });
  const [isMoving, setIsMoving] = useState(false);
  const [trail, setTrail] = useState<Position[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [aimbotTarget, setAimbotTarget] = useState<ButtonTarget | null>(null);
  const [aimbotEnabled, setAimbotEnabled] = useState(false);
  const [aimbotRadius, setAimbotRadius] = useState(100);
  const trailLength = 8;

  useEffect(() => {
    const handleAimbotToggle = (event: CustomEvent) => {
      setAimbotEnabled(event.detail.enabled);
      setAimbotRadius(event.detail.radius);
    };

    window.addEventListener('toggleAimbot' as any, handleAimbotToggle);
    return () => window.removeEventListener('toggleAimbot' as any, handleAimbotToggle);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let lastUpdate = Date.now();
    const updateInterval = 16;
    let animationFrameId: number;
    let currentPosition = { x: mousePosition.x, y: mousePosition.y };

    const findClosestButton = (mouseX: number, mouseY: number) => {
      const buttons = document.querySelectorAll('button, a, [role="button"]');
      let closest: ButtonTarget | null = null;
      let minDistance = Infinity;

      buttons.forEach((button) => {
        const element = button as HTMLElement;
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
        );

        if (distance <= aimbotRadius && distance < minDistance) {
          minDistance = distance;
          closest = {
            element,
            rect,
            center: { x: centerX, y: centerY }
          };
        }
      });

      return closest;
    };

    const updateMousePosition = (ev: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdate < updateInterval) return;
      lastUpdate = now;

      const target = ev.target as HTMLElement;
      setIsHovering(
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') !== null || 
        target.closest('a') !== null ||
        target.closest('[role="button"]') !== null
      );

      let newPosition = { 
        x: ev.clientX, 
        y: ev.clientY, 
        timestamp: now
      };

      if (aimbotEnabled) {
        const target = findClosestButton(ev.clientX, ev.clientY);
        setAimbotTarget(target);

        if (target) {
          // Улучшенная логика плавного наведения
          const dx = target.center.x - currentPosition.x;
          const dy = target.center.y - currentPosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 1) { // Уменьшен порог для более точного наведения
            const speed = Math.min(0.2, distance / 100); // Адаптивная скорость
            currentPosition.x += dx * speed;
            currentPosition.y += dy * speed;
            newPosition.x = currentPosition.x;
            newPosition.y = currentPosition.y;
          } else {
            currentPosition.x = target.center.x;
            currentPosition.y = target.center.y;
            newPosition.x = target.center.x;
            newPosition.y = target.center.y;
          }
        } else {
          currentPosition.x = ev.clientX;
          currentPosition.y = ev.clientY;
        }
      } else {
        currentPosition.x = ev.clientX;
        currentPosition.y = ev.clientY;
        setAimbotTarget(null);
      }
      
      setMousePosition(newPosition);
      setIsMoving(true);
      setTrail(prev => [newPosition, ...prev.slice(0, trailLength - 1)]);
      
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsMoving(false), 100);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clearTimeout(timeout);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [aimbotEnabled, aimbotRadius]);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[100] mix-blend-difference"
        animate={{
          scale: isClicking ? 0.8 : isMoving ? 0.6 : isHovering ? 1.5 : 1,
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 30,
          mass: 0.5
        }}
      >
        <div className="w-4 h-4 bg-white rounded-full" />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[100]"
        animate={{
          scale: isClicking ? 0.9 : isMoving ? 1.2 : isHovering ? 1.8 : 1,
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 30,
          mass: 0.5
        }}
      >
        <div className={`w-10 h-10 border-2 rounded-full transition-all duration-200 ${
          isHovering 
            ? 'border-purple-400 opacity-70' 
            : isClicking 
              ? 'border-pink-500 opacity-80' 
              : 'border-purple-500 opacity-50'
        }`} />
      </motion.div>

      {/* Trail effect */}
      {trail.map((position, index) => {
        const size = Math.max(2, 10 - index * 1);
        const opacity = Math.max(0.05, 0.3 - (index * 0.05));
        
        return (
          <motion.div
            key={position.timestamp}
            className="fixed pointer-events-none z-[99]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: isMoving ? opacity : 0 
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              left: position.x - (size / 2),
              top: position.y - (size / 2),
              width: size,
              height: size,
              borderRadius: '50%',
              background: `linear-gradient(135deg, #a855f7 ${index * 10}%, #ec4899)`,
              filter: `blur(${index * 0.4}px)`,
            }}
          />
        );
      })}

      {/* Aimbot radius indicator */}
      {aimbotEnabled && (
        <motion.div
          className="fixed pointer-events-none z-[98] border-2 border-purple-500/20 rounded-full"
          style={{
            width: aimbotRadius * 2,
            height: aimbotRadius * 2,
            left: mousePosition.x - aimbotRadius,
            top: mousePosition.y - aimbotRadius,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          exit={{ scale: 0, opacity: 0 }}
        />
      )}

      {/* Target highlight */}
      {aimbotTarget && (
        <motion.div
          className="fixed pointer-events-none z-[97] border-2 border-purple-500/50 rounded-lg"
          style={{
            width: aimbotTarget.rect.width + 8,
            height: aimbotTarget.rect.height + 8,
            left: aimbotTarget.rect.left - 4,
            top: aimbotTarget.rect.top - 4,
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        />
      )}
    </>
  );
}