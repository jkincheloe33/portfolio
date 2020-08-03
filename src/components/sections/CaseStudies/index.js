import PropTypes from 'prop-types';
import React from 'react';
import { Canvas } from 'react-three-fiber';
import styled from 'styled-components';
import { Controls, Model } from './Model';

const Wrapper = styled.div``;

function CaseStudies({ images }) {
  return (
    <Wrapper>
      <Canvas>
        <ambientLight />
        <Controls />
        <Model images={images} />
      </Canvas>
    </Wrapper>
  );
}

CaseStudies.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default CaseStudies;
