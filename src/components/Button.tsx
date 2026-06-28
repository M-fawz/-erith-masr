import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "dark" | "orange" | "outline";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-body font-semibold " +
  "transition-[transform,background-color,color,box-shadow] duration-200 focus-visible:outline-none " +
  "select-none will-change-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] " +
  "motion-reduce:transform-none motion-reduce:transition-colors";

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
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "ref"> & { href?: undefined };
type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "ref"> & { href: string };

/** Brand pill button (dark / orange / outline). CSS-only press + hover lift so
 *  it stays off the framer-motion critical path. */
export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "dark", size = "md", className, ...rest } = props;
  const cls = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    return <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }
  return <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} />;
}
