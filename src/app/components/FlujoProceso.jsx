"use client";

import { pasos } from "./pasos";

export default function FlujoProceso({ onContinuar }) {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-100 px-4">
      <div className="w-full max-w-6xl flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-900 mb-6 leading-snug">
          Flujo del Proceso de Producción de Bioetanol a partir de Biomasa de Piña
        </h1>

        <p className="text-gray-700 text-sm sm:text-base max-w-2xl mb-8">
          A continuación, se presenta una visión general del proceso de producción de bioetanol
          mediante el aprovechamiento de la biomasa de piña. Cada etapa representa una fase clave,
          ordenada de forma secuencial para facilitar su comprensión.
        </p>

        <div className="w-full overflow-x-auto">
          <div className="flex gap-4 items-center justify-start sm:justify-center px-2 py-4 min-w-[600px]">
            {Object.entries(pasos).map(([key, paso], index) => (
              <div key={key} className="flex items-center">
                <div className="bg-white border border-cyan-800 px-4 py-2 rounded shadow text-sm sm:text-base text-cyan-900 font-medium whitespace-nowrap">
                  {paso.title}
                </div>
                {index < Object.keys(pasos).length - 1 && (
                  <div className="mx-2 text-lg sm:text-xl text-gray-400">➜</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onContinuar}
          className="mt-8 bg-cyan-900 text-white px-6 py-2 rounded-md hover:bg-cyan-800 transition"
        >
          Iniciar Simulación
        </button>
      </div>
    </div>
  );
}
