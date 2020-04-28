import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media, theme } from '../../../global';

const { color, easing } = theme;

// prettier-ignore
const Icons = styled.div`
  height: 100%;
  position: relative;
  width: 100%;

  &::before {
    background: url('./img/moon.png') ${color.yellow};
    background-size: cover;
    border-radius: 50%;
    box-shadow: 0 0 10px ${p => p.lightMode ? color.black : color.white};
    content: '';
    height: 40px;
    left: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: all 500ms ${easing.easeIn};
    width: 40px;
  }

  ${p => p.lightMode && `
    &::before {
      transform: translate(100%, -50%);
    }
  `}

  ${media.down.sm`
    &::before {
      height: 25px;
      width: 25px;
    }
  `}
`;

const Wrapper = styled.div`
  background-color: ${p => (p.lightMode ? color.black : color.yellow)};
  border-radius: 30px;
  bottom: 40px;
  cursor: pointer;
  height: 30px;
  position: fixed;
  right: 40px;
  transition: background-color 1000ms ${easing.easeIn};
  width: 70px;
  z-index: 10;

  ${media.down.sm`
    bottom: 20px;
    height: 20px;
    right: 20px;
    width: 50px;
  `}
`;

const LightDark = ({ lightMode, setLightMode }) => (
  <Wrapper lightMode={lightMode} onClick={setLightMode}>
    <Icons lightMode={lightMode} />
  </Wrapper>
);

LightDark.propTypes = {
  lightMode: PropTypes.bool,
  setLightMode: PropTypes.func
};

export default LightDark;
