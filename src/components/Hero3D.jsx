import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Orb() {
  const group = useRef();
  const pointer = useRef({ x: 0, y: 0 });
  // window-level listener, so the orb follows the mouse even under the hero text
  useEffect(() => {
    const move = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  useFrame((_, dt) => {
    const g = group.current;
    g.rotation.y += dt * 0.25;
    g.rotation.x += (pointer.current.y * -0.6 - g.rotation.x) * 0.05;
    g.position.x += (pointer.current.x * 0.5 - g.position.x) * 0.05;
  });
  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshStandardMaterial color="#8be04e" wireframe />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial color="#0f2a1c" metalness={0.8} roughness={0.25} flatShading />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]} aria-hidden="true">
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={60} color="#8be04e" />
      <pointLight position={[-4, -2, 2]} intensity={30} color="#1fa764" />
      <Orb />
    </Canvas>
  );
}
