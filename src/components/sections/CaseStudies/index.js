import React from 'react';
import { Canvas } from 'react-three-fiber';
import styled from 'styled-components';
import Model from './Model';

const Wrapper = styled.div``;

function CaseStudies() {
  return (
    <Wrapper>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Model />
      </Canvas>
    </Wrapper>
  );
}

export default CaseStudies;
