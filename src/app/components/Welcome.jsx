"use client";
import { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { pasos } from "./pasos";

export default function Welcome({ onAceptar }) {
  const [contador, setContador] = useState(5);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setReady(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    Object.values(pasos).forEach((p) => {
      useGLTF.preload(p.model);
    });
  }, []);

  useEffect(() => {
    if (contador > 0) {
      const timer = setTimeout(() => setContador((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [contador]);

  if (!ready) return null;

  return (
    <div className="fixed inset-0 bg-cover bg-center bg-no-repeat z-50 overflow-y-auto flex items-center justify-center px-4 py-12"
      style={{
        backgroundImage: `url('/found/piña.jpg')`,
      }}
    >
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-8 text-center space-y-6 select-none">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-900 leading-tight">
          Sitio Web Interactivo en 3D para la Simulación del Proceso de Producción de Bioetanol a partir de Biomasa de Piña
        </h1>

        <p className="text-gray-700 text-justify text-base sm:text-lg leading-relaxed">
          Este proyecto consiste en el desarrollo de un sitio web interactivo en 3D que muestra modelos del paso a paso del proceso de producción de bioetanol a partir de biomasa de piña. Mediante el uso de tecnologías como <strong>React.js</strong> y <strong>Three.js</strong>, se representarán visualmente las etapas clave del proceso, desde la selección de la materia prima hasta la aplicación final del bioetanol. Cada fase contará con un modelo 3D interactivo, una descripción explicativa y controles de navegación para avanzar o retroceder entre los pasos.
        </p>

        <div className="text-gray-800">
          <p className="font-semibold text-lg mb-2">Universidad Corporativa del Meta</p>
          <ul className="space-y-1 text-left mx-auto inline-block text-base">
            <li>Andrés Felipe Martínez González - Ing. de Sistemas</li>
            <li>Camilo Andrés Barajas Marulanda - Ing. Industrial</li>
            <li>Jeferson Alexis Monroy Rivas - Ing. Agroindustrial</li>
          </ul>
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <p>Diseñado por Andrés F. Martínez (X_L)</p>
          <p>Todos los derechos reservados © 2025</p>
          <p>
            Repositorio del proyecto:{" "}
            <a
              href="https://github.com/FelixixLike/bioetanol-3d"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-700 underline hover:text-cyan-900"
            >
              github.com/FelixixLike/bioetanol-3d
            </a>
          </p>
        </div>

        <div className="pt-4">
          {contador > 0 && (
            <p className="text-sm text-gray-600 animate-pulse" suppressHydrationWarning>
              Cargando... {contador}s
            </p>
          )}
          {contador === 0 && (
            <button
              onClick={onAceptar}
              className="mt-2 bg-cyan-900 text-white px-6 py-2 rounded-md hover:bg-cyan-800 transition"
            >
              Aceptar y continuar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
