"use client";
import { useGLTF } from "@react-three/drei";
import { useState, useEffect } from "react";

export default function Model3D({ ruta, scale, modoLibre  }) {
  const { scene } = useGLTF(ruta);
  const [isReady, setIsReady] = useState(false);

  // Evita mostrar modelo hasta que esté completamente cargado y asignado
  useEffect(() => {
    let frame = requestAnimationFrame(() => setIsReady(true));
    return () => {
      cancelAnimationFrame(frame);
      setIsReady(false); // reinicia cuando cambia ruta
    };
  }, [ruta]);

  if (!isReady) return null;

  return (
    <primitive
  object={scene}
  scale={scale}
  position={modoLibre ? [0, 0, 0] : [0, 1, 0]}
/>

  );
}
