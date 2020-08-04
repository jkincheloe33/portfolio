import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { Canvas as CanvasBase } from 'react-three-fiber';
import styled from 'styled-components';
import { Container } from '../../blocks';
import { Controls, Model } from './Model';
import Slide, { SlideType } from './Slide';

// const Video = styled.video`
//   display: none;
// `;

const Canvas = styled(CanvasBase)`
  min-height: 500px;
  height: 100%;
  width: 100%;
`;

const Scene = styled.div`
  cursor: pointer;
  flex: 0 0 40%;
  max-width: 40%;
  min-height: 500px;
`;

const Wrapper = styled(Container)`
  align-items: center;
  display: flex;
`;

function CaseStudies({ images, slides }) {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handleActive = useCallback(
    index => {
      if (active === index) return;
      setAnimating(true);
      setTimeout(() => {
        setActive(index);
        setAnimating(false);
      }, 1000);
    },
    [active]
  );

  return (
    <Wrapper>
      <Scene>
        <Canvas id="cubeCanvas">
          <ambientLight />
          <Controls animating={animating} />
          <Model
            animating={animating}
            images={images}
            handleActive={handleActive}
          />
        </Canvas>
      </Scene>
      <Slide {...slides[active]} animating={animating} />
      {/* <Video crossOrigin="anonymous" id="video" loop playsinline>
        <source src="./img/creeps.mp4" type="video/mp4" />
      </Video> */}
    </Wrapper>
  );
}

CaseStudies.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  slides: PropTypes.arrayOf(PropTypes.shape(SlideType)).isRequired
};

export default CaseStudies;
