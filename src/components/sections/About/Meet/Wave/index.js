import React from 'react';
import * as THREE from 'three';
import { useFrame, useLoader, useThree } from 'react-three-fiber';
import { fragmentShader, vertexShader } from './data';

const Wave = () => {
  const [texture] = useLoader(THREE.TextureLoader, ['./img/me.jpg']);
  const { clock } = useThree();

  const uniforms = {
    uTime: { value: 0.0 },
    uTexture: { value: texture }
  };

  useFrame(() => {
    uniforms.uTime.value = clock.elapsedTime / 1.5;
  });

  return (
    <mesh>
      <planeGeometry attach="geometry" args={[8.08, 5.61, 5, 5]} />
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
