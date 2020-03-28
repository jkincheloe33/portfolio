import React, { useEffect, useRef, useState } from 'react';
import { extend, useFrame, useThree } from 'react-three-fiber';
import lerp from 'lerp';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

export const Controls = () => {
  const { camera, gl } = useThree();
  const orbitRef = useRef(null);

  useFrame(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls
      args={[camera, gl.domElement]}
      // enableZoom={false}
      // maxPolarAngle={Math.PI / 3}
      // minPolarAngle={Math.PI / 3}
      ref={orbitRef}
    />
  );
};

const Model = ({ mouse, ...props }) => {
  const [model, setModel] = useState();
  const { camera, size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  useEffect(() => {
    new GLTFLoader().load('/obj/hero/scene.gltf', setModel);
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
