import React from 'react';
import styled from 'styled-components';
import { About, Hero } from '../../components';
import { theme } from '../../global';
import data from './data';

const { about } = data;

const { color } = theme;

const Wrapper = styled.div`
  background-color: ${color.black};
`;

const Landing = () => (
  <Wrapper>
    <Hero />
    <About {...about} />
  </Wrapper>
);

export default Landing;
