"use client";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { useRef, Suspense } from "react"; // 👈 aquí lo importante

function PineappleModel() {
  const { scene } = useGLTF("/modelos/pineapple.glb");
  return <primitive object={scene} scale={0.6} position={[0, -1, 0]} />;
}

export default function Home() {
  const sphereRef = useRef();

  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 2, 5], fov: 50 }}>
        <OrbitControls makeDefault />
        <directionalLight position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        <Suspense fallback={null}>
          <PineappleModel />
        </Suspense>
      </Canvas>
    </main>
  );
}
