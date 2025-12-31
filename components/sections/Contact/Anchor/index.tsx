import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styled from 'styled-components'

import { Image, ImageType } from '@/components'
import { theme } from '@/theme'
import { media } from '@/utils'

const { color, easing } = theme

export interface AnchorType {
  link: string
  image: ImageType
}

export const Anchor = ({ image, link }: AnchorType) => {
  const [hover, setHover] = useState(false)
  const [mouse, setMouse] = useState([0, 0])

  const compRef = useRef<HTMLAnchorElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => setMouse([x, y]), [])

  useEffect(() => {
    if (compRef.current) {
      const ref = compRef.current
      const img = imageRef.current
      const height = ref.offsetHeight
      const width = ref.offsetWidth
      const offsetX = 60
      const offsetY = 60

      const elPos = {
        x: ref.getBoundingClientRect().left + width / 2,
        y: ref.getBoundingClientRect().top + height / 2,
      }

      const x = mouse[0] - elPos.x
      const y = mouse[1] - elPos.y

      if (hover && x < offsetX && x > -offsetX && y < offsetY && y > -offsetY) onHover(x, y)
      if (x >= offsetX || x <= -offsetX || y >= offsetY || y <= -offsetY) onLeave()

      function onHover(x, y) {
        gsap.to(img, {
          force3D: true,
          duration: 2,
          x: x,
          y: y,
          ease: 'power2.out',
        })
      }

      function onLeave() {
        gsap.to(img, {
          duration: 2,
          ease: 'elastic.out(1, 0.3)',
          force3D: true,
          x: 0,
          y: 0,
        })
      }
    }
  }, [hover, mouse])

  return (
    <Wrapper
      href={link}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={onMouseMove}
      ref={compRef}
      target='_blank'
    >
      <div ref={imageRef}>
        <Icon {...image} />
      </div>
    </Wrapper>
  )
}

const Icon = styled(Image)`
  background-color: ${color.yellow};
  border-radius: 50%;
  transform: scale(1);
  transition: transform 100ms ${easing.easeIn};
  width: 150px;

  ${media.down.lg`
    width: 90px;
  `}
`

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
`
