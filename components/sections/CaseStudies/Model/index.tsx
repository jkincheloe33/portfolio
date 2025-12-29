/* eslint-disable react-hooks/immutability */
// Disabling immutability rule for Three.js - direct object mutations are required for Three.js scene graph
import { memo, useMemo, useRef, useState } from 'react'
import lerp from 'lerp'
import { a, useSpring } from '@react-spring/three'
import { extend, useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

export const Controls = ({ animating }: { animating: boolean }) => {
  const [mobile, setMobile] = useState(false)
  const { camera, gl } = useThree()
  const orbitRef = useRef(null)

  useFrame(() => {
    const speed = orbitRef.current
    if (animating) speed.autoRotateSpeed = lerp(speed.autoRotateSpeed, 300, 0.04)
    if (!animating) speed.autoRotateSpeed = lerp(speed.autoRotateSpeed, 2, 0.04)
    if (window.innerWidth < 667 && !mobile) {
      camera.position.z = 7
      setMobile(true)
    }
    if (window.innerWidth >= 667 && mobile) {
      camera.position.z = 5
      setMobile(false)
    }
    orbitRef.current.update()
  })

  return <orbitControls args={[camera, gl.domElement]} autoRotate enableZoom={false} ref={orbitRef} />
}

interface Props {
  animating?: boolean
  handleActive?: (index: number) => void
  images: string[]
}

export const Model = memo(({ animating, handleActive, images }: Props) => {
  const meshRef = useRef(null)

  const props = useSpring({ scale: animating ? [1, 1, 1] : [3.5, 3.5, 3.5] })
  const textures = useLoader(THREE.TextureLoader, images)

  const materials = useMemo(() => textures.map(texture => new THREE.MeshLambertMaterial({ map: texture })), [textures])

  function handleClick(e) {
    handleActive(Math.floor(e.faceIndex / 2))
  }

  return (
    <a.mesh onPointerUp={handleClick} ref={meshRef} scale={props.scale as unknown as [number, number, number]} material={materials}>
      <boxGeometry attach='geometry' args={[1, 1, 1]} />
    </a.mesh>
  )
})
