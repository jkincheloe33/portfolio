import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  H1,
  LightModeContext,
  media,
  setPayload,
  theme
} from '../../../global';
import Anchor, { AnchorType } from './Anchor';

const { color, easing, timing } = theme;

const Line = styled.div`
  margin: 0 0 60px 0;
  overflow: hidden;
  padding-top: 4px;
  position: relative;

  &::before {
    background-color: ${p => (p.lightMode ? color.black : color.white)};
    content: '';
    height: 4px;
    left: 50%;
    position: absolute;
    top: 0;
    transform: translate(-50%, 205%);
    transition: background-color ${timing.colorMode} ${easing.easeIn},
      transform 1000ms ${easing.easeIn} 2000ms;
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
  color: ${p => p.lightMode ? color.black : color.white};
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
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
      background-color: ${p => p.lightMode ? color.white : color.black};
      transform: translateY(200%);
    }
  }

  &.animate {
    color: ${color.yellow};
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
    // titleRef.style.color = color.yellow;
    titleRef.classList.add('animate');
    titleChildren[0].classList.add('animate');
    lineRef.classList.add('animate');
  } else {
    // titleRef.style.color = color.white;
    titleRef.classList.remove('animate');
    titleChildren[0].classList.remove('animate');
    lineRef.classList.remove('animate');
  }
};

const Contact = ({ icons, setRefs }) => {
  const { lightMode } = useContext(LightModeContext);

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
      <Title lightMode={lightMode} ref={refs[1].ref}>
        <span lightMode={lightMode}>Let's Chat</span>
      </Title>
      <Line lightMode={lightMode} ref={refs[2].ref} />
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
