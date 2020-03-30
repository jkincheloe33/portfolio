import React, { Suspense, useCallback, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Canvas } from 'react-three-fiber';
import { H1, shadeOf, theme } from '../../../global';
import Model from './Model';

const { color, easing } = theme;

const slideIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// prettier-ignore
const Spinner = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;

  &::before {
    animation: ${spin} 1s infinite;
    border-top: 3px solid ${shadeOf(color.white, 0.8)};
    border-radius: 50%;
    content: '';
    height: 150px;
    width: 150px;

    ${p => p.loaded && `
      animation-play-state: paused;
      transform: scale(0);
      transition: transform 300ms ${easing.easeIn};
    `}
  }
`;

const SpinnerWrapper = styled.div`
  background-color: ${color.black};
  height: 100%;
  left: 0;
  opacity: ${p => (p.loaded ? 0 : 1)};
  pointer-events: ${p => (p.loaded ? 'none' : 'auto')};
  position: absolute;
  top: 0%;
  transition: opacity 1000ms ${easing.easeIn};
  width: 100%;
  z-index: 3;
`;

const Title = styled(H1)`
  animation: ${slideIn} 3000ms 1 forwards;
  animation-delay: 4s;
  color: ${shadeOf(color.white, 0.6)};
  left: 0;
  letter-spacing: 2vw;
  opacity: 0;
  position: absolute;
  text-align: center;
  text-transform: lowercase;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
`;

const Wrapper = styled.div`
  min-height: 100vh;
  margin-bottom: 200px;
  position: relative;
  width: 100%;

  &::after {
    background: linear-gradient(transparent, black);
    bottom: 0;
    content: '';
    height: 200px;
    left: 0;
    position: absolute;
    right: 0;
  }
`;

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const mouse = useRef([0, 0]);
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  );

  return (
    <Wrapper>
      <SpinnerWrapper loaded={loaded}>
        <Spinner />
      </SpinnerWrapper>
      <Title>Josh Kincheloe</Title>
      <Canvas camera={{ position: [0, 0, 100] }} onMouseMove={onMouseMove}>
        <ambientLight intensity={0.1} />
        <Suspense fallback={null}>
          <Model
            mouse={mouse}
            position={[0, -7, 0]}
            rotation={[0.5, -3, 0]}
            setLoaded={setLoaded}
          />
        </Suspense>
      </Canvas>
    </Wrapper>
  );
};

export default Hero;
