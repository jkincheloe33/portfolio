/* eslint-disable react-hooks/immutability */
// Disabling immutability rule for Three.js - direct object mutations are required for Three.js scene graph
import { useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import lerp from 'lerp'
import * as THREE from 'three'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

interface Props {
  mouse: React.RefObject<[number, number]>
  objectLoaded: boolean
  position: [number, number, number]
  rotation: [number, number, number]
  setAnimating: (animating: boolean) => void
  setObjectLoaded: (objectLoaded: boolean) => void
}

export const Model = ({ mouse, objectLoaded, setAnimating, setObjectLoaded, ...props }: Props) => {
  const [material, setMaterial] = useState<THREE.MeshStandardMaterial>(null)
  const [ready, setReady] = useState(false)
  const [model, setModel] = useState<GLTF>(null)
  const [scroll, setScroll] = useState(false)

  const { camera, size, viewport } = useThree()

  const aspect = size.width / viewport.width
  const manager = new THREE.LoadingManager()

  useEffect(() => {
    new GLTFLoader(manager).load('./obj/cloud/scene.gltf', setModel)
  }, [])

  manager.onProgress = function (_, objectLoaded, total) {
    if (objectLoaded === total) {
      setAnimating(false)
      setObjectLoaded(true)
      setTimeout(() => {
        setReady(true)
      }, 2500)
    }
  }

  useEffect(() => {
    if (ready) document.body.style += 'overflow-y: auto; position: static;'
    if (!ready) document.body.style += 'overflow-y: hidden; position: fixed;'
  }, [ready])

  useEffect(() => {
    if (model) {
      model.scene.traverse(child => {
        // Type guard for Mesh objects
        if ((child as THREE.Mesh).material) {
          setMaterial((child as THREE.Mesh).material as THREE.MeshStandardMaterial)
        }
      })
    }
  }, [model])

  useEffect(() => {
    if (model) {
      model.scene.rotation.y = -0.595
    }
  }, [])

  useFrame(() => {
    if (objectLoaded && ready && camera && !scroll) {
      camera.position.z = lerp(camera.position.z, 0, 0.03)
      if (model) {
        model.scene.rotation.y = lerp(model.scene.rotation.y, -0.6, 0.03)
      }
    }

    if (!scroll && camera.position.z < 0.5) setScroll(true)

    if (scroll) {
      camera.position.z = lerp(camera.position.z, window.scrollY / 150, 0.025)
      model.scene.position.x = lerp(model.scene.position.x, mouse.current[0] / aspect / 600, 0.01)
    }

    if (material) {
      const mColor = material.color

      mColor.r = lerp(mColor.r, 1, 0.05)
      mColor.g = lerp(mColor.g, 1, 0.05)
      mColor.b = lerp(mColor.b, 1, 0.05)
    }
  })

  return model ? <primitive {...props} object={model.scene} /> : null
}
