"use client";
import { useGLTF } from "@react-three/drei";

export default function Model3D({ ruta, scale }) {
  const { scene } = useGLTF(ruta);

  return (
    <primitive object={scene} scale={scale} position={[0, -0.5, 0]} />
  );
}
