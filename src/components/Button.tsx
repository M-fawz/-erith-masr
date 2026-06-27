import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type Variant = "dark" | "orange" | "outline";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-body font-semibold " +
  "transition-colors duration-200 focus-visible:outline-none select-none";

const variants: Record<Variant, string> = {
  dark: "bg-ink text-white shadow-soft hover:bg-orange",
  orange: "bg-orange text-white shadow-soft hover:bg-orange-600",
  outline: "bg-cream/60 text-ink ring-1 ring-line hover:ring-orange hover:text-orange",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<HTMLMotionProps<"button">, "ref"> & { href?: undefined };
type ButtonAsLink = CommonProps &
  Omit<HTMLMotionProps<"a">, "ref"> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "dark", size = "md", className, ...rest } = props;
  const cls = cn(base, variants[variant], sizes[size], className);
  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring", stiffness: 400, damping: 22 },
  } as const;

  if ("href" in props && props.href !== undefined) {
    return (
      <motion.a className={cls} {...motionProps} {...(rest as HTMLMotionProps<"a">)} />
    );
  }
  return (
    <motion.button
      className={cls}
      {...motionProps}
      {...(rest as HTMLMotionProps<"button">)}
    />
  );
}
