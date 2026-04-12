import { useEffect, useRef } from "react";

export default function NoiseBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width, height;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const noise = () => {
      const imageData = ctx.createImageData(width, height);
      const buffer = new Uint32Array(imageData.data.buffer);

      for (let i = 0; i < buffer.length; i++) {
        const shade = Math.random() * 255;
        buffer[i] =
          (255 << 24) | // alpha
          (shade << 16) |
          (shade << 8) |
          shade;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const render = () => {
      // 1. base noise
      noise();

      // 2. ADD distortion layer (👉 YOUR CODE HERE)
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = `rgba(200,255,0,0.02)`;

      const t = Date.now() * 0.0005;

      ctx.fillRect(Math.sin(t) * 10, Math.cos(t * 1.2) * 10, width, height);

      // 3. reset alpha (IMPORTANT)
      ctx.globalAlpha = 1;

      // 4. loop
      requestAnimationFrame(render);
    };

    render();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
    />
  );
}
