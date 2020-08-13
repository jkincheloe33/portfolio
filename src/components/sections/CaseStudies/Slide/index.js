import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import styled from 'styled-components';
import {
  H2,
  LightModeContext,
  media,
  P,
  shadeOf,
  theme
} from '../../../../global';

const { color } = theme;
const EASE = 'cubic-bezier(.85,.02,.09,.99)';
const TIMING = 400;

// prettier-ignore
const Copy = styled(P)`
  font-weight: bold;
  line-height: 25px;
  overflow: hidden;

  ${p => p.lightMode && `
    color: ${color.black};
  `}

  a {
    color: ${color.yellow};
    display: inline-block;
    font-style: italic;
    margin-top: 5px;
    position: relative;
    text-decoration: none;

    &::before {
      background-color: ${shadeOf(color.white, 0.8)};
      bottom: 5px;
      content: '';
      height: 6px;
      left: 0;
      position: absolute;
      transform: translateX(-101%);
      transition: transform 500ms ${EASE};
      width: 100%;
    }

    &:hover {
      &::before {
        transform: translateX(0);
      }
    }
  }
`;

const Title = styled(H2)`
  color: ${color.white};
  font-size: 100px;
  line-height: 100px;
  margin-bottom: 15px;
  overflow: hidden;
  position: relative;
  text-transform: lowercase;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: ${color.yellow};

  ${media.down.sm`
    font-size: 64px;
    line-height: 64px;
  `}
`;

const Wrapper = styled.div`
  flex: 0 0 60%;
  margin: 0 auto;
  max-width: 850px;
  position: relative;
  z-index: 1;

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
  const { lightMode } = useContext(LightModeContext);

  return (
    <Wrapper animating={animating}>
      <Title>
        <span>{title}</span>
      </Title>
      <Copy lightMode={lightMode}>
        <span dangerouslySetInnerHTML={{ __html: copy }} />
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
