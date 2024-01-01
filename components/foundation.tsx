//@ts-nocheck
interface FoundationProps {
    color: string;
    position: number[];
    width: number | undefined;
  }
  
  const Foundation = ({ color, position, width }: FoundationProps) => {
    return (
      <mesh position={position} castShadow receiveShadow>
        <boxGeometry args={[30, 20.5, 30]} />
        <meshBasicMaterial color={color} />
      </mesh>
    );
  };
  
  export default Foundation;
  