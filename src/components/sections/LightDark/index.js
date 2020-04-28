import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../../global';

const { color, easing } = theme;

const Wrapper = styled.div`
  background-color: ${p => (p.lightMode ? color.black : color.yellow)};
  border-radius: 30px;
  bottom: 40px;
  height: 30px;
  position: fixed;
  right: 40px;
  transition: background-color 1000ms ${easing.easeIn};
  width: 60px;
  z-index: 10;
`;

const LightDark = ({ lightMode, setLightMode }) => (
  <Wrapper lightMode={lightMode} onClick={setLightMode}>
    <h1>Base</h1>
  </Wrapper>
);

LightDark.propTypes = {
  lightMode: PropTypes.bool,
  setLightMode: PropTypes.func
};

export default LightDark;
