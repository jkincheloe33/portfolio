import React from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from 'react-three-fiber';
import { fragmentShader, vertexShader } from './data';

const Wave = () => {
  const [texture] = useLoader(THREE.TextureLoader, ['./img/me.jpg']);
  const clock = new THREE.Clock();

  const uniforms = {
    uTime: { value: 0.0 },
    uTexture: { value: texture }
  };

  useFrame(() => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh>
      <planeGeometry attach="geometry" args={[6, 4, 16, 16]} />
      <shaderMaterial
        attach="material"
        args={[
          {
            fragmentShader: fragmentShader,
            uniforms: uniforms,
            vertexShader: vertexShader,
            wireframe: false
          }
        ]}
      />
    </mesh>
  );
};

export default Wave;
