"use client";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export default function Fondo({ modoLibre }) {
  const texture = useLoader(
    TextureLoader,
    modoLibre ? "/found/piña.jpg" : "/found/universidad.jpg"
  );
  return <primitive attach="background" object={texture} />;
}
