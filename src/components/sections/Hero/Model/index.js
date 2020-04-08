import React, { useEffect, useState } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import lerp from 'lerp';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = ({
  objectLoaded,
  mouse,
  progressRef,
  setObjectLoaded,
  ...props
}) => {
  const [model, setModel] = useState();
  const { camera, size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const manager = new THREE.LoadingManager();

  useEffect(() => {
    new GLTFLoader(manager).load('./obj/hero/scene.gltf', setModel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  manager.onProgress = function (item, objectLoaded, total) {
    if (progressRef.current) {
      progressRef.current.style.transform = `translateX(${
        (objectLoaded / total) * 100
      }%)`;
    }
    if (objectLoaded === total)
      setTimeout(() => {
        setObjectLoaded(true);
      }, 3500);
  };

  useFrame(() => {
    if (objectLoaded && camera && camera.position.z > 15) {
      camera.position.z = lerp(camera.position.z, 15, 0.03);
      if (model) {
        model.scene.rotation.y = lerp(model.scene.rotation.y, -2.5, 0.03);
      }
    }
    if (camera.position.z < 15.5) {
      camera.rotation.y = lerp(
        camera.rotation.y,
        0 + mouse.current[0] / aspect / 100,
        0.005
      );

      camera.rotation.x = lerp(
        camera.rotation.x,
        0 + mouse.current[1] / aspect / 100,
        0.005
      );
    }
  });

  return model ? <primitive {...props} object={model.scene} /> : null;
};

export default Model;
