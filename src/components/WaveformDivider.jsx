import React, { useMemo } from 'react';

const WaveformDivider = ({ type = 'sine', color = 'var(--accent-main)', height = 48 }) => {
  const pathData = useMemo(() => {
    const width = 1200;
    const segments = 200;
    const loopWidth = width; // Width of one seamless loop

    // Generate one cycle of points
    const generateCycle = () => {
      const points = [];
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * width;
        let y = 0;
        const t = (i / segments) * Math.PI * 8; // 4 cycles per width

        switch (type) {
          case 'sine':
            y = Math.sin(t);
            break;
          case 'square':
            y = Math.sign(Math.sin(t));
            break;
          case 'clip':
            y = Math.sin(t);
            if (y > 0.5) y = 0.5;
            if (y < -0.5) y = -0.5;
            y = y * 1.5;
            break;
          case 'noise':
            // For noise to loop, we can mix some sine waves or use a seeded random,
            // but for simple visuals, let's just use a sum of sines to look random but be periodic.
            y = (Math.sin(t * 1.5) + Math.sin(t * 3.7 + 1) + Math.sin(t * 9.2 + 2)) * 0.2;
            break;
          default:
            y = 0;
        }
        const mappedY = (y * -14) + 24;
        points.push({ x, y: mappedY });
      }
      return points;
    };

    const cyclePoints = generateCycle();

    // Create double path for loop: [original] + [original shifted by width]
    // We construct the SVG path string manually
    let path = `M${cyclePoints[0].x},${cyclePoints[0].y}`;

    // First loop
    cyclePoints.forEach(p => path += ` L${p.x},${p.y}`);

    // Second loop (seamlessly attached)
    cyclePoints.forEach((p, i) => {
      if (i > 0) { // skip first point to avoid duplicate move behavior if connecting
        path += ` L${p.x + width},${p.y}`;
      }
    });

    return path;

  }, [type]);

  return (
    <div className="waveform-container" style={{ width: '100%', overflow: 'hidden', height: `${height}px`, opacity: 0.8 }}>
      <svg
        width="100%"
        height="100%"
        // ViewBox is now essentially seeing a window. Since we animate the path, we keep viewBox standard
        // But to make sure SVG scales correctly with the path being 2x, we don't change viewBox, 
        // we just rely on the path being drawn outside and animated into view?
        // Actually, easiest is: viewBox 0 0 1200 48. The path extends to 2400.
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
        style={{ display: 'block' }}
      >
        <path
          className="animate-flow"
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

export default WaveformDivider;
