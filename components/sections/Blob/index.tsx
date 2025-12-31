import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Canvas as CanvasBase } from '@react-three/fiber'

import { Model } from './Model'

interface Props {
  heroLoaded: boolean
  mouse: React.RefObject<{ x: number; y: number }>
}

export const Blob = ({ heroLoaded, mouse }: Props) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (heroLoaded) timeout = setTimeout(() => setLoading(false), 5000)

    return () => {
      clearTimeout(timeout)
    }
  }, [heroLoaded])

  return (
    <Canvas camera={{ far: 50000 }}>
      <directionalLight intensity={1} position={[0, 500, 200]} />
      <ambientLight intensity={0.3} />
      <Model loading={loading} mouse={mouse} />
    </Canvas>
  )
}

const Canvas = styled(props => <CanvasBase {...props} />)`
  left: 0;
  pointer-events: none !important;
  position: fixed !important;
  top: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1;

  canvas {
    height: 100vh !important;
    width: 100vw !important;
  }
`
