import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { P, parseContent, setColumnSpanSize, theme } from '../../../../global';

const { color } = theme;

const Copy = styled(P)`
  margin-left: 30px;
  max-width: ${setColumnSpanSize(6)};
  padding-top: 20px;
  position: relative;

  &::before {
    background-color: ${color.white};
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
`;

const ImageWrapper = styled.div`
  background-image: url(${p => p.url});
  background-position: center center;
  background-size: cover;
  height: 30vw;
  max-width: ${setColumnSpanSize(5)};
  opacity: 0.95;
  position: relative;
  width: 100%;
`;

const Wrapper = styled.div`
  align-items: flex-end;
  display: flex;
  margin-top: 200px;
  padding-bottom: 200px;
`;

const Details = ({ copy, image, setRefs }) => (
  <Wrapper>
    <ImageWrapper url={image} />
    <Copy dangerouslySetInnerHTML={parseContent(copy)} />
  </Wrapper>
);

export const DetailsType = {
  copy: PropTypes.string,
  image: PropTypes.string.isRequired
};

Details.propTypes = {
  ...DetailsType,
  setRefs: PropTypes.func
};

export default Details;
