import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { H1, media, theme } from '../../../global';

const { color, easing } = theme;

// prettier-ignore
const Title = styled(H1)`
  color: ${p => p.animate ? color.yellow : color.white};
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: relative;
  text-align: center;
  transition: color 10ms;
  transition-delay: 2000ms;

  span {
    overflow: hidden;
    position: relative;
    transform: rotateZ(5deg) translateY(165%);
    transition: transform 1000ms ${easing.easeIn};

    &::before,
    &::after {
      background-color: ${color.yellow};
      content: '';
      height: 100%;
      left: 0%;
      position: absolute;
      top: 0%;
      transform: ${p => (p.animate ? 'translateY(-200%)' : 'translateY(100%)')};
      transition: transform 1500ms cubic-bezier(0.95, 0.02, 0.52, 0.82);
      transition-delay: 1000ms;
      width: 100%;
    }

    &::after {
      background-color: ${color.black};
      transform: ${p => (p.animate ? 'translateY(-100%)' : 'translateY(200%)')};
    }
  }

  ${p =>
    p.animate &&
    `
    span {
      transform: translateY(0) rotateZ(0);
    }
  `}

  ${media.up.lg`
    font-size: 200px;
    line-height: 225px;
  `}
`;

const Wrapper = styled.div`
  padding-bottom: 200px;
  position: relative;
  width: 100%;
`;

const Contact = () => {
  const [animate, setAnimate] = useState(false);
  const compRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll());
    return () => {
      window.removeEventListener('resize', handleScroll());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    if (compRef.current) {
      document.addEventListener('scroll', () => {
        const ref = compRef.current;
        // const height = ref.getBoundingClientRect().height;
        const scroll = ref.getBoundingClientRect().top;

        if (!animate && scroll < 800) {
          setAnimate(true);
        }
      });
    }
  };
  console.log(animate);

  return (
    <Wrapper ref={compRef}>
      <Title animate={animate} ref={titleRef}>
        <span>Let's Party</span>
      </Title>
    </Wrapper>
  );
};

export default Contact;
