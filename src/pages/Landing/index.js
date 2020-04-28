import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import { About, Callout, Contact, Hero } from '../../components';
import { theme } from '../../global';
import { backgroundHandler } from '../../components/sections/About/Background';
import { meetHandler } from '../../components/sections/About/Meet';
import { contactHandler } from '../../components/sections/Contact';
import data from './data';

const { about, contact, hero } = data;

const { color, easing } = theme;

const Wrapper = styled.div`
  background-color: ${p => (p.lightMode ? color.white : color.black)};
  overflow: hidden;
  transition: background-color 3000ms ${easing.easeIn};
`;

const Landing = () => {
  const [lightMode, setLightMode] = useState(false);
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

  setTimeout(() => {
    setLightMode(true);
  }, 10000);

  return (
    <Wrapper lightMode={lightMode}>
      <Hero {...hero} lightMode={lightMode} />
      <About {...about} setRefs={setRefs} />
      <Contact {...contact} setRefs={setRefs} />
      <Callout />
    </Wrapper>
  );
};

export default Landing;
