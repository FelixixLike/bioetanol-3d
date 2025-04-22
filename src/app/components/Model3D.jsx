"use client";
import { useGLTF } from "@react-three/drei";

export default function Model3D({ ruta }) {
  const { scene } = useGLTF(ruta);

  return (
    <primitive object={scene} scale={0.6} position={[0, -0.5, 0]} />
  );
}
