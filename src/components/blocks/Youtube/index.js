import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { getEmbedLink } from './utils';

const VideoWrapper = styled.iframe`
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
`;

const Wrapper = styled.div`
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 0;
  width: 100%;
`;

const Youtube = ({ autoplay, className, url }) => (
  <Wrapper className={className}>
    <VideoWrapper
      src={getEmbedLink(autoplay, url)}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Youtube"
    />
  </Wrapper>
);

export const YoutubeType = {
  autoplay: PropTypes.bool,
  url: PropTypes.string
};

Youtube.propTypes = {
  ...YoutubeType,
  className: PropTypes.string
};

export default Youtube;
