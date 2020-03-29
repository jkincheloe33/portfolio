import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import {
  getColumnSpanSize,
  H1,
  setColumnSpanSize,
  theme
} from '../../../global';
import { Container } from '../../blocks';
import { Image, ImageType } from '../../elements';

const { easing } = theme;

const loadIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(${setColumnSpanSize(2)});
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Content = styled.div`
  left: ${setColumnSpanSize(2)};
  max-width: ${getColumnSpanSize(6)}px;
  position: absolute;
  top: 140px;
  width: 100%;
  z-index: 1;

  h1 {
    transition: all 1000ms ${easing.easeIn};
  }
`;

// prettier-ignore
const ImageWrapper = styled.div`
  animation: ${loadIn} 2s ${easing.easeIn};
  max-width: ${setColumnSpanSize(9)};
  transition: all 1000ms ${easing.easeIn};
`;

const Wrapper = styled(Container)`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 45px;
  padding-top: 40px;
  position: relative;
`;

const Hero = ({ image, setRefs, title }) => (
  <Wrapper>
    <Content>
      <H1>{title}</H1>
    </Content>
    <ImageWrapper>
      <Image {...image} />
    </ImageWrapper>
  </Wrapper>
);

Hero.propTypes = {
  image: PropTypes.shape(ImageType).isRequired,
  setRefs: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default Hero;
