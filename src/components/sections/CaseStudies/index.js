import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Canvas } from 'react-three-fiber';
import styled from 'styled-components';
import { Container } from '../../blocks';
import { Controls, Model } from './Model';
import Slide from './Slide';

// const Video = styled.video`
//   display: none;
// `;

const Scene = styled.div`
  flex: 0 0 40%;

  canvas {
    height: 100%;
    width: 100%;
  }
`;

const Wrapper = styled(Container)`
  align-items: stretch;
  display: flex;
`;

function CaseStudies({ images }) {
  const [active, setActive] = useState(0);

  function handleActive(index) {
    setActive(index);
  }

  return (
    <Wrapper>
      <Scene>
        <Canvas>
          <ambientLight />
          <Controls />
          <Model images={images} handleActive={handleActive} />
        </Canvas>
      </Scene>
      <Slide active={active} />
      {/* <Video crossOrigin="anonymous" id="video" loop playsinline>
        <source src="./img/creeps.mp4" type="video/mp4" />
      </Video> */}
    </Wrapper>
  );
}

CaseStudies.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default CaseStudies;
