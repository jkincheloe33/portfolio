import React, { useEffect, useState } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import lerp from 'lerp';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = ({ mouse, ...props }) => {
  const [model, setModel] = useState();
  const { camera } = useThree();
  const manager = new THREE.LoadingManager();

  useEffect(() => {
    new GLTFLoader(manager).load('./obj/cloud/scene.gltf', setModel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(() => {
    if (camera) {
      camera.position.z = lerp(
        camera.position.z,
        10 - window.scrollY / 150,
        0.025
      );
    }
  });

  return model ? <primitive {...props} object={model.scene} /> : null;
};

export default Model;
