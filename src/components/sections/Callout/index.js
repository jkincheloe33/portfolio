import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container } from '../../blocks';
import { P, parseContent, theme } from '../../../global';

const { color, easing, timing } = theme;

const Copy = styled(P)`
  font-size: 14px;
  overflow: hidden;
  text-align: center;
  transition: color ${timing.colorMode} ${easing.easeIn};

  a {
    color: inherit;
    font-style: italic;
    overflow: hidden;
    position: relative;

    &::before {
      background-color: ${color.yellow};
      bottom: 0;
      content: '';
      height: 4px;
      left: 0;
      opacity: 0.5;
      position: absolute;
      transform: translateY(0);
      transition: transform 250ms ${easing.easeIn};
      width: 100%;
    }

    &:hover {
      &::before {
        transform: translateY(-40%);
      }
    }
  }
`;

const Wrapper = styled.div`
  background-color: ${p => (p.lightMode ? '#eee' : '#222')};
  margin-top: 100px;
  transition: background-color ${timing.colorMode} ${easing.easeIn};
`;

const data = `Developed by me in React. Design by me + Jake Pierce. You can check out this site in more detail on my <a href="https://github.com/jkincheloe33/portfolio" target="_blank>Github</a>`;

const Callout = ({ lightMode }) => (
  <Wrapper lightMode={lightMode}>
    <Container>
      <Copy
        dangerouslySetInnerHTML={parseContent(data)}
        lightMode={lightMode}
      />
    </Container>
  </Wrapper>
);

Callout.propTypes = {
  lightMode: PropTypes.bool
};

export default Callout;
