import lerp from 'lerp';
import PropTypes from 'prop-types';
import React, { memo, useRef } from 'react';
import { a, useSpring } from 'react-spring/three';
import { extend, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

export function Controls({ animating }) {
  const { camera, gl } = useThree();
  const orbitRef = useRef(null);

  useFrame(() => {
    const speed = orbitRef.current;
    if (animating)
      speed.autoRotateSpeed = lerp(speed.autoRotateSpeed, 300, 0.04);
    if (!animating)
      speed.autoRotateSpeed = lerp(speed.autoRotateSpeed, 5, 0.04);
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
  const loader = new THREE.TextureLoader();
  const meshRef = useRef(null);
  const mouse = new THREE.Vector2();
  const props = useSpring({
    scale: animating ? [1, 1, 1] : [3.5, 3.5, 3.5]
  });
  const textures = images.map(image => loader.load(image));
  const raycaster = new THREE.Raycaster();
  // const video = document.getElementById('video');
  // const textureTest = new THREE.VideoTexture(video);
  // textureTest.minFilter = THREE.LinearFilter;
  // textureTest.magFilter = THREE.LinearFilter;
  // textureTest.format = THREE.RGBFormat;
  const { camera } = useThree();

  function handleClick(e) {
    const rect = document.getElementById('cubeCanvas').getBoundingClientRect();

    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(meshRef.current);

    if (intersects.length > 0) {
      const index = Math.floor(intersects[0].faceIndex / 2);
      handleActive(index);
    }
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
