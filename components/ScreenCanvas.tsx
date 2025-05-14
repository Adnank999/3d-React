// SceneCanvas.tsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Model from './Model';

interface SceneCanvasProps {
  modelUrl: string;
}

const SceneCanvas: React.FC<SceneCanvasProps> = ({ modelUrl }) => {
  return (
    <Canvas
      // camera={{ position: [10, 2, 5], fov: 45 }}
      style={{ background: '#1a1a1a' }} // Optional: dark background
    >
    <Suspense fallback={null}>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 10, 7.5]}
        intensity={1.5}
        castShadow
      />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />

      {/* Optional: use an HDRI environment */}
      <Environment preset="sunset" background={false} />

      {/* Model */}
      <Model url={modelUrl} />

      {/* Controls */}
      <OrbitControls enableZoom={false} enablePan={false} />

    </Suspense> 
    </Canvas>
  );
};

export default SceneCanvas;
