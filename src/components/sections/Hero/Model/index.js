import React, { useEffect, useState } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import lerp from 'lerp';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { theme } from '../../../../global';

const { color } = theme;

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
  const colorLight = new THREE.Color(color.yellow);

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

    if (scroll) {
      camera.position.z = lerp(camera.position.z, window.scrollY / 150, 0.025);
      model.scene.position.x = lerp(
        model.scene.position.x,
        mouse.current[0] / aspect / 600,
        0.01
      );
    }

    if (material) {
      const mColor = material.color;
      if (lightMode) {
        mColor.r = lerp(mColor.r, colorLight.r, 0.05);
        mColor.g = lerp(mColor.g, colorLight.g, 0.05);
        mColor.b = lerp(mColor.b, colorLight.b, 0.05);
      } else {
        mColor.r = lerp(mColor.r, 1, 0.05);
        mColor.g = lerp(mColor.g, 1, 0.05);
        mColor.b = lerp(mColor.b, 1, 0.05);
      }
    }
  });

  return model ? <primitive {...props} object={model.scene} /> : null;
};

export default Model;
