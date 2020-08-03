import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';
// import { theme } from '../../../../global';

// const { color } = theme;

const images = [
  './img/me3.jpg',
  './img/me3.jpg',
  './img/me3.jpg',
  './img/me3.jpg',
  './img/me3.jpg',
  './img/me3.jpg'
];

function Model({ ...props }) {
  const loader = new THREE.TextureLoader();
  const meshRef = useRef(null);
  const textures = images.map(image => loader.load(image));

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh {...props} ref={meshRef}>
      <boxBufferGeometry attach="geometry" args={[3, 3, 3]} />
      {textures.map((texture, i) => (
        <meshStandardMaterial attach="material" key={i} map={texture} />
      ))}
    </mesh>
  );
}

export default Model;
