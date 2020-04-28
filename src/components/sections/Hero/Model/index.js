import React, { useEffect, useState } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import lerp from 'lerp';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = ({
  lightMode,
  mouse,
  objectLoaded,
  setAnimating,
  setObjectLoaded,
  ...props
}) => {
  const [material, setMaterial] = useState();
  const [ready, setReady] = useState(false);
  const [model, setModel] = useState();
  const [scroll, setScroll] = useState(false);
  const { camera, size, viewport } = useThree();
  const aspect = size.width / viewport.width;
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

  useEffect(() => {
    if (model) {
      model.scene.traverse(child => {
        if (child.material) {
          setMaterial(child.material);
        }
      });
    }
  }, [model]);

  useEffect(() => {
    if (model) {
      model.scene.rotation.y = -0.595;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightMode]);

  useFrame(() => {
    if (objectLoaded && ready && camera && !scroll) {
      camera.position.z = lerp(camera.position.z, 0, 0.03);
      if (model) {
        model.scene.rotation.y = lerp(model.scene.rotation.y, -0.6, 0.03);
      }
    }

    if (!scroll && camera.position.z < 0.5) setScroll(true);
    if (model) console.log(model.scene.rotation.y);

    if (scroll) {
      camera.position.z = lerp(camera.position.z, window.scrollY / 150, 0.025);
      model.scene.position.x = lerp(
        model.scene.position.x,
        mouse.current[0] / aspect / 600,
        0.01
      );
    }

    if (material) {
      const color = material.color;
      if (lightMode) {
        color.r = lerp(color.r, 0, 0.05);
        color.g = lerp(color.g, 0, 0.05);
        color.b = lerp(color.b, 0, 0.05);
      } else {
        color.r = lerp(color.r, 1, 0.05);
        color.g = lerp(color.g, 1, 0.05);
        color.b = lerp(color.b, 1, 0.05);
      }
    }
  });

  return model ? <primitive {...props} object={model.scene} /> : null;
};

export default Model;
