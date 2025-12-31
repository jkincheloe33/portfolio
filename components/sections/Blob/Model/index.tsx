import { useRef } from 'react'
import { RootState, useFrame } from '@react-three/fiber'
import { createNoise3D } from 'simplex-noise'
import * as THREE from 'three'
import { SphereGeometry, Mesh } from 'three'

import { theme } from '@/theme'

const { color } = theme

interface Props {
  loading?: boolean
  mouse: React.RefObject<{ x: number; y: number }>
}

export const Model = ({ loading, mouse }: Props) => {
  const meshRef = useRef<Mesh>(null)
  const geoRef = useRef<SphereGeometry>(null)

  const lastScrollPos = useRef(window.scrollY)
  const lastTime = useRef<number | null>(null)
  const velocity = useRef(0)

  // const lastScrollPos = useRef(window.scrollY)
  // const lastTime = useRef<number | null>(null)
  // const velocity = useRef(0)

  const noise3D = createNoise3D()

  function animate(state: RootState, delta: number) {
    const offset = document.documentElement.scrollTop * 0.001

    if (meshRef.current) {
      meshRef.current.rotation.x = meshRef.current.rotation.y += 0.001
      meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, -5 * offset - 0.75, 4, delta)
      if (loading) {
        state.camera.position.z = 1.5
      } else if (window.innerWidth > 675) {
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 50, 0.05)
        if (mouse.current) {
          // Match mouse x to state.mouse.x: -1 (left edge), 0 (center), 1 (right edge)
          const normalizedMouseX = (mouse.current.x * 2) / window.innerWidth - 1
          // Match mouse y to state.mouse.y: -1 (top edge), 0 (center), 1 (bottom edge) - flipped for Three.js coordinate system
          const normalizedMouseY = -((mouse.current.y * 2) / window.innerHeight - 1)

          meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, normalizedMouseX * 63, 0.07)
          meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, normalizedMouseY * 40, 0.07)
        }
      }
    }

    if (geoRef.current) {
      const geo = geoRef.current
      // change to see more or less spikes
      const spikes = 0.75 + 100 * velocity.current
      // Use React Three Fiber's clock for time (safe to use in useFrame)
      const time = state.clock.elapsedTime * 0.5
      const positions = geo.attributes.position.array as unknown as number[]
      for (let i = 0; i < positions.length; i += 3) {
        const v = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]).normalize()
        v.multiplyScalar(1 + 0.3 * noise3D(v.x * spikes, v.y * spikes, v.z * spikes + time))
        positions[i] = v.x
        positions[i + 1] = v.y
        positions[i + 2] = v.z
      }
      geo.computeVertexNormals()
      geo.attributes.position.needsUpdate = true
    }

    updateScrollVelocity()
  }

  function updateScrollVelocity() {
    const currentScrollPos = window.scrollY
    const currentTime = performance.now()

    // Initialize lastTime on first frame
    if (lastTime.current === null) {
      lastTime.current = currentTime
      return
    }

    // Calculate the change in position (deltaY) and time (deltaTime)
    const deltaY = currentScrollPos - lastScrollPos.current
    // deltaTime in seconds
    const deltaTime = (currentTime - lastTime.current) / 1000

    // Calculate velocity (pixels per second)
    if (deltaTime > 0) {
      const latestVelocity = Math.abs((deltaY / deltaTime) * 0.00001)
      // Smooth velocity changes using lerp to avoid jumpy transitions
      velocity.current = THREE.MathUtils.lerp(velocity.current, latestVelocity, 0.15)
    }

    // Update last position and time for the next frame
    lastScrollPos.current = currentScrollPos
    lastTime.current = currentTime
  }

  useFrame((state, delta) => {
    animate(state, delta)
  })

  return (
    <mesh ref={meshRef} scale={2}>
      <sphereGeometry args={[0.8, 128, 128]} ref={geoRef} />
      <meshPhongMaterial color={color.white} shininess={80} />
    </mesh>
  )
}
