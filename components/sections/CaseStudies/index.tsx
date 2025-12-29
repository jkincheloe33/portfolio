import { memo, Suspense, useCallback, useState } from 'react'
import { Canvas as CanvasBase } from '@react-three/fiber'
import styled from 'styled-components'

import { Container } from '@/components'
import { media } from '@/utils'
import { Controls, Model } from './Model'
import { Slide, SlideType } from './Slide'

interface Props {
  images: string[]
  slides: SlideType[]
}

export const CaseStudies = memo(({ images, slides }: Props) => {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)

  const handleActive = useCallback(
    index => {
      if (active === index) return
      setAnimating(true)
      setTimeout(() => {
        setActive(index)
        setAnimating(false)
      }, 1000)
    },
    [active]
  )

  return (
    <Container>
      <Slide {...slides[active]} animating={animating} />
      <Scene>
        <Canvas camera={{ near: 1 }} id='cubeCanvas'>
          <ambientLight />
          <Controls animating={animating} />
          <Suspense fallback={null}>
            <Model animating={animating} images={images} handleActive={handleActive} />
          </Suspense>
        </Canvas>
      </Scene>
    </Container>
  )
})

const Canvas = styled(props => <CanvasBase {...props} />)`
  min-height: 500px;
  height: 100%;
  width: 100%;

  canvas {
    min-height: 500px;
  }
`

const Scene = styled.div`
  cursor: pointer;
  margin: -138px auto 0;
  max-width: 730px;

  ${media.up.sm`
    margin-top: -91px;
    min-height: 600px;
  `}
`
