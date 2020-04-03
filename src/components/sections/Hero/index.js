import React, { Suspense, useCallback, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Canvas as CanvasBase } from 'react-three-fiber';
import { H1, shadeOf, theme } from '../../../global';
import Model from './Model';

const { color } = theme;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const Canvas = styled(CanvasBase)`
  min-height: 100vh;
`;

// prettier-ignore
const Progress = styled.div`
  border: 2px solid ${color.white};
  height: 20px;
  overflow: hidden;
  position: relative;
  width: 50%;

  ${p => p.loaded && `
    display: none;
  `}
`;

const ProgressBar = styled.div`
  background-color: ${color.white};
  height: 100%;
  position: absolute;
  right: 100%;
  top: 0;
  transform: translateX(-100%);
  transition: transform 3500ms ease;
  width: 100%;
`;

const SpinnerWrapper = styled.div`
  align-items: center;
  background-color: ${color.black};
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  opacity: ${p => (p.loaded ? 0 : 1)};
  pointer-events: ${p => (p.loaded ? 'none' : 'auto')};
  position: absolute;
  top: 0%;
  transition: opacity 4000ms ease;
  width: 100%;
  z-index: 3;
`;

// prettier-ignore
const Title = styled(H1)`
  animation: ${fadeIn} 3000ms 1 forwards;
  animation-delay: 4s;
  animation-play-state: paused;
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

  ${p => p.loaded && `
    animation-play-state: running;
  `}
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
  const progressRef = useRef(null);
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  );

  return (
    <Wrapper>
      <SpinnerWrapper loaded={loaded}>
        <Progress loaded={loaded}>
          <ProgressBar ref={progressRef} />
        </Progress>
      </SpinnerWrapper>
      <Title loaded={loaded}>Josh Kincheloe</Title>
      {/* <Canvas camera={{ position: [0, 0, 100] }} onMouseMove={onMouseMove}>
        <ambientLight intensity={0.1} />
        <Suspense fallback={null}>
          <Model
            loaded={loaded}
            mouse={mouse}
            position={[0, -7, 0]}
            progressRef={progressRef}
            rotation={[0.5, -3, 0]}
            setLoaded={setLoaded}
          />
        </Suspense>
      </Canvas> */}
    </Wrapper>
  );
};

export default Hero;
