import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  getColumnSpanSize,
  H1,
  P,
  setColumnSpanSize,
  theme
} from '../../../../global';
import { Image, ImageType } from '../../../elements';

const { color, easing } = theme;

const offset = 30;

const Content = styled.div`
  left: 0;
  max-width: ${getColumnSpanSize(6)}px;
  position: absolute;
  top: 140px;
  transform: translateX(-${offset}%);
  width: 100%;
  z-index: 1;
`;

const Copy = styled(P)`
  color: ${color.blue};
  font-weight: bold;
  opacity: 0;
  padding-left: 80px;
  transform: translateY(${offset * 2}%);
  transition: all 2000ms ${easing.easeIn};
`;

// prettier-ignore
const ImageWrapper = styled.div`
  max-width: ${setColumnSpanSize(9)};
`;

const Title = styled(H1)`
  color: ${color.blue};
  font-size: 100px;
  margin-bottom: 100px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 80px 0;
  position: relative;
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
    imageRef.style.opacity = (height - scroll) / (height * 3);

    if (scroll < height / 2) {
      copyRef.style.cssText += `opacity: 1; transform: translateY(0);`;
    } else {
      copyRef.style.cssText += `opacity: 0; transform: translateY(${offset *
        2}%);`;
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
    refs.forEach(ref => {
      const payload = { payload: ref, type: 'create' };
      setRefs(payload);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper ref={refs[0].ref}>
      <Content ref={refs[1].ref}>
        <Title as="h2">{title}</Title>
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
