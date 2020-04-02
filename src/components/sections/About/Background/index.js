import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: white;
  height: 300px;
  left: -10%;
  position: absolute;
  top: 60%;
  width: 120%;
`;

const Background = () => (
  <Wrapper>
    <h1>Base</h1>
  </Wrapper>
);

export default Background;
