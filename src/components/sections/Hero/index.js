import React, { Suspense, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Canvas as CanvasBase } from 'react-three-fiber';
import { H1, media, parseContent, theme } from '../../../global';
import Loading from './Loading';
import Model from './Model';

const { color, easing, fontWeight } = theme;

const scroll = keyframes`
  0% { transform: translateY(0); }
  90% { transform: translateY(15px); }
  100% { transform: translateY(0); }
`;

const Canvas = styled(CanvasBase)`
  min-height: 100vh;
  opacity: ${p => (p.animating ? 0 : 1)};
  transition: opacity 2000ms ${easing.easeIn};
`;

// prettier-ignore
const Title = styled(H1)`
  color: #ddd;
  font-size: 100px;
  font-weight: ${fontWeight.bold};
  left: 0;
  letter-spacing: 1.3vw;
  opacity: ${p => (p.objectLoaded ? 0.85 : 0)};
  position: absolute;
  text-align: center;
  text-shadow: 0 0 5px ${color.black};
  text-transform: lowercase;
  top: 50%;
  transform: translateY(-50%);
  transition: opacity 4000ms;
  transition-delay: 4000ms;
  width: 100%;
  z-index: 1;

  span {
    color: ${color.yellow};
    font-size: 32px;
    font-weight: ${fontWeight.regular};
  }

  div {
    animation: ${scroll} 2000ms infinite;
    position: relative;

    &::before,
    &::after {
      background-color: ${color.yellow};
      bottom: -100px;
      content: '';
      height: 8px;
      left: calc(50% - 25px);
      position: absolute;
      transform: rotateZ(45deg) translateX(-50%);
      width: 50px;
    }

    &::after {
      bottom: -65px;
      left: calc(50% + 6px);
      transform: rotateZ(-45deg) translateX(-50%);
    }
  }

  ${media.down.lg`
    font-size: 70px;

    span {
      font-size: 25px;
    }

    div {
      padding: 0;
    }
  `}
`;

const Wrapper = styled.div`
  min-height: 100vh;
  margin-bottom: 200px;
  position: relative;
  width: 100%;

  &::after {
    background: linear-gradient(transparent, black);
    bottom: 0;
    content: '';
    height: 200px;
    left: 0;
    position: absolute;
    right: 0;
  }

  @media only screen and (max-width: 1272px) {
    margin-bottom: 100px;
  }

  ${media.down.md`
    margin-bottom: 50px;
  `}
`;

const Hero = ({ title }) => {
  const [animating, setAnimating] = useState(true);
  const [objectLoaded, setObjectLoaded] = useState(false);

  return (
    <Wrapper>
      <Loading
        animating={animating}
        objectLoaded={objectLoaded}
        setAnimating={setAnimating}
      />
      <Title
        dangerouslySetInnerHTML={parseContent(title)}
        objectLoaded={objectLoaded}
      />
      <Canvas animating={animating} camera={{ position: [0, 0, 100] }}>
        <ambientLight intensity={0.1} />
        <Suspense fallback={null}>
          <Model
            objectLoaded={objectLoaded}
            setAnimating={setAnimating}
            setObjectLoaded={setObjectLoaded}
            position={[0, -3, 3]}
            rotation={[0.2, 0.4, 0]}
          />
        </Suspense>
      </Canvas>
    </Wrapper>
  );
};

export default Hero;
