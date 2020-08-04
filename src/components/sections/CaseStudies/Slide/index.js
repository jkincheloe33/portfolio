import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { H2, P, theme } from '../../../../global';

const { color } = theme;
const EASE = 'cubic-bezier(.85,.02,.09,.99)';
const TIMING = 400;

const Copy = styled(P)`
  line-height: 25px;
  overflow: hidden;
`;

const Title = styled(H2)`
  color: ${color.white};
  line-height: 60px;
  overflow: hidden;
  position: relative;
  text-transform: lowercase;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: ${color.yellow};
`;

const Wrapper = styled.div`
  flex: 0 0 60%;

  span {
    display: block;
    transform: ${p => (p.animating ? 'translateY(100%)' : 'translateY(0)')};
    transition: transform ${TIMING}ms ${EASE};
    transform-origin: top left;
  }

  ${Title} span {
    transition-delay: ${p => (p.animating ? '100ms' : '0')};
  }

  ${Copy} span {
    transition-delay: ${p => (p.animating ? '0' : '100ms')};
  }
`;

function Slide({ animating, copy, title }) {
  return (
    <Wrapper animating={animating}>
      <Title animating={animating}>
        <span>{title}</span>
      </Title>
      <Copy animating={animating}>
        <span>{copy}</span>
      </Copy>
    </Wrapper>
  );
}

export const SlideType = {
  copy: PropTypes.string,
  title: PropTypes.string
};

Slide.propTypes = {
  ...SlideType,
  animating: PropTypes.bool
};

export default Slide;
