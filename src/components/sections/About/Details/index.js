import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  media,
  P,
  parseContent,
  setColumnSpanSize,
  theme
} from '../../../../global';

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

  ${media.down.md`
    margin: 40px 0 0;
    max-width: none;
  `}
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

  ${media.down.md`
    height: 60vw;
    max-width: none;
  `}
`;

const Wrapper = styled.div`
  margin-top: 200px;
  padding-bottom: 200px;

  ${media.up.md`
    align-items: flex-end;
    display: flex;
  `}
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
