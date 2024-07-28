import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import './custom-p5.d.ts';

const P5Wrapper: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: p5) => {
      let capture: p5.Element;

      p.setup = () => {
        p.describe('Video capture from the device webcam.');
        p.createCanvas(720, 400);
        capture = p.createCapture(p.VIDEO);
        capture.size(360, 200);
        capture.hide();
      };

      p.draw = () => {
        p.background(51);
        p.image(capture, 0, 0, 360, 400);
        p.filter(p.INVERT);
      };
    };

    if (sketchRef.current) {
      const myP5 = new p5(sketch, sketchRef.current);

      return () => {
        myP5.remove();
      };
    }
  }, []);

  return <div ref={sketchRef}></div>;
};

export default P5Wrapper;
