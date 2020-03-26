import React, { useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = ({ ...props }) => {
  const [model, setModel] = useState();

  useEffect(() => {
    new GLTFLoader().load('/obj/hero/scene.gltf', setModel);
  }, []);

  return model ? <primitive {...props} object={model.scene} /> : null;
};

export default Model;
