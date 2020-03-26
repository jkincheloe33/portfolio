import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../global';

const { color } = theme;

const Wrapper = styled.div`
  background-color: ${color.teal};
  height: 485px;
  width: 100%;
`;

const Divider = () => <Wrapper />;

export default Divider;
