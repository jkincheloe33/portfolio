import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { setPayload } from '../utils';

const Wrapper = styled.div`
  background: white;
  bottom: 0;
  height: 300px;
  left: -10%;
  position: absolute;
  width: 120%;
`;

const backgroundEnum = {
  COMP_REF: 0
};

export const backgroundHandler = refs => {
  const compRef = refs[backgroundEnum.COMP_REF].ref.current;

  const scrolled = window.pageYOffset * 0.3;
  compRef.style.transform = `translateY(-${scrolled}px)`;
};

const Background = ({ setRefs }) => {
  const refs = [
    {
      comp: 'Background',
      ref: useRef(null)
    }
  ];

  useEffect(() => {
    setPayload(refs, setRefs);
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper ref={refs[0].ref}>
      <h1>Base</h1>
    </Wrapper>
  );
};

Background.propTypes = {
  setRefs: PropTypes.func
};

export default Background;
