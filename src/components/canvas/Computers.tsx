import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Float } from "@react-three/drei";

import CanvasLoader from "../layout/Loader";

const Computers: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const computer = useGLTF("/desktop_pc/scene.gltf");

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <hemisphereLight intensity={0.5} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize={1024}
        color="#22d3ee"
      />
      <pointLight position={[10, -10, 5]} intensity={1} color="#3b82f6" />
      <pointLight position={[-10, 10, -5]} intensity={0.5} color="#8b5cf6" />

      <primitive
        object={computer.scene}
        scale={0.8}
        position={isMobile ? [0, -2.5, -1.5] : [0, -3.5, -1]}
        rotation={[-0.01, -0.2, -0.05]}
      />
    </Float>
  );
};

const ComputersCanvas: React.FC = () => {
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  const [isMobile, setIsMobile] = useState(mediaQuery.matches);

  useEffect(() => {
    const handler = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [25, 3, 5], fov: 25 }}
      gl={{
        preserveDrawingBuffer: true,
        alpha: true,
        antialias: true,
      }}
      className="rounded-3xl"
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2.5}
          autoRotate
          autoRotateSpeed={2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
