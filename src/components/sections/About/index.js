import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container as ContainerBase } from '../../blocks';
import Background, { BackgroundType } from './Background';
import Details, { DetailsType } from './Details';
import Meet, { MeetType } from './Meet';

const Container = styled(ContainerBase)`
  position: relative;
`;

const About = ({ background, details, meet, setRefs }) => {
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
    <Container>
      <Background {...background} setRefs={setRefs} />
      <Meet
        {...meet}
        isIOSMobile={isIOSMobile}
        setRefs={setRefs}
        uniforms={uniforms.meet}
      />
      <Details
        {...details}
        isIOSMobile={isIOSMobile}
        uniforms={uniforms.details}
        setRefs={setRefs}
      />
    </Container>
  );
};

About.propTypes = {
  background: PropTypes.shape(BackgroundType).isRequired,
  details: PropTypes.shape(DetailsType).isRequired,
  meet: PropTypes.shape(MeetType).isRequired,
  setRefs: PropTypes.func.isRequired
};

export default About;
