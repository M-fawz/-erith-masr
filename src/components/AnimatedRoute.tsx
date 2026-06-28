import { motion, useScroll, useTransform } from "framer-motion";
import { useElementSize } from "@/hooks/useElementSize";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Pt = [number, number];

/** Smooth path through points (Catmull-Rom → cubic bezier). */
function smoothPath(pts: Pt[]): string {
  if (pts.length < 2) return "";
  const d = [`M ${pts[0][0]} ${pts[0][1]}`];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d.push(`C ${c1x} ${c1y} ${c2x} ${c2y} ${p2[0]} ${p2[1]}`);
  }
  return d.join(" ");
}

/**
 * The Program's signature: a winding teal route that DRAWS ITSELF as the
 * section scrolls (stroke-dashoffset tied to scroll progress), with a sailboat
 * travelling along the path (offset-path) and nodes at each destination.
 * Desktop only — it weaves through the central gutter between the cards.
 */
export function AnimatedRoute({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [ref, { width: w, height: h }] = useElementSize<HTMLDivElement>();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });

  const cx = w / 2;
  const amp = Math.min(w * 0.18, 150);
  // Waypoints (y-fractions roughly match the three destination rows).
  const nodes: Pt[] = [
    [cx + amp, h * 0.24],
    [cx - amp, h * 0.52],
    [cx + amp, h * 0.8],
  ];
  const pts: Pt[] =
    w && h ? [[cx, 0], nodes[0], nodes[1], nodes[2], [cx, h]] : [];
  const d = smoothPath(pts);

  const dashOffset = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const boatDistance = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // Fixed 3 transforms (no hooks-in-loop) — each node lights as the boat passes.
  const lit0 = useTransform(scrollYProgress, (v) => (v >= 0.22 ? 1 : 0.3));
  const lit1 = useTransform(scrollYProgress, (v) => (v >= 0.5 ? 1 : 0.3));
  const lit2 = useTransform(scrollYProgress, (v) => (v >= 0.78 ? 1 : 0.3));
  const litValues = [lit0, lit1, lit2];

  if (!w || !h) {
    return <div ref={ref} className={className} aria-hidden="true" />;
  }

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        fill="none"
        className="overflow-visible"
      >
        {/* faint dashed track (always visible) */}
        <path
          d={d}
          stroke="var(--teal)"
          strokeOpacity={0.28}
          strokeWidth={2.5}
          strokeDasharray="2 12"
          strokeLinecap="round"
        />
        {/* solid teal line that draws in on scroll */}
        <motion.path
          d={d}
          stroke="var(--teal)"
          strokeWidth={4}
          strokeLinecap="round"
          pathLength={1}
          style={
            reduced
              ? undefined
              : { strokeDasharray: 1, strokeDashoffset: dashOffset }
          }
        />
        {/* destination nodes */}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n[0]}
            cy={n[1]}
            r={7}
            fill="var(--teal)"
            stroke="var(--sand)"
            strokeWidth={4}
            style={reduced ? undefined : { opacity: litValues[i] }}
          />
        ))}
      </svg>

      {/* Sailboat travelling the route */}
      <motion.img
        src="/assets/icons/sailboat.png"
        alt=""
        className="absolute left-0 top-0 h-11 w-auto drop-shadow"
        style={{
          offsetPath: `path('${d}')`,
          offsetDistance: reduced ? "100%" : boatDistance,
          offsetRotate: "0deg",
        }}
      />
    </div>
  );
}
