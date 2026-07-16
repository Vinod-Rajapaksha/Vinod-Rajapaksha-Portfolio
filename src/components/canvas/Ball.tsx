import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { useInView } from "react-intersection-observer";

import CanvasLoader from "../layout/Loader";

type BallProps = {
  imgUrl: string;
};

const Ball: React.FC<BallProps> = ({ imgUrl }) => {
  const [decal] = useTexture([imgUrl]) as [THREE.Texture];

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />

      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />

        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
        />
      </mesh>
    </Float>
  );
};

type BallCanvasProps = {
  icon: string;
};

const BallCanvas: React.FC<BallCanvasProps> = ({ icon }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="w-full h-full">
      <Canvas
        className="w-full h-full"
        frameloop={inView ? "always" : "never"}
        dpr={[1, 1.5]}
        gl={{
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls enablePan={false} enableZoom={false} />
          <Ball imgUrl={icon} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default BallCanvas;
