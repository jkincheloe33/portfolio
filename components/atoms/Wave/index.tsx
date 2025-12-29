import { useEffect } from 'react'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'

import { fragmentShader, vertexShader } from './shaders'

interface Props {
  args: [number, number, number, number]
  uniforms: { uTexture: { value: THREE.Texture } }
  url: string
}

export const Wave = ({ args, uniforms, url }: Props) => {
  const [texture] = useLoader(THREE.TextureLoader, [url])

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
            fragmentShader: fragmentShader,
            uniforms,
            vertexShader: vertexShader,
            wireframe: false,
          },
        ]}
      />
    </mesh>
  )
}
