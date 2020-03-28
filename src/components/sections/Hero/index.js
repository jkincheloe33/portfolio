import React, { Suspense, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { Canvas as CanvasBase } from 'react-three-fiber';
import { theme } from '../../../global';
import Model from './Model';

const { color } = theme;

const Canvas = styled(CanvasBase)`
  canvas {
    height: 100vh;
    width: 100%;
  }
`;

const Wrapper = styled.div`
  background-color: ${color.black};
`;

const Hero = () => {
  const mouse = useRef([0, 0]);
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  );

  return (
    <Wrapper>
      <Canvas camera={{ position: [0, 0, 100] }} onMouseMove={onMouseMove}>
        <ambientLight intensity={0.1} />
        <Suspense fallback={null}>
          <Model mouse={mouse} position={[0, -7, 0]} rotation={[0.5, -3, 0]} />
        </Suspense>
      </Canvas>
    </Wrapper>
  );
};

export default Hero;
