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
      random.inSphere(new Float32Array(5000 * 3), { radius: 1.5 }) as Float32Array,
    []
  );

  useFrame((_state, delta) => {
    if (pointsRef.current) {
      const safeDelta = Math.min(delta, 0.1);
      pointsRef.current.rotation.x -= safeDelta / 10;
      pointsRef.current.rotation.y -= safeDelta / 15;
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
