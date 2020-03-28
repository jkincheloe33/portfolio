import React, { Suspense, useCallback, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Canvas } from 'react-three-fiber';
import { H1, theme } from '../../../global';
import Model from './Model';

const { color } = theme;

const slideIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const Title = styled(H1)`
  animation: ${slideIn} 2000ms 1 forwards;
  animation-delay: 4s;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 900;
  letter-spacing: 2vw;
  opacity: 0;
  position: relative;
  text-transform: lowercase;
  width: 100%;
  z-index: 1;
`;

const TitleWrapper = styled.div`
  left: 0;
  position: absolute;
  overflow: hidden;
  right: 0;
  top: 50%;
  text-align: center;
  transform: translateY(-50%);
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
      <TitleWrapper>
        <Title>Josh Kincheloe</Title>
      </TitleWrapper>
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
