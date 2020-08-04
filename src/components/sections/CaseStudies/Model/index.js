import lerp from 'lerp';
import PropTypes from 'prop-types';
import React, { memo, useRef } from 'react';
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

export const Model = memo(({ handleActive, images }) => {
  const loader = new THREE.TextureLoader();
  const meshRef = useRef(null);
  const textures = images.map(image => loader.load(image));
  const raycaster = new THREE.Raycaster();
  // const video = document.getElementById('video');
  // const textureTest = new THREE.VideoTexture(video);
  // textureTest.minFilter = THREE.LinearFilter;
  // textureTest.magFilter = THREE.LinearFilter;
  // textureTest.format = THREE.RGBFormat;
  const { camera, size } = useThree();

  function handleClick(e) {
    const vector = new THREE.Vector3(
      (e.clientX / size.width) * 2 - 1.4,
      -(e.clientY / size.height) * 2 + 1.4,
      0.5
    );
    vector.unproject(camera);
    raycaster.set(camera.position, vector.sub(camera.position).normalize());
    const intersects = raycaster.intersectObject(meshRef.current);

    if (intersects.length > 0) {
      const index = Math.floor(intersects[0].faceIndex / 2);
      handleActive(index);
    }
  }

  return (
    <mesh onClick={handleClick} ref={meshRef}>
      <boxBufferGeometry attach="geometry" args={[3.5, 3.5, 3.5]} />
      {textures.map((texture, i) => (
        <meshLambertMaterial attachArray="material" key={i} map={texture} />
      ))}
    </mesh>
  );
});

Controls.propTypes = {
  animating: PropTypes.bool
};

Model.propTypes = {
  handleActive: PropTypes.func,
  images: PropTypes.arrayOf(PropTypes.string).isRequired
};
