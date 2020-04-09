import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { H1, media, theme, getColumnSpanSize } from '../../../../global';

const { color, easing } = theme;

const delay = 200;

const flash = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.25; }
  100% { opacity: 1; }
`;

// prettier-ignore
const Title = styled(H1)`
  align-items: center;
  color: white;
  display: flex;
  line-height: 72px;
  overflow: hidden;
  white-space: nowrap;

  span {
    color: ${color.white};
    overflow: hidden;
    opacity: 0;
    position: relative;
    transform: rotateZ(5deg) translateY(165%);
    transition: all 2500ms ${easing.easeIn};

    &::before,
    &::after {
      background-color: ${color.yellow};
      content: '';
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      transform: ${p =>
        p.objectLoaded ? 'translateX(101%)' : 'translateX(-101%)'};
      transition: transform 1500ms cubic-bezier(0.95, 0.02, 0.52, 0.82);
      width: 100%;
    }

    &::after {
      background-color: ${color.black};
      transform: ${p =>
        p.objectLoaded ? 'translateX(1%)' : 'translateX(-201%)'};
    }
  }

  &:nth-of-type(2) span {
    transition-delay: ${delay}ms;

    &::before,
    &::after {
      transition-delay: ${delay * 2}ms;
    }
  }

  &:nth-of-type(3) span {
    animation: ${flash} 2000ms linear infinite;
    animation-delay: 2500ms;
    transition-delay: ${delay * 2}ms;

    &::before,
    &::after {
      transition-delay: ${delay * 3}ms;
    }
  }

  ${p =>
    p.loaded &&
    `
    span {
      opacity: 1;
      transform: rotateZ(0) translateY(0);
    }
  `}

  ${p =>
    p.objectLoaded &&
    `
    span {
      animation-play-state: paused;
    }
  `}

  ${media.down.lg`
    margin: 10px auto;
    max-width: ${getColumnSpanSize(5)}px;
    width: 100%;
  `}

  ${media.up.lg`
    flex: 0 0 33%;
    font-size: 200px;
    line-height: 225px;
  `}
`;

const Wrapper = styled.div`
  background-color: ${color.black};
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 0;
  opacity: ${p => (p.animating ? 1 : 0)};
  padding-left: 20px;
  pointer-events: ${p => (p.animating ? 'auto' : 'none')};
  position: absolute;
  top: 0;
  transition: opacity 2000ms ease;
  transition-delay: 2500ms;
  width: 100%;
  z-index: 4;

  ${media.down.lg`
    justify-content: center;
  `}
`;

const Loading = ({ animating, objectLoaded }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Wrapper animating={animating}>
      <Title loaded={loaded} objectLoaded={objectLoaded}>
        <span>Welcome.</span>
      </Title>
      <Title loaded={loaded} objectLoaded={objectLoaded}>
        <span>Page</span>
      </Title>
      <Title loaded={loaded} objectLoaded={objectLoaded}>
        <span>Loading...</span>
      </Title>
    </Wrapper>
  );
};

Loading.propTypes = {
  animating: PropTypes.bool.isRequired,
  objectLoaded: PropTypes.bool.isRequired
};

export default Loading;
