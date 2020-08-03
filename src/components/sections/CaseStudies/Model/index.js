import React, { useRef } from 'react';
import { extend, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

const images = [
  './img/me3.jpg',
  './img/me3.jpg',
  './img/me3.jpg',
  './img/me3.jpg',
  './img/me3.jpg',
  './img/me3.jpg'
];

export function Controls() {
  const { camera, gl } = useThree();
  const orbitRef = useRef(null);

  useFrame(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls
      args={[camera, gl.domElement]}
      // autoRotate
      enableZoom={false}
      ref={orbitRef}
    />
  );
}

export function Model({ ...props }) {
  const loader = new THREE.TextureLoader();
  const meshRef = useRef(null);
  const textures = images.map(image => loader.load(image));
  const raycaster = new THREE.Raycaster();
  const { camera } = useThree();

  function handleClick(e) {
    const vector = new THREE.Vector3(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1,
      0.5
    );
    vector.unproject(camera);
    raycaster.set(camera.position, vector.sub(camera.position).normalize());

    const intersects = raycaster.intersectObject(meshRef.current);

    if (intersects.length > 0) {
      const index = Math.floor(intersects[0].faceIndex / 2);
      console.log(index);
    }
  }

  return (
    <mesh {...props} onClick={handleClick} ref={meshRef}>
      <boxBufferGeometry attach="geometry" args={[3, 3, 3]} />
      {textures.map((texture, i) => (
        <meshStandardMaterial attach="material" key={i} map={texture} />
      ))}
    </mesh>
  );
}
