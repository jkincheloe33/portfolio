import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image, ImageType } from '../../../../components';
import {
  media,
  P,
  parseContent,
  setColumnSpanSize,
  theme
} from '../../../../global';
import Wave from './Wave';

const { color } = theme;

const Copy = styled(P)`
  margin-left: 30px;
  max-width: ${setColumnSpanSize(6)};
  padding-top: 20px;
  position: relative;

  &::before {
    background-color: ${color.white};
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  span {
    font-style: italic;
  }

  ${media.down.md`
    margin: 40px 0 0;
    max-width: none;
  `}
`;

const ImageWrapper = styled.div`
  height: ${p => (p.isIOSMobile ? 'auto' : '22vw')};
  max-width: ${setColumnSpanSize(5)};
  opacity: 0.95;
  position: relative;
  width: 100%;

  ${media.down.md`
    height: 60vw;
    max-width: none;
  `}
`;

const Wrapper = styled.div`
  margin-top: 200px;
  padding-bottom: 200px;

  ${media.up.md`
    align-items: flex-end;
    display: flex;
  `}
`;

const Details = ({ copy, image, isIOSMobile, setRefs, uniforms }) => (
  <Wrapper>
    <ImageWrapper isIOSMobile={isIOSMobile}>
      {isIOSMobile ? (
        <Image {...image} />
      ) : (
        <Canvas camera={{ position: [0, 0, 4] }}>
          <Suspense fallback={null}>
            <Wave uniforms={uniforms} url={image.src} />
          </Suspense>
        </Canvas>
      )}
    </ImageWrapper>
    <Copy dangerouslySetInnerHTML={parseContent(copy)} />
  </Wrapper>
);

export const DetailsType = {
  copy: PropTypes.string,
  image: PropTypes.shape(ImageType).isRequired
};

Details.propTypes = {
  ...DetailsType,
  isIOSMobile: PropTypes.bool,
  setRefs: PropTypes.func,
  uniforms: PropTypes.object
};

export default Details;
