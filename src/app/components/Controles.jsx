"use client";
import { useEffect, useRef, useState } from "react";
import { pasos } from "./pasos";

export default function Controles({
  currentStep,
  setCurrentStep,
  modoLibre,
  setModoLibre,
}) {
  const paso = pasos[currentStep];
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);

  // Avanzar al siguiente paso
  const siguiente = () => {
    if (pasos[currentStep + 1]) setCurrentStep(currentStep + 1);
  };

  // Retroceder al paso anterior
  const anterior = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Reproducir sonido en bucle cuando entra a modoLibre
  useEffect(() => {
    if (modoLibre && paso.sound) {
      const audio = new Audio(paso.sound);
      audio.loop = true;
      audio.volume = muted ? 0 : 1;
      audio.play().catch((e) => console.warn("Error al reproducir sonido:", e));
      audioRef.current = audio;
    }

    // Detener sonido al salir del modoLibre
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, [modoLibre, paso.sound]);

  // Silenciar o activar el volumen en tiempo real
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : 1;
    }
  }, [muted]);

  // Si NO está en modoLibre => mostrar flechas, VER y descripción
  if (!modoLibre) {
    return (
      <>
        {/* Flechas de navegación */}
        {currentStep > 1 && (
          <img
            src="/flecha_izquierda.png"
            onClick={anterior}
            className="select-none absolute top-1/2 -translate-y-1/2 left-2 lg:left-[10vw] w-10 sm:w-12 cursor-pointer z-50 hover:scale-110 transition"
            draggable={false}
            alt="Flecha izquierda"
          />
        )}
        {currentStep < Object.keys(pasos).length && (
          <img
            src="/flecha_derecha.png"
            onClick={siguiente}
            className="select-none absolute top-1/2 -translate-y-1/2 right-2 lg:right-[10vw] w-10 sm:w-12 cursor-pointer z-50 hover:scale-110 transition"
            draggable={false}
            alt="Flecha derecha"
          />
        )}

        {/* Descripción del paso actual */}
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
    );
  }

  // Si está en modoLibre => mostrar botón RETROCEDER y MUTE
  return (
    <>
      {/* Botón de sonido 🔊/🔇 */}
      <button
        onClick={() => setMuted((prev) => !prev)}
        className="fixed sm:top-4 sm:left-4 bottom-4 left-4 w-12 h-12 sm:w-16 sm:h-16 z-[9999] flex items-center justify-center bg-transparent p-0 border-none cursor-pointer"
        title={muted ? "Activar sonido" : "Silenciar sonido"}
      >
        <img
          src={muted ? "/sound_off.png" : "/sound_on.png"}
          alt={muted ? "Sonido desactivado" : "Sonido activado"}
          className="w-7 h-7 sm:w-10 sm:h-10 pointer-events-none"
        />
      </button>

      {/* Botón RETROCEDER */}
      <button
        onClick={() => setModoLibre(false)}
        className="fixed bottom-6 right-6 bg-cyan-900 text-white px-5 py-2 rounded-md shadow-md hover:bg-cyan-800 transition z-50"
      >
        Retroceder
      </button>
    </>
  );
}
