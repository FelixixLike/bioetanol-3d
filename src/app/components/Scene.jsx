"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import Model3D from "./Model3D";
import { pasos } from "./pasos";
import Welcome from "./Welcome";
import Controles from "./Controles";
import Fondo from "./Fondo"; // <-- importa el fondo dinámico
import FlujoProceso from "./FlujoProceso";

// Controlador de cámara que cambia según modo
function CameraController({ modoLibre }) {
  const controlsRef = useRef();
  const { camera } = useThree();
  

  useEffect(() => {
    // Solo modificamos en modoLibre (modo 'ver')
    if (modoLibre) {
      camera.position.set(0, 3, 20); // más alejado y centrado
      camera.lookAt(0, 0, 0);
    }
  }, [modoLibre]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={modoLibre}
      enablePan={false}
      minDistance={modoLibre ? 6 : 20}
      maxDistance={modoLibre ? 14 : 20}
    />
  );
}

export default function Scene({ pasoInicial = 1 }) {
  const [aceptado, setAceptado] = useState(false);
  const [currentStep, setCurrentStep] = useState(pasoInicial);
  const [modoLibre, setModoLibre] = useState(false);
  const [mostrarFlujo, setMostrarFlujo] = useState(true);
  const paso = pasos[currentStep];

  if (!aceptado) {
  return <Welcome onAceptar={() => setAceptado(true)} />;
}

if (mostrarFlujo) {
  return <FlujoProceso onContinuar={() => setMostrarFlujo(false)} />;
}


  return (
    <div className="relative w-screen h-screen">
      <Canvas camera={{ position: [0, 2, 20], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 2, 3]} intensity={1.5} />

        <CameraController modoLibre={modoLibre} />

        <Suspense fallback={null}>
          <Model3D ruta={paso.model} scale={paso.scale} modoLibre={modoLibre} />

        </Suspense>

        <Fondo modoLibre={modoLibre} />
      </Canvas>

      {/* Título del paso */}
     <h1 className="absolute top-6 inset-x-0 text-center text-3xl sm:text-4xl md:text-5xl font-bold text-red-600 z-50 bg-white/50 backdrop-blur-sm px-4 py-1 rounded-lg shadow-md">
  {paso.title}
</h1>


      {/* Controles */}
      <Controles
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        modoLibre={modoLibre}
        setModoLibre={setModoLibre}
      />
    </div>
  );
}
