import React, { Suspense, useCallback, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Canvas as CanvasBase } from 'react-three-fiber';
import { H1, shadeOf, theme } from '../../../global';
import Loading from './Loading';
import Model from './Model';

const { color, easing } = theme;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const Canvas = styled(CanvasBase)`
  min-height: 100vh;
  opacity: ${p => (p.animating ? 0 : 1)};
  transition: opacity 2000ms ${easing.easeIn};
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

  ${p => p.objectLoaded && `
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
  const [animating, setAnimating] = useState(true);
  const [objectLoaded, setObjectLoaded] = useState(false);
  const mouse = useRef([0, 0]);
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  );

  return (
    <Wrapper>
      <Loading animating={animating} setAnimating={setAnimating} />
      <Title objectLoaded={objectLoaded}>Josh Kincheloe</Title>
      <Canvas
        animating={animating}
        camera={{ position: [0, 0, 100] }}
        onMouseMove={onMouseMove}
      >
        <ambientLight intensity={0.1} />
        <Suspense fallback={null}>
          <Model
            animating={animating}
            objectLoaded={objectLoaded}
            mouse={mouse}
            position={[0, -7, 0]}
            rotation={[0.5, -3, 0]}
            setObjectLoaded={setObjectLoaded}
          />
        </Suspense>
      </Canvas>
    </Wrapper>
  );
};

export default Hero;
