import { FaBook } from "react-icons/fa";
import { IModule, INotation } from "../model";

interface IProps extends Omit<IModule, "levels"> {
  children: React.ReactNode;
}

export const Module: React.FC<IProps> = (props) => {
  const { description, title, children, isCompleted, isCurrent } = props;

  return (
    <div className="relative max-w-[1400px] mx-auto  px-8">
      <div className="absolute inset-0 pointer-events-none overflow-hidden"></div>

      <div
        className="relative px-8 py-8 rounded-3xl border mb-12 overflow-hidden"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--ui-background-secondary) 60%, transparent)",
          borderColor: "var(--ui-border)",
          boxShadow: "0 12px 40px -12px rgba(0,0,0,0.25)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="relative flex items-start gap-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg relative overflow-hidden shrink-0"
            style={{
              background:
                "linear-gradient(135deg, var(--ui-primary), var(--ui-secondary))",
              boxShadow: "var(--ui-brand-shadow)",
            }}
          >
            <FaBook className="text-3xl" />
          </div>
          <div className="min-w-0">
            <h2
              className="text-2xl font-bold leading-tight mt-1"
              style={{
                color: "var(--ui-text)",
                background:
                  "linear-gradient(135deg, var(--ui-primary), var(--ui-secondary))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {title}
            </h2>
            <p
              className="text-sm mt-1.5 max-w-lg"
              style={{ color: "var(--ui-text-muted)" }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};
