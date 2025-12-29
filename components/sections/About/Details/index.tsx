import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import styled from 'styled-components'
import * as THREE from 'three'

import { Image, ImageType, Wave } from '@/components'
import { P, theme } from '@/theme'
import { media, parseContent, setColumnSpanSize } from '@/utils'

const { color, easing, timing } = theme

export interface DetailsType {
  copy: string
  image: ImageType
}

interface Props extends DetailsType {
  isIOSMobile: boolean
  uniforms: { uTexture: { value: THREE.Texture } }
}

export const Details = ({ copy, image, isIOSMobile, uniforms }: Props) => (
  <Wrapper>
    <ImageWrapper $isIOSMobile={isIOSMobile}>
      {isIOSMobile ? (
        <Image {...image} />
      ) : (
        <Canvas camera={{ position: [0, 0, 4] }}>
          <Suspense fallback={null}>
            <Wave args={[9, 6, 5, 5]} uniforms={uniforms} url={image.src} />
          </Suspense>
        </Canvas>
      )}
    </ImageWrapper>
    {/* eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml */}
    <Copy dangerouslySetInnerHTML={parseContent(copy)} />
  </Wrapper>
)

const Copy = styled(props => <P {...props} />)`
  margin-left: 30px;
  max-width: ${setColumnSpanSize(6)};
  padding-top: 20px;
  position: relative;
  transition: color ${timing.colorMode} ${easing.easeIn};

  &::before {
    background-color: ${color.white};
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    top: 0;
    transition: background-color ${timing.colorMode} ${easing.easeIn};
    width: 100%;
  }

  span {
    font-style: italic;
  }

  ${media.down.md`
    margin: 40px 0 0;
    max-width: none;
  `}
`

const ImageWrapper = styled.div<{ $isIOSMobile: boolean }>`
  height: ${p => (p.$isIOSMobile ? 'auto' : '22vw')};
  max-width: ${setColumnSpanSize(5)};
  opacity: 0.95;
  position: relative;
  width: 100%;

  ${media.down.md`
    height: 60vw;
    max-width: none;
  `}
`

const Wrapper = styled.div`
  margin-top: 200px;
  padding-bottom: 200px;

  ${media.up.md`
    align-items: flex-end;
    display: flex;
  `}

  ${media.down.sm`
    padding-bottom: 50px;
  `}
`
