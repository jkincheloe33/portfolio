import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  flex: 0 0 60%;

  h1 {
    color: white;
    font-size: 90px;
  }
`;

function Slide({ active }) {
  return (
    <Wrapper>
      <h1>Slide #: {active}</h1>
      <h1>This</h1>
      <h1>is a</h1>
      <h1>Test</h1>
    </Wrapper>
  );
}

Slide.propTypes = {
  active: PropTypes.number.isRequired
};

export default Slide;
