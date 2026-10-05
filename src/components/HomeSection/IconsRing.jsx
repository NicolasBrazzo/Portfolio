import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import {
  Accessibility,
  Braces,
  Code,
  Component,
  Database,
  Gauge,
  GitBranch,
  Globe,
  Layers,
  LayoutGrid,
  MousePointer2,
  Palette,
  PenTool,
  Smartphone,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react";
import { gsap } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/motion";

const icons = [
  Code,
  Braces,
  Layers,
  Component,
  Database,
  LayoutGrid,
  Palette,
  PenTool,
  MousePointer2,
  Smartphone,
  Accessibility,
  Terminal,
  Workflow,
  Zap,
  Gauge,
  GitBranch,
  Globe,
];

// Secondi per un giro completo
const LOOP_DURATION = 90;

export const IconsRing = () => {
  const containerRef = useRef(null);
  const ringRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // L'anello ruota in senso orario, all'infinito e a velocità costante
      gsap.to(ringRef.current, {
        rotation: 360,
        duration: LOOP_DURATION,
        ease: "none",
        repeat: -1,
      });

      // Le icone contro-ruotano per restare sempre dritte
      gsap.to(".ring-icon", {
        rotation: -360,
        duration: LOOP_DURATION,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-[min(92vw,840px)] pointer-events-none opacity-40 md:opacity-100"
    >
      <div ref={ringRef} className="absolute inset-[0]">
        {/* Tracciato dell'anello */}
        <div className="absolute inset-[0] rounded-full border border-rule-soft" />

        {icons.map((Icon, i) => {
          // Distribuzione uniforme sul cerchio, partendo dall'alto
          const angle = (i / icons.length) * 2 * Math.PI - Math.PI / 2;
          const left = 50 + 50 * Math.cos(angle);
          const top = 50 + 50 * Math.sin(angle);

          return (
            <div
              key={Icon.displayName ?? i}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <div className="ring-icon size-55 grid place-items-center rounded-full border border-rule bg-paper text-graphite-3">
                <Icon size={21} strokeWidth={1.5} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
