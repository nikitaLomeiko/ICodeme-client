import { usePosition } from "../../model/hooks/use.position";
import { TypePosition } from "../../model/types/type.position";
import { ParticleEffect } from "./ui/particle.effect";
import { TextWater } from "./ui/text.water";

interface IProps {
  children: React.ReactNode;
  position: TypePosition;
}

export const LayoutWrapper: React.FC<IProps> = ({ children, position }) => {
  const { gradient } = usePosition(position);

  return (
    <div className="h-screen w-screen flex relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="absolute inset-0 bg-black/70" />

        <div
          className={`absolute inset-0 bg-gradient-${gradient} from-black/90 via-transparent to-transparent`}
        />

        <ParticleEffect />

        <TextWater position={position} />
      </div>
      {children}
    </div>
  );
};
