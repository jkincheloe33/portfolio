import React from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useFrame, useLoader, useThree } from 'react-three-fiber';
import { fragmentShader, vertexShader } from '../../utils';

const Wave = ({ url }) => {
  const [texture] = useLoader(THREE.TextureLoader, [url]);
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
      <planeGeometry attach="geometry" args={[5, 6, 5, 5]} />
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

Wave.propTypes = {
  url: PropTypes.string
};

export default Wave;
