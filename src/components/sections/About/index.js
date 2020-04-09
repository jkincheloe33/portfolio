import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container as ContainerBase } from '../../blocks';
import Background, { backgroundHandler, BackgroundType } from './Background';
import Details, { DetailsType } from './Details';
import Meet, { meetHandler, MeetType } from './Meet';

const Container = styled(ContainerBase)`
  position: relative;
`;

const About = ({ background, details, meet }) => {
  const [refs, setRefs] = useReducer(selectedReducer, []);

  useEffect(() => {
    handleScroll(refs);

    window.addEventListener('resize', handleScroll(refs));
    return () => {
      window.removeEventListener('resize', handleScroll(refs));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refs]);

  function handleScroll(refs) {
    const backgroundRefs = refs.filter(ref => ref.comp === 'Background');
    const meetRefs = refs.filter(ref => ref.comp === 'Meet');
    const refsCurrent = [...new Set(refs.map(ref => ref.ref.current && true))];

    if (refsCurrent.length === 1 && refsCurrent[0]) {
      document.addEventListener('scroll', () => {
        backgroundHandler(backgroundRefs);
        meetHandler(meetRefs);
      });
    }
  }

  function selectedReducer(state, action) {
    switch (action.type) {
      case 'create': {
        if (!state.includes(action.payload)) return [...state, action.payload];
        return state.filter(item => item !== action.payload);
      }
      default: {
        return state;
      }
    }
  }

  return (
    <Container>
      <Background {...background} setRefs={setRefs} />
      <Meet {...meet} setRefs={setRefs} />
      <Details {...details} setRefs={setRefs} />
    </Container>
  );
};

About.propTypes = {
  background: PropTypes.shape(BackgroundType).isRequired,
  details: PropTypes.shape(DetailsType).isRequired,
  meet: PropTypes.shape(MeetType).isRequired
};

export default About;
