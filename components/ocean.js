import React, { useRef, useMemo } from 'react';
import { useFrame, useThree, extend, useLoader } from '@react-three/fiber';
import { Water } from 'three-stdlib';
import * as THREE from 'three';

// import waterTexture from '/images/materials/waternormals.jpeg'; // Adjust the import path based on your project structure

extend({ Water });

const Ocean = () => {
  const ref = useRef();
  const gl = useThree((state) => state.gl);

  // Adjust the import path based on your project structure
  const waterNormals = useLoader(THREE.TextureLoader, `/waternormals.jpeg`);

  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor:  0x001e0f,
      distortionScale: 3.7,
      fog: false,
      format: gl.encoding,
    }),
    [waterNormals]
  );

  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta));

  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />;
};

export default Ocean;
