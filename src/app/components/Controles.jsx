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

  const sonidoFlecha = new Audio("/sounds/sound_flechas.mp3");
  const sonidoBoton = new Audio("/sounds/sound_button.mp3");

  // 🔊 Siempre se escucha excepto si forPaso=true y mute activado
  const playSound = (audio, forPaso = false) => {
    if (!forPaso || (forPaso && !muted)) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  };

  const siguiente = () => {
    if (pasos[currentStep + 1]) {
      playSound(sonidoFlecha);
      setCurrentStep(currentStep + 1);
    }
  };

  const anterior = () => {
    if (currentStep > 1) {
      playSound(sonidoFlecha);
      setCurrentStep(currentStep - 1);
    }
  };

  const volverInicio = () => {
    playSound(sonidoBoton);
    location.reload(); // vuelve al Welcome
  };

  // 🎵 Reproducir sonido de ambiente del paso en modo VER
  useEffect(() => {
    if (modoLibre && paso.sound) {
      const audio = new Audio(paso.sound);
      audio.loop = true;
      audio.volume = 1;
      playSound(audio, true); // solo este respeta mute
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, [modoLibre, paso.sound]);

  // Ajustar volumen en tiempo real
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : 1;
    }
  }, [muted]);

  // 👉 MODO NORMAL (paso a paso)
  if (!modoLibre) {
    return (
      <>
        {/* Flechas */}
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

        {/* Descripción */}
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
          onClick={() => {
            playSound(sonidoBoton);
            setModoLibre(true);
          }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-cyan-900 text-white px-6 py-2 rounded-md shadow-md hover:bg-cyan-800 transition z-50"
        >
          VER
        </button>

        {/* Botón INICIO solo si es el último paso */}
        {currentStep === Object.keys(pasos).length && (
          <button
            onClick={volverInicio}
            className="fixed bottom-6 right-6 bg-red-700 text-white font-bold px-6 py-2 rounded-md shadow-md hover:bg-red-600 transition z-50"
          >
            Inicio
          </button>
        )}
      </>
    );
  }

  // 👉 MODO VER
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
        onClick={() => {
          playSound(sonidoBoton);
          setModoLibre(false);
        }}
        className="fixed bottom-6 right-6 bg-cyan-900 text-white px-5 py-2 rounded-md shadow-md hover:bg-cyan-800 transition z-50"
      >
        Retroceder
      </button>
    </>
  );
}
