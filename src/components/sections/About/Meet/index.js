import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  getColumnSpanSize,
  H2,
  P,
  setColumnSpanSize,
  theme
} from '../../../../global';
import { Image, ImageType } from '../../../elements';
import { setPayload } from '../utils';

const { color, easing } = theme;

const offset = 20;

const Content = styled.div`
  left: 0;
  max-width: ${getColumnSpanSize(5)}px;
  position: absolute;
  top: 140px;
  transform: translateX(-${offset}%);
  width: 100%;
  z-index: 1;
`;

const Copy = styled(P)`
  color: ${color.white};
  opacity: 0;
  padding-right: 50px;
  transform: translateY(${offset * 3}%);
  transition: all 2000ms ${easing.easeIn};
`;

// prettier-ignore
const ImageWrapper = styled.div`
  max-width: ${setColumnSpanSize(8)};
  position: relative;

  &::before {
    background-color: ${color.black};
    content: '';
    height: 100%;
    left: 0;
    opacity: 0.5;
    position: absolute;
    top: 0;
    width: 100%;
  }
`;

const Title = styled(H2)`
  color: ${color.white};
  display: inline-block;
  font-size: 75px;
  font-style: italic;
  line-height: 60px;
  margin-bottom: 45px;
  padding: 0 50px 30px 0;
  position: relative;
  text-transform: lowercase;

  &::before {
    background-color: ${color.white};
    bottom: 0;
    content: '';
    height: 2px;
    left: 0;
    position: absolute;
    width: 100%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 80px 0;
  position: relative;
  z-index: 1;
`;

const meetEnum = {
  COMP_REF: 0,
  CONTENT: 1,
  COPY: 2,
  IMAGE: 3
};

export const meetHandler = meetRefs => {
  const compRef = meetRefs[meetEnum.COMP_REF].ref.current;
  const contentRef = meetRefs[meetEnum.CONTENT].ref.current;
  const copyRef = meetRefs[meetEnum.COPY].ref.current;
  const imageRef = meetRefs[meetEnum.IMAGE].ref.current;

  const height = compRef.getBoundingClientRect().height;
  const scroll = compRef.getBoundingClientRect().top;

  if (scroll < height && scroll > 0) {
    const percentage = ((height - scroll) / (height * 3)) * 100;
    contentRef.style.transform = `translateX(${-offset + percentage}%)`;
    imageRef.style.opacity = (height - scroll) / (height * 0.75);

    if (scroll < height / 2) {
      copyRef.style.cssText += `opacity: 1; transform: translateY(0);`;
    } else {
      copyRef.style.cssText += `opacity: 0; transform: translateY(${
        offset * 3
      }%);`;
    }
  }
};

const Meet = ({ copy, image, setRefs, title }) => {
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
        <Title>{title}</Title>
        <Copy ref={refs[2].ref}>{copy}</Copy>
      </Content>
      <ImageWrapper ref={refs[3].ref}>
        <Image {...image} />
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
  setRefs: PropTypes.func.isRequired
};

export default Meet;
