import React, { useEffect, useState } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import lerp from 'lerp';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = ({ objectLoaded, setAnimating, setObjectLoaded, ...props }) => {
  const [ready, setReady] = useState(false);
  const [model, setModel] = useState();
  const [scroll, setScroll] = useState(false);
  const { camera } = useThree();
  const manager = new THREE.LoadingManager();

  useEffect(() => {
    new GLTFLoader(manager).load('./obj/cloud/scene.gltf', setModel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  manager.onProgress = function (item, objectLoaded, total) {
    if (objectLoaded === total) {
      setAnimating(false);
      setObjectLoaded(true);
      setTimeout(() => {
        setReady(true);
      }, 2500);
    }
  };

  useEffect(() => {
    if (ready) document.body.style += 'overflow-y: auto; position: static;';
    if (!ready) document.body.style += 'overflow-y: hidden; position: fixed;';
  }, [ready]);

  useFrame(() => {
    if (objectLoaded && ready && camera && !scroll) {
      camera.position.z = lerp(camera.position.z, 0, 0.03);
      if (model) {
        model.scene.rotation.y = lerp(model.scene.rotation.y, -0.6, 0.03);
      }
    }

    if (!scroll && camera.position.z < 0.5) setScroll(true);

    if (scroll) {
      camera.position.z = lerp(camera.position.z, window.scrollY / 150, 0.025);
    }
  });

  return model ? <primitive {...props} object={model.scene} /> : null;
};

export default Model;
