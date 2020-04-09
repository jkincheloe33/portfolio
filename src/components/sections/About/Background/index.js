import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { H1, media, theme } from '../../../../global';
import { setPayload } from '../utils';

const { color } = theme;

const offset = 50;

const Title = styled(H1)`
  color: ${p => (p.even ? color.white : color.yellow)};
  font-size: 100px;
  line-height: 85px;
  transform: ${p => (p.even ? `translateX(-${offset}%)` : `translateX(0)`)};
  white-space: nowrap;

  ${media.up.lg`
    font-size: 200px;
    line-height: 180px;
  `}
`;

const Wrapper = styled.div`
  bottom: 0;
  left: -50%;
  position: absolute;
  width: 200%;
  z-index: 0;

  ${media.down.md`
    bottom: 500px;
  `}
`;

const backgroundEnum = {
  COMP_REF: 0,
  TITLE_ONE: 1,
  TITLE_TWO: 2,
  TITLE_THREE: 3
};

export const backgroundHandler = refs => {
  const compRef = refs[backgroundEnum.COMP_REF].ref.current;
  const titleOne = refs[backgroundEnum.TITLE_ONE].ref.current;
  const titleTwo = refs[backgroundEnum.TITLE_TWO].ref.current;
  const titleThree = refs[backgroundEnum.TITLE_THREE].ref.current;
  const width = window.innerWidth;

  const scrolled = window.pageYOffset * 0.3;
  titleOne.style.transform = `translateX(calc(${scrolled}px - ${offset}%))`;
  titleTwo.style.transform = `translateX(-${scrolled}px)`;
  titleThree.style.transform = `translateX(calc(${scrolled}px - ${offset}%))`;

  if (width < 768) {
    compRef.style.transform = `translateY(-${scrolled}px) rotateZ(-5deg)`;
  } else if (width < 959) {
    compRef.style.transform = `translateY(-${scrolled + 150}px) rotateZ(-5deg)`;
  } else {
    compRef.style.transform = `translateY(-${scrolled}px) rotateZ(-5deg)`;
  }
};

const Background = ({ setRefs, titles }) => {
  const refs = [
    {
      comp: 'Background',
      ref: useRef(null)
    },
    {
      comp: 'Background',
      ref: useRef(null)
    },
    {
      comp: 'Background',
      ref: useRef(null)
    },
    {
      comp: 'Background',
      ref: useRef(null)
    }
  ];

  useEffect(() => {
    setPayload(refs, setRefs);
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper ref={refs[0].ref}>
      {titles.map((title, i) => (
        <Title even={i % 2} key={i} ref={refs[i + 1].ref}>
          {title}
        </Title>
      ))}
    </Wrapper>
  );
};

export const BackgroundType = {
  titles: PropTypes.arrayOf(PropTypes.string).isRequired
};

Background.propTypes = {
  ...BackgroundType,
  setRefs: PropTypes.func
};

export default Background;
