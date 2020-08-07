import lerp from 'lerp';
import PropTypes from 'prop-types';
import React, { memo, useRef, useState } from 'react';
import { a, useSpring } from 'react-spring/three';
import { extend, useFrame, useLoader, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

export function Controls({ animating }) {
  const [mobile, setMobile] = useState(false);
  const { camera, gl } = useThree();
  const orbitRef = useRef(null);

  useFrame(() => {
    const speed = orbitRef.current;
    if (animating)
      speed.autoRotateSpeed = lerp(speed.autoRotateSpeed, 300, 0.04);
    if (!animating)
      speed.autoRotateSpeed = lerp(speed.autoRotateSpeed, 2, 0.04);
    if (window.innerWidth < 667 && !mobile) {
      camera.position.z = 7;
      setMobile(true);
    }
    if (window.innerWidth >= 667 && mobile) {
      camera.position.z = 5;
      setMobile(false);
    }
    orbitRef.current.update();
  });

  return (
    <orbitControls
      args={[camera, gl.domElement]}
      autoRotate
      enableZoom={false}
      ref={orbitRef}
    />
  );
}

export const Model = memo(({ animating, handleActive, images }) => {
  const meshRef = useRef(null);
  const props = useSpring({
    scale: animating ? [1, 1, 1] : [3.5, 3.5, 3.5]
  });
  const textures = useLoader(THREE.TextureLoader, images);

  function handleClick(e) {
    handleActive(Math.floor(e.faceIndex / 2));
  }

  return (
    <a.mesh onClick={handleClick} ref={meshRef} scale={props.scale}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      {textures.map((texture, i) => (
        <meshLambertMaterial attachArray="material" key={i} map={texture} />
      ))}
    </a.mesh>
  );
});

Controls.propTypes = {
  animating: PropTypes.bool
};

Model.propTypes = {
  animating: PropTypes.bool,
  handleActive: PropTypes.func,
  images: PropTypes.arrayOf(PropTypes.string).isRequired
};
