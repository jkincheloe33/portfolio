import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import gsap from 'gsap';
import { media } from '../../../global';

const Container = styled.div`
  backface-visibility: hidden;
  overflow: hidden;
  position: absolute;
  transform-style: preserve-3d;
  width: 100%;
  z-index: 10;
`;

const Wrapper = styled.div`
  bottom: 0;
  height: 100%;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  transform-origin: right bottom;
  width: 100%;

  ${media.down.lg`
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  `}
`;

const SmoothScroll = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (containerRef.current) {
      const scroller = {
        ease: 0.05, // <= scroll speed
        endY: 0,
        resizeRequest: 1,
        scrollRequest: 0,
        target: containerRef.current,
        y: 0
      };

      let requestId = null;

      gsap.set(scroller.target, {
        force3D: true,
        rotation: 0.01
      });

      const onLoad = () => {
        updateScroller();
        window.focus();
        window.addEventListener('resize', onResize);
        document.addEventListener('scroll', onScroll);
      };

      const updateScroller = () => {
        const resized = scroller.resizeRequest > 0;

        if (resized) {
          const height = scroller.target.clientHeight;
          body.style.height = height + 'px';
          scroller.resizeRequest = 0;
        }

        const scrollY =
          window.pageYOffset || html.scrollTop || body.scrollTop || 0;

        scroller.endY = scrollY;
        scroller.y += (scrollY - scroller.y) * scroller.ease;

        if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
          scroller.y = scrollY;
          scroller.scrollRequest = 0;
        }

        gsap.set(scroller.target, {
          y: -scroller.y
        });

        requestId =
          scroller.scrollRequest > 0
            ? requestAnimationFrame(updateScroller)
            : null;
      };

      const onScroll = () => {
        scroller.scrollRequest++;
        if (!requestId) {
          requestId = requestAnimationFrame(updateScroller);
        }
      };

      const onResize = () => {
        scroller.resizeRequest++;
        if (!requestId) {
          requestId = requestAnimationFrame(updateScroller);
        }
      };

      window.addEventListener('load', onLoad);
    }
  }, []);

  return (
    <Wrapper>
      <Container ref={containerRef}>{children}</Container>
    </Wrapper>
  );
};

SmoothScroll.propTypes = {
  children: PropTypes.node
};

export default SmoothScroll;
