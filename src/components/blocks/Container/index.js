import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

// prettier-ignore
const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;

  ${p => !p.unContain && `
    max-width: 1264px;
    padding: 0 20px;
  `}
`;

const Container = ({ children, className, unContain }) => (
  <Wrapper className={className} unContain={unContain}>
    {children}
  </Wrapper>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  unContain: PropTypes.bool
};

export default Container;
