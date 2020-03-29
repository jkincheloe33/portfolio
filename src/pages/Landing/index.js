import React from 'react';
import styled from 'styled-components';
import { Hero, Intro } from '../../components';
import { theme } from '../../global';
import data from './data';

const { intro } = data;

const { color } = theme;

const Wrapper = styled.div`
  background-color: ${color.black};
`;

const Landing = () => (
  <Wrapper>
    <Hero />
    <Intro {...intro} />
  </Wrapper>
);

export default Landing;
