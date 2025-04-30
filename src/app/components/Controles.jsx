"use client";
import { pasos } from "./pasos";

export default function Controles({
  currentStep,
  setCurrentStep,
  setModoLibre,
}) {
  const paso = pasos[currentStep];

  const siguiente = () => {
    if (pasos[currentStep + 1]) setCurrentStep(currentStep + 1);
  };

  const anterior = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <>
 {/* Flecha izquierda */}
{currentStep > 1 && (
  <img
    src="/flecha_izquierda.png"
    onClick={anterior}
    className="select-none absolute top-1/2 -translate-y-1/2 left-2 lg:left-[10vw] w-10 sm:w-12 cursor-pointer z-50 hover:scale-110 transition"
    draggable={false}
    alt="Flecha izquierda"
  />
)}

{/* Flecha derecha */}
{currentStep < Object.keys(pasos).length && (
  <img
    src="/flecha_derecha.png"
    onClick={siguiente}
    className="select-none absolute top-1/2 -translate-y-1/2 right-2 lg:right-[10vw] w-10 sm:w-12 cursor-pointer z-50 hover:scale-110 transition"
    draggable={false}
    alt="Flecha derecha"
  />
)}


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
  );
}
