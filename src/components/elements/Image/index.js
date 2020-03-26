import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  height: auto;
  width: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Image = ({ alt, className, src }) => (
  <Wrapper className={className}>
    <Img alt={alt} src={src} />
  </Wrapper>
);

export const ImageType = {
  alt: PropTypes.string,
  src: PropTypes.string.isRequired
};

Image.propTypes = {
  ...ImageType,
  className: PropTypes.string
};

export default Image;
