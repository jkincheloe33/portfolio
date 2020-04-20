import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useLoader } from 'react-three-fiber';
import { fragmentShader, vertexShader } from '../../utils';

const Wave = ({ uniforms, url }) => {
  const [texture] = useLoader(THREE.TextureLoader, [url]);

  useEffect(() => {
    uniforms.uTexture = { value: texture };
  }, [texture, uniforms.uTexture]);

  return (
    <mesh>
      <planeGeometry attach="geometry" args={[9, 6, 5, 5]} />
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
  uniforms: PropTypes.object,
  url: PropTypes.string
};

export default Wave;
