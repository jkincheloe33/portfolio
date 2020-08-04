import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { Canvas as CanvasBase } from 'react-three-fiber';
import styled from 'styled-components';
import { Container } from '../../blocks';
import { Controls, Model } from './Model';
import Slide, { SlideType } from './Slide';

const Canvas = styled(CanvasBase)`
  min-height: 500px;
  height: 100%;
  width: 100%;
`;

const Scene = styled.div`
  cursor: pointer;
  // flex: 0 0 40%;
  margin: -91px auto 0;
  max-width: 730px;
  min-height: 600px;
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
    <Container>
      <Slide {...slides[active]} animating={animating} />
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
    </Container>
  );
}

CaseStudies.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  slides: PropTypes.arrayOf(PropTypes.shape(SlideType)).isRequired
};

export default CaseStudies;
