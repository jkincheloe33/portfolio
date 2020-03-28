import React, { Suspense, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { Canvas } from 'react-three-fiber';
import { H1, theme } from '../../../global';
import Model from './Model';

const { color } = theme;

const Title = styled(H1)`
  color: rgba(255, 255, 255, 0.5);
  font-weight: 900;
  left: 0;
  letter-spacing: 2vw;
  position: absolute;
  top: 50%;
  text-align: center;
  text-transform: lowercase;
  transform: translateY(-50%);
  width: 100%;
  z-index: 1;
`;

const Wrapper = styled.div`
  background-color: ${color.black};
  height: 100vh;
  position: relative;
  width: 100%;
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
      <Title>Josh Kincheloe</Title>
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
