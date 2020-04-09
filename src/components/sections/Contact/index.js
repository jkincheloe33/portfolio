import React, { Suspense, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { Canvas as CanvasBase } from 'react-three-fiber';
import { theme } from '../../../global';
import Model from './Model';

const { color } = theme;

const Canvas = styled(CanvasBase)`
  min-height: 100vh;
`;

const Wrapper = styled.div`
  min-height: 100vh;
  position: relative;
  width: 100%;

  &::before,
  &::after {
    background: linear-gradient(${color.black}, transparent);
    content: '';
    height: 150px;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }

  &::after {
    background-image: linear-gradient(transparent, ${color.black});
    bottom: 0;
    top: auto;
  }
`;

const Contact = () => {
  const mouse = useRef([0, 0]);
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  );

  return (
    <Wrapper>
      <Canvas camera={{ position: [0, 0, 0] }} onMouseMove={onMouseMove}>
        <Suspense fallback={null}>
          <Model mouse={mouse} position={[0, -2, 0]} rotation={[0, -0.6, 0]} />
        </Suspense>
      </Canvas>
    </Wrapper>
  );
};

export default Contact;
