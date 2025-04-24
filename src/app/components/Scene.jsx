"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import Model3D from "./Model3D";
import { pasos } from "./pasos";
import Welcome from "./Welcome";

// ✅ Precargar todos los modelos
Object.values(pasos).forEach((p) => {
  useGLTF.preload(p.model);
});

function CameraController({ modoLibre }) {
  const controlsRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    if (modoLibre) {
      // Acercar al modelo
      camera.position.set(1, 3, 7);
      camera.lookAt(0, 0, 0);
    } else {
      // Alejar a vista original
      camera.position.set(1, 3, 20);
      camera.lookAt(0, 0, 0);
    }
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

  const siguiente = () => {
    if (pasos[currentStep + 1]) setCurrentStep(currentStep + 1);
  };

  const anterior = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Mostrar pantalla de bienvenida
  if (aceptado) {
    return <Welcome onAceptar={() => setAceptado(true)} />;
  }

  return (
    <div className="relative w-screen h-screen">
      <Canvas camera={{ position: [0, 2, 20], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 2, 3]} intensity={1.5} />
        <CameraController modoLibre={modoLibre} />
        <Suspense fallback={null}>
          <Model3D ruta={paso.model}  scale={paso.scale} />
        </Suspense>
      </Canvas>

      {/* Título del paso */}
      <h1 className="absolute top-6 inset-x-0 text-center text-3xl sm:text-4xl md:text-5xl font-bold text-red-600 drop-shadow-lg z-50">
        {paso.title}
      </h1>

      {/* UI con botones y descripción */}
      {!modoLibre && (
        <>
          {/* Flechas de navegación */}
          {/* Flecha izquierda */}
          <img
  src="/flecha_izquierda.png"
  onClick={anterior}
  className="absolute top-1/2 -translate-y-1/2 left-2 lg:left-[10vw] w-10 sm:w-12 cursor-pointer z-50 hover:scale-110 transition"
/>
        {/* Flecha derecha */}
        <img
  src="/flecha_derecha.png"
  onClick={siguiente}
  className="absolute top-1/2 -translate-y-1/2 right-2 lg:right-[10vw] w-10 sm:w-12 cursor-pointer z-50 hover:scale-110 transition"
/>

          {/* Descripción y objetivo */}
          <div className="absolute bottom-[18vh] left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white rounded-xl border-2 border-slate-800 shadow-lg p-5 flex flex-col items-center z-50">
            <p className="text-sm text-gray-800 mb-2 text-center max-h-[80px] overflow-y-auto">
              {paso.description}
            </p>
            <p className="text-sm text-slate-700 italic text-center max-h-[80px] overflow-y-auto">
              {paso.objetive}
            </p>
          </div>

          {/* Botón VER */}
          <button
            onClick={() => setModoLibre(true)}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-cyan-900 text-white px-6 py-2 rounded-md shadow-md hover:bg-cyan-800 transition z-50"
          >
            VER
          </button>
        </>
      )}

      {/* Botón Retroceder */}
      {modoLibre && (
        <button
          onClick={() => setModoLibre(false)}
          className="fixed bottom-6 right-6 bg-cyan-900 text-white px-5 py-2 rounded-md shadow-md hover:bg-cyan-800 transition z-50"
        >
          Retroceder
        </button>
      )}
    </div>
  );
}
