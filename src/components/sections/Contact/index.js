import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Canvas } from 'react-three-fiber';
import Model from './Model';

const Wrapper = styled.div`
  min-height: 50vh;
  width: 100%;
`;

const Contact = () => (
  <Wrapper>
    <Canvas
      camera={{ position: [0, 0, 100] }}
      // onMouseMove={onMouseMove}
    >
      <ambientLight intensity={0.1} />
      <Suspense fallback={null}>
        <Model
          // mouse={mouse}
          position={[0, -7, 0]}
          rotation={[0.5, -3, 0]}
        />
      </Suspense>
    </Canvas>
  </Wrapper>
);

export default Contact;
