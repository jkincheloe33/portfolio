import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media, theme } from '../../../global';
import { Container as ContainerBase } from '../../blocks';
import Background, { BackgroundType } from './Background';
import Details, { DetailsType } from './Details';
import Meet, { MeetType } from './Meet';

const { easing, timing } = theme;

const Container = styled(ContainerBase)`
  position: relative;
`;

// prettier-ignore
const Wrapper = styled.div`
  padding-top: 200px;
  position: relative;

  &::after {
    background: linear-gradient(black, transparent);
    content: '';
    height: 200px;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: background-image ${timing.colorMode} ${easing.easeIn};
  }

  ${p => p.lightMode && `
    &::after {
      background: linear-gradient(white, rgba(255, 255, 255, 0.001));
    }
  `}

  @media only screen and (max-width: 1272px) {
    padding-top: 100px;
  }

  ${media.down.md`
    padding-top: 50px;
  `}
`;

const About = ({ background, details, lightMode, meet, setRefs }) => {
  const [isIOSMobile, setIsIOSMobile] = useState(false);

  const uniforms = {
    details: {
      uTime: { value: 0.0 }
    },
    meet: {
      uTime: { value: 0.0 }
    }
  };

  const handleUniforms = () => {
    uniforms.details.uTime.value += 0.01;
    uniforms.meet.uTime.value += 0.01;
    requestAnimationFrame(handleUniforms);
  };

  handleUniforms();

  useEffect(() => {
    const ua = window.navigator.userAgent;
    const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
    setIsIOSMobile(iOS);
  }, []);

  return (
    <Wrapper lightMode={lightMode}>
      <Container>
        <Background {...background} lightMode={lightMode} setRefs={setRefs} />
        <Meet
          {...meet}
          isIOSMobile={isIOSMobile}
          lightMode={lightMode}
          setRefs={setRefs}
          uniforms={uniforms.meet}
        />
        <Details
          {...details}
          isIOSMobile={isIOSMobile}
          lightMode={lightMode}
          uniforms={uniforms.details}
          setRefs={setRefs}
        />
      </Container>
    </Wrapper>
  );
};

About.propTypes = {
  background: PropTypes.shape(BackgroundType).isRequired,
  details: PropTypes.shape(DetailsType).isRequired,
  lightMode: PropTypes.bool,
  meet: PropTypes.shape(MeetType).isRequired,
  setRefs: PropTypes.func.isRequired
};

export default About;
