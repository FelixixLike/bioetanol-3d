"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import Model3D from "./Model3D";
import { pasos } from "./pasos";
import Welcome from "./Welcome";
import Controles from "./Controles";

// Precargar todos los modelos 3D
Object.values(pasos).forEach((p) => {
  useGLTF.preload(p.model);
});

// Controlador de cámara que cambia según el modo
function CameraController({ modoLibre }) {
  const controlsRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(1, 3, modoLibre ? 7 : 20);
    camera.lookAt(0, 0, 0);
  }, [modoLibre]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={modoLibre}
      enablePan={false}
      minDistance={modoLibre ? 5 : 20}
      maxDistance={modoLibre ? 8 : 20}
    />
  );
}

export default function Scene({ pasoInicial = 1 }) {
  const [aceptado, setAceptado] = useState(false);
  const [currentStep, setCurrentStep] = useState(pasoInicial);
  const [modoLibre, setModoLibre] = useState(false);

  const paso = pasos[currentStep];

  if (!aceptado) {
    return <Welcome onAceptar={() => setAceptado(true)} />;
  }

  return (
    <div className="relative w-screen h-screen">
      <Canvas camera={{ position: [0, 2, 20], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 2, 3]} intensity={1.5} />
        <CameraController modoLibre={modoLibre} />
        <Suspense fallback={null}>
          <Model3D ruta={paso.model} scale={paso.scale} />
        </Suspense>
      </Canvas>

      {/* Título del paso actual */}
      <h1 className="absolute top-6 inset-x-0 text-center text-3xl sm:text-4xl md:text-5xl font-bold text-red-600 drop-shadow-lg z-50">
        {paso.title}
      </h1>

      {/* Controles de navegación y audio */}
      <Controles
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        modoLibre={modoLibre}
        setModoLibre={setModoLibre}
      />
    </div>
  );
}
