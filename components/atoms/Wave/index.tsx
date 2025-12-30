import { useEffect } from 'react'
import * as THREE from 'three'
import { useFrame, useLoader } from '@react-three/fiber'

import { fragmentShader, vertexShader } from './shaders'

interface Props {
  args: [number, number, number, number]
  url: string
}

export const Wave = ({ args, url }: Props) => {
  const [texture] = useLoader(THREE.TextureLoader, [url])

  const uniforms = {
    uTexture: { value: null },
    uTime: { value: 0.0 },
  }

  useFrame(() => {
    uniforms.uTime.value += 0.01
    uniforms.uTime.value += 0.01
  })

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    uniforms.uTexture = { value: texture }
  }, [texture, uniforms.uTexture])

  return (
    <mesh>
      <planeGeometry attach='geometry' args={args} />
      <shaderMaterial
        attach='material'
        args={[
          {
            fragmentShader,
            uniforms,
            vertexShader,
            wireframe: false,
          },
        ]}
      />
    </mesh>
  )
}
