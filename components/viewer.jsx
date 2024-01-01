import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { STLLoader } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three';
import { Color } from 'three';

const GltfModel = ({ modelPath, position, scale, color }) => {
  const gltf = useLoader(GLTFLoader, modelPath);
  const ref = useRef();
  const [dragging, setDragging] = useState(false);
  const offset = new THREE.Vector3();
  const intersection = new THREE.Vector3();
  const inverseMatrix = new THREE.Matrix4();

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          ref.current.position.y += 1;
          break;
        case 'ArrowDown':
          ref.current.position.y -= 1;
          break;
        case 'ArrowLeft':
          ref.current.position.x -= 1;
          break;
        case 'ArrowRight':
          ref.current.position.x += 1;
          break;
        case 'r':
          // Rotate right
          ref.current.rotation.y += 0.1;
          break;
        case 'l':
          // Rotate left
          ref.current.rotation.y -= 0.1;
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // useFrame for animation mixer
  useFrame((state, delta) => {
    if (ref.current && gltf.animations && gltf.animations.length) {
      const mixer = new THREE.AnimationMixer(ref.current);
      const actions = gltf.animations.map((clip) => mixer.clipAction(clip));
      actions.forEach((action) => action.play());
      mixer.update(delta);
    }

    if (dragging && state.raycaster) {
      if (state.raycaster.ray.intersectPlane(new THREE.Plane(), intersection)) {
        ref.current.position.copy(intersection.sub(offset).applyMatrix4(inverseMatrix));
      }
    }
  });

  useEffect(() => {
    if (ref.current) {
      traverseAndUpdateColor(ref.current, color);
    }
  }, [color]);

  const events = {
    onPointerDown: (e) => {
      e.stopPropagation();
      setDragging(true);
      offset.copy(e.point).sub(ref.current.position);
    },
    onPointerUp: () => {
      setDragging(false);
    },
  };

  return (
    <>
      <mesh ref={ref} position={position} scale={scale} castShadow receiveShadow {...events}>
        <primitive object={gltf.scene} />
      </mesh>
      {/* Custom arrow controls */}
      {/* ... (Include your ArrowControl and RotateControl components here) */}
    </>
  );
};

// Helper function to traverse the object hierarchy and update colors
const traverseAndUpdateColor = (object, newColor) => {
  object.traverse((child) => {
    if (child.isMesh) {
      if (child.material.isMeshStandardMaterial) {
        child.material.color = new Color(newColor);
      }
    }
  });
};

export default GltfModel;
