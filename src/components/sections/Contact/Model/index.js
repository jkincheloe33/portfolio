import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = ({
  objectLoaded,
  mouse,
  setAnimating,
  setObjectLoaded,
  ...props
}) => {
  const [model, setModel] = useState();
  const manager = new THREE.LoadingManager();

  useEffect(() => {
    new GLTFLoader(manager).load('./obj/cloud/scene.gltf', setModel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return model ? <primitive {...props} object={model.scene} /> : null;
};

export default Model;
