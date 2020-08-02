import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { theme } from '../../../../global';

const { color } = theme;

function Model({ ...props }) {
  const meshRef = useRef(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh {...props} ref={meshRef}>
      <boxBufferGeometry attach="geometry" args={[3, 3, 3]} />
      <meshStandardMaterial attach="material" color={color.orange} />
    </mesh>
  );
}

export default Model;
