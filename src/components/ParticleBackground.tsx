"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";
import * as THREE from "three";

const ParticleBackground: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const sphere = useMemo(
    () =>
      random.inSphere(new Float32Array(5000), { radius: 1.5 }) as Float32Array,
    []
  );

  useFrame((_state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x -= delta / 10;
      pointsRef.current.rotation.y -= delta / 15;
    }
  });

  return (
    <Points
      ref={pointsRef}
      positions={sphere}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#22d3ee"
        size={0.002}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

export default ParticleBackground;
