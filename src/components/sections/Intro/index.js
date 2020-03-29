import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  getColumnSpanSize,
  H1,
  P,
  setColumnSpanSize,
  theme
} from '../../../global';
import { Container } from '../../blocks';
import { Image, ImageType } from '../../elements';

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
  color: ${color.green};
  font-weight: bold;
  opacity: 0;
  padding-left: 80px;
  transform: translateY(${offset * 2}%);
  transition: all 2000ms ${easing.easeIn};
`;

// prettier-ignore
const ImageWrapper = styled.div`
  /* filter: blur(4px); */
  max-width: ${setColumnSpanSize(9)};
`;

const Title = styled(H1)`
  color: ${color.green};
  font-size: 100px;
  margin-bottom: 100px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 80px 0;
  position: relative;
`;

const Intro = ({ copy, image, setRefs, title }) => {
  const compRef = useRef(null);
  const contentRef = useRef(null);
  const copyRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (compRef.current && contentRef.current && imageRef.current) {
      document.addEventListener('scroll', () => {
        const ref = compRef.current;
        const height = ref.offsetHeight;
        const scroll = ref.offsetTop - window.scrollY;

        if (scroll < height && scroll > 0) {
          const percentage = ((height - scroll) / (height * 3)) * 100;
          contentRef.current.style.transform = `translateX(${-offset +
            percentage}%)`;
          imageRef.current.style.opacity = (height - scroll) / (height * 3);

          if (scroll < height / 2) {
            copyRef.current.style.cssText += `opacity: 1; transform: translateY(0);`;
          } else {
            copyRef.current.style.cssText += `opacity: 0; transform: translateY(${offset *
              2}%);`;
          }
        }
      });
    }
  });

  return (
    <Container>
      <Wrapper ref={compRef}>
        <Content ref={contentRef}>
          <Title as="h2">{title}</Title>
          <Copy ref={copyRef}>{copy}</Copy>
        </Content>
        <ImageWrapper ref={imageRef}>
          <Image {...image} />
        </ImageWrapper>
      </Wrapper>
    </Container>
  );
};

Intro.propTypes = {
  copy: PropTypes.string.isRequired,
  image: PropTypes.shape(ImageType).isRequired,
  setRefs: PropTypes.func,
  title: PropTypes.string.isRequired
};

export default Intro;
