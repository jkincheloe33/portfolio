import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { About, Contact, Hero } from '../../components';
import { theme } from '../../global';
import { backgroundHandler } from '../../components/sections/About/Background';
import { meetHandler } from '../../components/sections/About/Meet';
import { contactHandler } from '../../components/sections/Contact';
import data from './data';

const { about, contact } = data;

const { color } = theme;

const Wrapper = styled.div`
  background-color: ${color.black};
  overflow: hidden;
`;

const Landing = () => {
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
    const contactRefs = refs.filter(ref => ref.comp === 'Contact');
    const meetRefs = refs.filter(ref => ref.comp === 'Meet');
    const refsCurrent = [...new Set(refs.map(ref => ref.ref.current && true))];

    if (refsCurrent.length === 1 && refsCurrent[0]) {
      document.addEventListener('scroll', () => {
        backgroundHandler(backgroundRefs);
        meetHandler(meetRefs);
        contactHandler(contactRefs);
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
    <Wrapper>
      <Hero />
      <About {...about} setRefs={setRefs} />
      <Contact {...contact} setRefs={setRefs} />
    </Wrapper>
  );
};

export default Landing;
