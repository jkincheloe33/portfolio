import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { H1, media, setPayload, theme } from '../../../global';
import Anchor, { AnchorType } from './Anchor';

const { color, easing } = theme;

const Line = styled.div`
  margin: 60px 0;
  overflow: hidden;
  padding-top: 20px;
  position: relative;

  &::before {
    background-color: ${color.white};
    content: '';
    height: 20px;
    left: 50%;
    position: absolute;
    top: 0;
    transform: translate(-50%, 100%);
    transition: transform 1000ms ${easing.easeIn};
    transition-delay: 2000ms;
    width: 50%;
  }

  &.animate::before {
    transform: translate(-50%, 0);
  }

  ${media.down.lg`
    &::before {
      width: 85%;
    }
  `}
`;

const Social = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

// prettier-ignore
const Title = styled(H1)`
  /* color: ${p => (p.animate ? color.yellow : color.white)}; */
  color: ${color.white};
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
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
      transform: translateY(100%);
      transition: transform 1500ms cubic-bezier(0.95, 0.02, 0.52, 0.82);
      transition-delay: 1000ms;
      width: 100%;
    }

    &::after {
      background-color: ${color.black};
      transform: translateY(200%);
    }
  }

  span.animate {
    transform: translateY(0) rotateZ(0);
    &::before { transform: translateY(-200%); }
    &::after { transform: translateY(-100%); }    
  }

  ${media.up.lg`
    font-size: 200px;
    line-height: 225px;
  `}
`;

const Wrapper = styled.div`
  margin-bottom: 50px;
  position: relative;
  width: 100%;
`;

const contactEnum = {
  COMP_REF: 0,
  LINE_REF: 2,
  TITLE_REF: 1
};

// eslint-disable-next-line react-hooks/exhaustive-deps
export const contactHandler = refs => {
  const compRef = refs[contactEnum.COMP_REF].ref.current;
  const lineRef = refs[contactEnum.LINE_REF].ref.current;
  const titleRef = refs[contactEnum.TITLE_REF].ref.current;
  const titleChildren = titleRef.children;
  const scroll = compRef.getBoundingClientRect().top;

  if (scroll < 800) {
    titleRef.style.color = color.yellow;
    titleChildren[0].classList.add('animate');
    lineRef.classList.add('animate');
  } else {
    titleRef.style.color = color.white;
    titleChildren[0].classList.remove('animate');
    lineRef.classList.remove('animate');
  }
};

const Contact = ({ icons, setRefs }) => {
  const refs = [
    {
      comp: 'Contact',
      ref: useRef(null)
    },
    {
      comp: 'Contact',
      ref: useRef(null)
    },
    {
      comp: 'Contact',
      ref: useRef(null)
    }
  ];

  useEffect(() => {
    setPayload(refs, setRefs);
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper ref={refs[0].ref}>
      <Title ref={refs[1].ref}>
        <span>Let's Chat</span>
      </Title>
      <Line ref={refs[2].ref} />
      <Social>
        {icons.map((icon, i) => (
          <Anchor {...icon} key={i} />
        ))}
      </Social>
    </Wrapper>
  );
};

Contact.propTypes = {
  icons: PropTypes.arrayOf(PropTypes.shape(AnchorType)).isRequired,
  setRefs: PropTypes.func.isRequired
};

export default Contact;
