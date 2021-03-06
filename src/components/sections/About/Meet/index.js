import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  getColumnSpanSize,
  H2,
  media,
  P,
  parseContent,
  setColumnSpanSize,
  theme
} from '../../../../global';
import { Image, ImageType } from '../../../elements';
import { setPayload } from '../utils';
import Wave from './Wave';

const { color, easing, timing } = theme;

const offset = 20;

const Content = styled.div`
  left: 0;
  max-width: ${getColumnSpanSize(5)}px;
  position: absolute;
  top: 140px;
  transform: translateX(-${offset}%);
  width: 100%;
  z-index: 2;

  @media only screen and (max-width: 1272px) {
    max-width: ${getColumnSpanSize(7)}px;
    opacity: 0;
    transform: translateY(${offset * 2}px);
    transition: all 2000ms ${easing.easeIn};
  }

  ${media.down.md`
    position: relative;
    top: 0;
    transform: translateY(${offset}px);
  `}
`;

const Copy = styled(P)`
  opacity: 0;
  padding-right: 50px;
  transform: translateY(${offset}px);
  transition: opacity 2000ms ${easing.easeIn}, transform 2000ms ${easing.easeIn},
    color ${timing.colorMode} ${easing.easeIn};

  span {
    position: relative;

    &::before {
      background-color: ${color.yellow};
      content: '';
      height: 5px;
      left: 50%;
      opacity: 0.85;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 110%;
    }
  }

  ${media.down.md`
    padding-left: 25px;
    padding-right: 0;
  `}
`;

// prettier-ignore
const ImageWrapper = styled.div`
  height: ${p => p.isIOSMobile ? 'auto' : '40vw'};
  max-width: ${setColumnSpanSize(8)};
  position: relative;
  width: 100%;

  ${media.down.md`
    max-width: none;
    transform: translateY(-10vw);
  `}
`;

const Title = styled(H2)`
  color: ${p => (p.lightMode ? color.black : color.white)};
  display: inline-block;
  font-style: italic;
  line-height: 60px;
  margin-bottom: 45px;
  padding: 0 50px 30px 0;
  position: relative;
  text-transform: lowercase;
  transition: color ${timing.colorMode} ${easing.easeIn};

  &::before {
    background-color: ${p => (p.lightMode ? color.black : color.white)};
    bottom: 0;
    content: '';
    height: 2px;
    left: 0;
    position: absolute;
    transition: background-color ${timing.colorMode} ${easing.easeIn};
    width: 100%;
  }

  ${media.down.sm`
    margin-bottom: 40px;
    padding-bottom: 20px;
  `}

  ${media.up.sm`
    font-size: 75px;
  `}
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 80px 0;
  position: relative;
  z-index: 1;

  ${media.down.md`
    display: block;
    padding-top: 40px;
  `}
`;

const meetEnum = {
  COMP_REF: 0,
  CONTENT: 1,
  COPY: 2,
  IMAGE: 3
};

export const meetHandler = (meetRefs, desktop) => {
  const compRef = meetRefs[meetEnum.COMP_REF].ref.current;
  const contentRef = meetRefs[meetEnum.CONTENT].ref.current;
  const copyRef = meetRefs[meetEnum.COPY].ref.current;
  const width = window.innerWidth;

  const height = compRef.getBoundingClientRect().height;
  const scroll = compRef.getBoundingClientRect().top;

  if (scroll > 0) {
    if (width > 1272 && scroll < height) {
      const percentage = ((height - scroll) / (height * 3)) * 100;
      // content container scroll animation
      contentRef.style.transform = `translateX(${-offset + percentage}%)`;

      // paragraph text animation
      if (scroll < height / 2) {
        copyRef.style.cssText += `opacity: 1; transform: translateY(0);`;
      } else {
        copyRef.style.cssText += `opacity: 0; transform: translateY(${offset}%);`;
      }
    } else if (width < 768) {
      const mobileHeight = height - 100;

      // content container scroll animation
      if (scroll < mobileHeight) {
        contentRef.style.cssText += `opacity: 1; transform: translateY(0);`;
      } else if (scroll > mobileHeight) {
        contentRef.style.cssText += `opacity: 0; transform: translateY(${offset}%);`;
      }

      // paragraph text animation
      if (scroll < mobileHeight / 1.15) {
        copyRef.style.cssText += `opacity: 1; transform: translateY(0);`;
      } else {
        copyRef.style.cssText += `opacity: 0; transform: translateY(${offset}%);`;
      }
    } else {
      const mobileHeight = height + 75;

      // content container scroll animation
      if (scroll < mobileHeight) {
        contentRef.style.cssText += `opacity: 1; transform: translateY(0);`;
      } else if (scroll > mobileHeight) {
        contentRef.style.cssText += `opacity: 0; transform: translateY(${
          offset * 2
        }%);`;
      }

      // paragraph text animation
      if (scroll < mobileHeight / 2) {
        copyRef.style.cssText += `opacity: 1; transform: translateY(0);`;
      } else {
        copyRef.style.cssText += `opacity: 0; transform: translateY(${offset}%);`;
      }
    }
  }
};

const Meet = ({
  copy,
  image,
  isIOSMobile,
  lightMode,
  setRefs,
  title,
  uniforms
}) => {
  const refs = [
    {
      comp: 'Meet',
      ref: useRef(null)
    },
    {
      comp: 'Meet',
      ref: useRef(null)
    },
    {
      comp: 'Meet',
      ref: useRef(null)
    },
    {
      comp: 'Meet',
      ref: useRef(null)
    }
  ];

  useEffect(() => {
    setPayload(refs, setRefs);
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper ref={refs[0].ref}>
      <Content ref={refs[1].ref}>
        <Title lightMode={lightMode}>{title}</Title>
        <Copy
          dangerouslySetInnerHTML={parseContent(copy)}
          lightMode={lightMode}
          ref={refs[2].ref}
        />
      </Content>
      <ImageWrapper isIOSMobile={isIOSMobile} ref={refs[3].ref}>
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
    </Wrapper>
  );
};

export const MeetType = {
  copy: PropTypes.string.isRequired,
  image: PropTypes.shape(ImageType).isRequired,
  title: PropTypes.string.isRequired
};

Meet.propTypes = {
  ...MeetType,
  isIOSMobile: PropTypes.bool,
  lightMode: PropTypes.bool,
  setRefs: PropTypes.func.isRequired,
  uniforms: PropTypes.object
};

export default Meet;
