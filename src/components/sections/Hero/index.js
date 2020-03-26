import React, { Suspense } from 'react';
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

const Hero = () => (
  <Wrapper>
    <Canvas camera={{ position: [0, 0, 20] }}>
      <ambientLight intensity={0.1} />
      <Suspense fallback={null}>
        <Model position={[0, -10, 0]} />
      </Suspense>
    </Canvas>
  </Wrapper>
);

export default Hero;
