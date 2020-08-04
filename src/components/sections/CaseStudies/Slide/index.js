import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { H2, theme } from '../../../../global';

const { color } = theme;

const Title = styled(H2)`
  color: ${color.white};
  font-style: italic;
  line-height: 60px;
  position: relative;
  text-transform: lowercase;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: ${color.yellow};
`;

const Wrapper = styled.div`
  flex: 0 0 60%;

  h1 {
    color: white;
    font-size: 90px;
  }
`;

function Slide({ title }) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <h1>This</h1>
      <h1>is a</h1>
      <h1>Test</h1>
    </Wrapper>
  );
}

Slide.propTypes = {
  title: PropTypes.string
};

export default Slide;
