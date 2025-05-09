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
  const [mostrarTexto, setMostrarTexto] = useState(false);
  const [leyendo, setLeyendo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [sonidoFlecha, setSonidoFlecha] = useState(null);
  const [sonidoBoton, setSonidoBoton] = useState(null);
  const [sonidoText, setSonidoText] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
      setSonidoFlecha(new Audio("/sounds/sound_flechas.mp3"));
      setSonidoBoton(new Audio("/sounds/sound_button.mp3"));
      setSonidoText(new Audio("/sounds/sound_text.mp3"));
    }
  }, []);

  const playSound = (audio, forPaso = false) => {
    if (!audio) return;
    if (!forPaso || (forPaso && !muted)) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  };

  const detenerLectura = () => {
    if (sonidoText) playSound(sonidoText);
    window.speechSynthesis.cancel();
    setLeyendo(false);
  };

  const leerTexto = () => {
    detenerLectura();
    const texto = `${paso.title}. ${paso.description}. ${paso.objetive}`;
    const speech = new SpeechSynthesisUtterance(texto);
    speech.lang = "es-ES";
    speech.pitch = 1;
    speech.rate = 0.95;
    speech.preferLocalService = true;

    speech.onend = () => {
      if (sonidoText) playSound(sonidoText);
      setLeyendo(false);
    };

    window.speechSynthesis.speak(speech);
    playSound(sonidoText);
    setLeyendo(true);
  };

  const siguiente = () => {
    if (pasos[currentStep + 1]) {
      playSound(sonidoFlecha);
      detenerLectura();
      setCurrentStep(currentStep + 1);
    }
  };

  const anterior = () => {
    if (currentStep > 1) {
      playSound(sonidoFlecha);
      detenerLectura();
      setCurrentStep(currentStep - 1);
    }
  };

  const volverInicio = () => {
    playSound(sonidoBoton);
    location.reload();
  };

  useEffect(() => {
    if (modoLibre && paso.sound) {
      const audio = new Audio(paso.sound);
      audio.loop = true;
      audio.volume = 1;
      playSound(audio, true);
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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : 1;
    }
  }, [muted]);

  useEffect(() => {
    if (!modoLibre) leerTexto();
  }, [currentStep]);

  if (!modoLibre) {
    return (
      <>
        {/* Flechas */}
        {currentStep > 1 && (
          <img
            src="/flecha_izquierda.png"
            onClick={anterior}
            className="select-none absolute top-1/2 -translate-y-1/2 left-2 lg:left-[10vw] w-12 sm:w-16 lg:w-20 cursor-pointer z-50 hover:scale-110 transition"
            draggable={false}
            alt="Flecha izquierda"
          />
        )}
        {currentStep < Object.keys(pasos).length && (
          <img
            src="/flecha_derecha.png"
            onClick={siguiente}
            className="select-none absolute top-1/2 -translate-y-1/2 right-2 lg:right-[10vw] w-12 sm:w-16 lg:w-20 cursor-pointer z-50 hover:scale-110 transition"
            draggable={false}
            alt="Flecha derecha"
          />
        )}

        {/* Panel para móviles */}
        {isMobile ? (
          <>
            {/* Mini texto con botón leer más */}
            {!mostrarTexto && (
              <>
                <div className="absolute bottom-[17vh] left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-white/90 rounded-xl border border-slate-700 shadow-lg p-4 text-sm text-justify backdrop-blur-sm z-40">
                  <div className="flex justify-center mb-2">
                    {!leyendo ? (
                      <button
                        onClick={leerTexto}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full hover:bg-blue-700 transition"
                      >
                        🎧 Leer
                      </button>
                    ) : (
                      <button
                        onClick={detenerLectura}
                        className="px-3 py-1 bg-red-600 text-white text-xs rounded-full hover:bg-red-700 transition"
                      >
                        🔇 Cancelar
                      </button>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-700 mb-1">Descripción</h3>
                  <p className="line-clamp-3 overflow-hidden text-gray-800 max-h-[5.5rem]">
                    {paso.description}
                  </p>
                </div>

                {/* Botón ver más */}
                <button
                  onClick={() => setMostrarTexto(true)}
                  className="absolute bottom-[10.5vh] right-6 bg-black/80 text-white px-4 py-1 text-xs rounded-full z-50 hover:bg-black transition"

                >
                  ⬆ Ver texto
                </button>
              </>
            )}

            {/* Panel expandido con scroll */}
            {mostrarTexto && (
              <div className="fixed bottom-0 left-0 w-full max-h-[85vh] bg-white border-t-2 border-slate-800 shadow-lg p-4 pt-6 z-50 overflow-y-auto rounded-t-xl">
                <div className="text-center mb-3">
                  <button
                    onClick={() => setMostrarTexto(false)}
                    className="bg-red-600 text-white px-3 py-1 rounded-full text-sm hover:bg-red-700 transition"
                  >
                    ⬇ Ver menos
                  </button>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mb-4 w-full">
                  {!leyendo ? (
                    <button
                      onClick={leerTexto}
                      className="px-4 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
                    >
                      🎧 Leer
                    </button>
                  ) : (
                    <button
                      onClick={detenerLectura}
                      className="px-4 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700 transition"
                    >
                      🔇 Cancelar
                    </button>
                  )}
                </div>
                <div className="px-2 pb-[6vh] text-justify text-sm select-none">
                  <h3 className="font-bold text-gray-700 mb-1">Descripción</h3>
                  <p className="mb-4">{paso.description}</p>
                  <h3 className="font-bold text-gray-700 mb-1">Objetivo</h3>
                  <p className="italic text-slate-700">{paso.objetive}</p>
                </div>
              </div>
            )}
          </>
        ) : (
          // Panel para PC
          <div className="absolute bottom-[12vh] left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-white rounded-xl border-2 border-slate-800 shadow-lg p-6 flex flex-col items-center z-50 select-none">
            <div className="flex flex-wrap justify-center gap-4 mb-4 w-full">
              {!leyendo ? (
                <button
                  onClick={leerTexto}
                  className="px-5 py-2 lg:px-8 lg:py-3 rounded bg-blue-600 text-white text-sm sm:text-base lg:text-lg hover:bg-blue-700 transition"
                >
                  🎧 Leer
                </button>
              ) : (
                <button
                  onClick={detenerLectura}
                  className="px-5 py-2 lg:px-8 lg:py-3 rounded bg-red-600 text-white text-sm sm:text-base lg:text-lg hover:bg-red-700 transition"
                >
                  🔇 Cancelar
                </button>
              )}
            </div>
            <div className="w-full lg:max-w-[700px] text-justify">
              <h3 className="font-bold text-gray-700 mb-1">Descripción</h3>
              <p className="text-gray-800 mb-4">{paso.description}</p>
              <h3 className="font-bold text-gray-700 mb-1">Objetivo</h3>
              <p className="italic text-slate-700">{paso.objetive}</p>
            </div>
          </div>
        )}

        {/* Botón VER */}
        <button
          onClick={() => {
            playSound(sonidoBoton);
            setModoLibre(true);
          }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-cyan-900 text-white px-6 py-2 lg:px-8 lg:py-3 rounded-md text-sm sm:text-base lg:text-lg shadow-md hover:bg-cyan-800 transition z-50"
        >
          VER
        </button>

        {/* Botón INICIO */}
        {currentStep === Object.keys(pasos).length && (
          <button
            onClick={() => {
              detenerLectura();
              volverInicio();
            }}
            className="fixed bottom-6 right-6 bg-red-700 text-white font-bold px-6 py-2 lg:px-8 lg:py-3 rounded-md text-sm sm:text-base lg:text-lg shadow-md hover:bg-red-600 transition z-50"
          >
            Inicio
          </button>
        )}
      </>
    );
  }

  // MODO LIBRE
  return (
    <>
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

      <button
        onClick={() => {
          playSound(sonidoBoton);
          setModoLibre(false);
        }}
        className="fixed bottom-6 right-6 bg-cyan-900 text-white px-5 py-2 lg:px-8 lg:py-3 rounded-md text-sm sm:text-base lg:text-lg shadow-md hover:bg-cyan-800 transition z-50"
      >
        Retroceder
      </button>
    </>
  );
}
