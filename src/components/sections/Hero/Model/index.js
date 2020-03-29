import React, { useEffect, useState } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import lerp from 'lerp';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = ({ mouse, ...props }) => {
  const [model, setModel] = useState();
  const { camera, size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  useEffect(() => {
    new GLTFLoader().load('./obj/hero/scene.gltf', setModel);
  }, []);

  useFrame(() => {
    if (camera && camera.position.z > 15) {
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
