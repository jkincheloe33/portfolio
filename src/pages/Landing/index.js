import React, { useContext, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import {
  About,
  Callout,
  CaseStudies,
  Contact,
  LightDark,
  Hero
} from '../../components';
import { LightModeContext, theme } from '../../global';
import { backgroundHandler } from '../../components/sections/About/Background';
import { meetHandler } from '../../components/sections/About/Meet';
import { contactHandler } from '../../components/sections/Contact';
import data from './data';

const { about, caseStudies, contact, hero } = data;

const { color, easing, timing } = theme;

const Wrapper = styled.div`
  background-color: ${p => (p.lightMode ? color.white : color.black)};
  overflow: hidden;
  transition: background-color ${timing.colorMode} ${easing.easeIn};
`;

const Landing = () => {
  const { lightMode } = useContext(LightModeContext);
  const [refs, setRefs] = useReducer(selectedReducer, []);

  useEffect(() => {
    handleScroll(refs);
  }, [refs]);

  const handleScroll = refs => {
    const backgroundRefs = refs.filter(ref => ref.comp === 'Background');
    const contactRefs = refs.filter(ref => ref.comp === 'Contact');
    const meetRefs = refs.filter(ref => ref.comp === 'Meet');
    const refsCurrent = [...new Set(refs.map(ref => ref.ref.current && true))];

    const handleRaf = () => {
      backgroundHandler(backgroundRefs);
      meetHandler(meetRefs);
      contactHandler(contactRefs);

      requestAnimationFrame(handleRaf);
    };

    if (refsCurrent.length === 1 && refsCurrent[0]) {
      handleRaf();
    }
  };

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
    <Wrapper lightMode={lightMode}>
      <LightDark />
      <Hero {...hero} />
      <About {...about} setRefs={setRefs} />
      <CaseStudies {...caseStudies} />
      <Contact {...contact} setRefs={setRefs} />
      <Callout lightMode={lightMode} />
    </Wrapper>
  );
};

export default Landing;
