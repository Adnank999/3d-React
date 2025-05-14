// import React, { useEffect, useRef } from 'react';
// import { useLoader, useFrame } from '@react-three/fiber';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { AnimationMixer } from 'three';
// import { GLTF } from 'three-stdlib';
// import gsap from 'gsap';
// import ScrollTrigger from 'gsap/ScrollTrigger';

// type GLTFResult = GLTF & {
//   nodes: any;
//   materials: any;
// };

// interface ModelProps {
//   url: string;
// }

// gsap.registerPlugin(ScrollTrigger);

// const Model: React.FC<ModelProps> = ({ url }) => {
//   const gltf = useLoader<GLTFResult>(GLTFLoader, url);
//   const mixer = useRef<AnimationMixer>();
//   const actionRef = useRef<THREE.AnimationAction>();
//   const clockTime = useRef(0);
//   const durationRef = useRef(1);

//   console.log("gltf",gltf)

//   // useEffect(() => {
//   //   if (gltf.animations.length > 0) {
//   //     mixer.current = new AnimationMixer(gltf.scene);
//   //     const firstClip = gltf.animations[1];
//   //     const action = mixer.current.clipAction(firstClip);
//   //     action.paused = true;
//   //     action.play();

//   //     actionRef.current = action;
//   //     durationRef.current = firstClip.duration;

//   //     const progress = { value: 0 };

//   //     gsap.to(progress, {
//   //       value: durationRef.current,
//   //       ease: 'none',
//   //       scrollTrigger: {
//   //         trigger: '#scroll-container', // Ensure this ID exists in your page
//   //         start: 'top top',
//   //         end: 'bottom bottom',
//   //         scrub: true,
//   //         onUpdate: () => {
//   //           if (actionRef.current && mixer.current) {
//   //             actionRef.current.time = progress.value;
//   //             mixer.current.update(0.016); // Update the mixer with a delta time
//   //           }
//   //         },
//   //       },
//   //     });

//   //     // Cleanup function to kill the ScrollTrigger instance
//   //     return () => {
//   //       ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Kill all ScrollTriggers
//   //     };
//   //   }
//   // }, [gltf]);

//   useFrame((state, delta) => {
//     mixer.current?.update(delta); // Ensure the mixer updates every frame
//   });

//   return <primitive object={gltf.scene} />;
// };

// export default Model;


// Model.tsx
import React, { useEffect, useRef } from 'react';
import { useLoader, useFrame, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationMixer } from 'three';
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
  const mixer = useRef<AnimationMixer>(null);
  const { camera } = useThree(); // 🎯 Use the default R3F camera
  const prevProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  useEffect(() => {
    // Set initial camera position and look
    camera.position.set(10, 2, 10);
    camera.lookAt(0, 0, 0);

    const progress = { value: 0 };

    // Camera position animation - now with faster scroll response and multiple positions
    gsap.to(camera.position, {
      x: 0,
      y: 2,
      z: 5,
      ease: 'none',
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,  // Increased scroll speed by adjusting the scrub value
        onUpdate: (self) => {
          prevProgressRef.current = currentProgressRef.current;
          currentProgressRef.current = self.progress;
        },
      },
    });

    // Add more camera position changes based on scroll progress
    gsap.to(camera.position, {
      x: -10,
      y: 5,
      z: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top 20%',
        end: 'bottom 80%',
        scrub: 0.3,
      },
    });

    gsap.to(camera.position, {
      x: 10,
      y: 5,
      z: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top 40%',
        end: 'bottom 60%',
        scrub: 0.3,
      },
    });

    gsap.to(camera.position, {
      x: -5,
      y: 10,
      z: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 0.3,
      },
    });

    gsap.to(camera.position, {
      x: 0,
      y: 15,
      z: 5,
      ease: 'none',
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 0.3,
      },
    });

    // Camera rotation animation
    gsap.to(camera.rotation, {
      y: Math.PI,
      ease: 'none',
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [camera]);

  useFrame((_, delta) => {
    mixer.current?.update(delta);
  });

  return <primitive object={gltf.scene} />;
};

export default Model;

