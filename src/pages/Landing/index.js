import React from 'react';
import { Hero, Intro } from '../../components';
import data from './data';

const { intro } = data;

const Landing = () => (
  <>
    <Hero />
    <Intro {...intro} />
  </>
);

export default Landing;
