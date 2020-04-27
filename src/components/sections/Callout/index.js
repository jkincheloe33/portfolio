import React from 'react';
import styled from 'styled-components';
import { Container } from '../../blocks';
import { P, parseContent, theme } from '../../../global';

const { color, easing } = theme;

const Copy = styled(P)`
  font-size: 14px;
  overflow: hidden;
  text-align: center;

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
  background-color: #222;
  margin-top: 100px;
`;

const data = `Developed by me in React. Design by me + Jake Pierce. You can check out this site in more detail on my <a href="https://github.com/jkincheloe33/portfolio">Github</a>`;

const Callout = () => (
  <Wrapper>
    <Container>
      <Copy dangerouslySetInnerHTML={parseContent(data)} />
    </Container>
  </Wrapper>
);

export default Callout;
