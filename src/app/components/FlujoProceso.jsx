"use client";

import { pasos } from "./pasos";

export default function FlujoProceso({ onContinuar }) {
  return (
    <div className="w-screen h-screen bg-[url('/found/fondo_piña.jpg')] bg-cover bg-center flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white/70 backdrop-blur-md rounded-xl shadow-lg px-6 py-10 text-center text-cyan-900">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          Flujo del Proceso de Producción de Bioetanol a partir de Biomasa de Piña
        </h1>

        <p className="text-gray-700 text-sm sm:text-base max-w-3xl mx-auto mb-8">
          A continuación, se presenta una visión general del proceso de producción de bioetanol
          mediante el aprovechamiento de la biomasa de piña. Cada etapa representa una fase clave,
          ordenada de forma secuencial para facilitar su comprensión.
        </p>

        <div className="w-full overflow-x-auto">
          <div className="inline-flex gap-4 items-center px-2 py-4">

            {Object.entries(pasos).map(([key, paso], index) => (
              <div key={key} className="flex items-center">
                <div className="bg-white border border-cyan-800 px-4 py-2 rounded shadow text-sm sm:text-base text-cyan-900 font-medium whitespace-nowrap">
                  {paso.title}
                </div>
                {index < Object.keys(pasos).length - 1 && (
                  <div className="mx-2 text-lg sm:text-xl text-gray-500">➜</div>
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
