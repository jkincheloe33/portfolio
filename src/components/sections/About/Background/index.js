import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: white;
  height: 300px;
  left: -10%;
  position: absolute;
  top: 60%;
  width: 120%;
`;

const Background = ({ setRefs }) => {
  return (
    <Wrapper>
      <h1>Base</h1>
    </Wrapper>
  );
};

Background.propTypes = {
  setRefs: PropTypes.func
};

export default Background;
