export interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export interface Line {
  start: Point;
  end: Point;
  alpha: number;
}

export const initializePoints = (
  width: number, 
  height: number, 
  numPoints: number, 
  pointSpeed: number
): Point[] => {
  const points: Point[] = [];
  
  for (let i = 0; i < numPoints; i++) {
    points.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * pointSpeed,
      vy: (Math.random() - 0.5) * pointSpeed,
      size: Math.random() * 2 + 2
    });
  }

  return points;
};

export const updatePoints = (
  points: Point[], 
  width: number, 
  height: number,
  mousePos: { x: number; y: number } | null
): void => {
  points.forEach(point => {
    if (mousePos) {
      const dx = mousePos.x - point.x;
      const dy = mousePos.y - point.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 200) {
        const force = (200 - distance) / 200;
        point.vx -= (dx / distance) * force * 0.5;
        point.vy -= (dy / distance) * force * 0.5;
      }
    }

    point.x += point.vx;
    point.y += point.vy;

    point.vx += (Math.random() - 0.5) * 0.1;
    point.vy += (Math.random() - 0.5) * 0.1;

    const maxSpeed = 2;
    const speed = Math.sqrt(point.vx * point.vx + point.vy * point.vy);
    if (speed > maxSpeed) {
      point.vx = (point.vx / speed) * maxSpeed;
      point.vy = (point.vy / speed) * maxSpeed;
    }

    if (point.x < 0 || point.x > width) {
      point.vx *= -0.8;
      point.x = point.x < 0 ? 0 : width;
    }
    if (point.y < 0 || point.y > height) {
      point.vy *= -0.8;
      point.y = point.y < 0 ? 0 : height;
    }
  });
};

export const createLines = (
  points: Point[], 
  connectionDistance: number
): Line[] => {
  const lines: Line[] = [];

  points.forEach((point, i) => {
    points.slice(i + 1).forEach(otherPoint => {
      const dx = otherPoint.x - point.x;
      const dy = otherPoint.y - point.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < connectionDistance) {
        lines.push({
          start: point,
          end: otherPoint,
          alpha: Math.pow(1 - (distance / connectionDistance), 2)
        });
      }
    });
  });

  return lines;
};

export const drawNetwork = (
  ctx: CanvasRenderingContext2D,
  points: Point[],
  lines: Line[],
  mousePos: { x: number; y: number } | null
): void => {
  // Draw lines with glow effect
  ctx.shadowBlur = 5;
  ctx.shadowColor = 'rgba(249, 115, 22, 0.5)'; // orange-500

  lines.forEach(line => {
    const gradient = ctx.createLinearGradient(
      line.start.x, line.start.y,
      line.end.x, line.end.y
    );
    gradient.addColorStop(0, `rgba(249, 115, 22, ${line.alpha * 0.5})`); // orange-500
    gradient.addColorStop(1, `rgba(251, 146, 60, ${line.alpha * 0.5})`); // orange-400

    ctx.beginPath();
    ctx.moveTo(line.start.x, line.start.y);
    ctx.lineTo(line.end.x, line.end.y);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  ctx.shadowBlur = 0;

  // Draw points with pulse effect
  const time = Date.now() / 1000;
  points.forEach(point => {
    const pulse = 1 + Math.sin(time * 2 + point.x + point.y) * 0.2;
    const size = point.size * pulse;

    // Point glow
    ctx.beginPath();
    ctx.arc(point.x, point.y, size * 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(249, 115, 22, 0.1)'; // orange-500
    ctx.fill();

    // Point core
    ctx.beginPath();
    ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(249, 115, 22, 0.8)'; // orange-500
    ctx.fill();
  });

  // Draw mouse interaction area
  if (mousePos) {
    ctx.beginPath();
    ctx.arc(mousePos.x, mousePos.y, 100, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(249, 115, 22, 0.2)'; // orange-500
    ctx.lineWidth = 1;
    ctx.stroke();
  }
};