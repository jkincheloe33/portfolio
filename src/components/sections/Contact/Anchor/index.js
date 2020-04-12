import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image, ImageType } from '../../../elements';
import { media, theme } from '../../../../global';

const { color, easing } = theme;

const Icon = styled(Image)`
  background-color: ${color.yellow};
  border-radius: 50%;
  transform: scale(1);
  transition: transform 100ms ${easing.easeIn};
  width: 150px;

  &:hover {
    /* transform: scale(1.25); */
  }

  ${media.down.lg`
    width: 90px;
  `}
`;

const IconWrapper = styled.div`
  /* transition: transform 0.2s cubic-bezier(0.15, 0.09, 0.03, 1.54); */
`;

const Wrapper = styled.a`
  margin-right: 50px;

  &:last-of-type {
    margin-left: 50px;
    margin-right: 0;
  }

  ${media.down.lg`
    margin-right: 25px;

    &:last-of-type {
      margin-left: 25px;
      margin-right: 0;
    }
  `}
`;

const Anchor = ({ image, link }) => {
  const compRef = useRef(null);
  const imageRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [mouse, setMouse] = useState([0, 0]);

  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) => setMouse([x, y]),
    []
  );

  useEffect(() => {
    if (compRef.current) {
      const ref = compRef.current;
      const img = imageRef.current;
      const height = ref.offsetHeight;
      const width = ref.offsetWidth;
      const offsetX = 60;
      const offsetY = 60;

      const elPos = {
        x: ref.getBoundingClientRect().left + width / 2,
        y: ref.getBoundingClientRect().top + height / 2
      };

      const x = mouse[0] - elPos.x;
      const y = mouse[1] - elPos.y;

      if (hover && x < offsetX && x > -offsetX && y < offsetY && y > -offsetY)
        onHover(x, y);
      if (x >= offsetX || x <= -offsetX || y >= offsetY || y <= -offsetY)
        onLeave();

      function onHover(x, y) {
        gsap.to(img, {
          force3D: true,
          duration: 2,
          x: x,
          y: y,
          ease: 'power2.out'
        });
      }

      function onLeave() {
        gsap.to(img, {
          duration: 2,
          ease: 'elastic.out(1, 0.3)',
          force3D: true,
          x: 0,
          y: 0
        });
      }
    }
  }, [hover, mouse]);

  return (
    <Wrapper
      href={link}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={onMouseMove}
      ref={compRef}
    >
      <IconWrapper ref={imageRef}>
        <Icon {...image} />
      </IconWrapper>
    </Wrapper>
  );
};

export const AnchorType = {
  link: PropTypes.string.isRequired,
  image: PropTypes.shape(ImageType).isRequired
};

Anchor.propTypes = {
  ...AnchorType
};

export default Anchor;
