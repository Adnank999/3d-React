import React, { useEffect, useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationMixer } from 'three';
import { GLTF } from 'three-stdlib';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

type GLTFResult = GLTF & {
  nodes: any;
  materials: any;
};

interface ModelProps {
  url: string;
}

gsap.registerPlugin(ScrollTrigger);

const Model: React.FC<ModelProps> = ({ url }) => {
  const gltf = useLoader<GLTFResult>(GLTFLoader, url);
  const mixer = useRef<AnimationMixer>();
  const actionRef = useRef<THREE.AnimationAction>();
  const clockTime = useRef(0);
  const durationRef = useRef(1);

  useEffect(() => {
    if (gltf.animations.length > 0) {
      mixer.current = new AnimationMixer(gltf.scene);
      const firstClip = gltf.animations[0];
      const action = mixer.current.clipAction(firstClip);
      action.paused = true;
      action.play();

      actionRef.current = action;
      durationRef.current = firstClip.duration;

      const progress = { value: 0 };

      gsap.to(progress, {
        value: durationRef.current,
        ease: 'none',
        scrollTrigger: {
          trigger: '#scroll-container', // Ensure this ID exists in your page
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: () => {
            if (actionRef.current && mixer.current) {
              actionRef.current.time = progress.value;
              mixer.current.update(0.016); // Update the mixer with a delta time
            }
          },
        },
      });

      // Cleanup function to kill the ScrollTrigger instance
      return () => {
        ScrollTrigger.kill();
      };
    }
  }, [gltf]);

  useFrame((state, delta) => {
    mixer.current?.update(delta); // Ensure the mixer updates every frame
  });

  return <primitive object={gltf.scene} />;
};

export default Model;

