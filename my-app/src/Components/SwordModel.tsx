import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect } from 'react';
type SwordModelProps = {
  isSlashing: boolean;
};

export default function SwordModel({ isSlashing }: SwordModelProps) {
  const { scene, animations } = useGLTF('/zoro_sword.glb');
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (isSlashing) {
      actions?.SlashAction?.play();
    }
  }, [isSlashing, actions]);

  return <primitive object={scene} scale={0.2} position={[0, -1, 0]} />;
}