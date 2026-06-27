import { useId } from "react";
import { cn } from "@/lib/cn";

type CommonProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
};

const fieldBase =
  "w-full rounded-input border bg-card/70 px-4 py-3 font-body text-ink " +
  "placeholder:text-ink-soft/60 outline-none transition " +
  "focus:border-orange focus:ring-2 focus:ring-orange/30";

/** Labelled, RTL-aware text input with orange focus ring + error text. */
export function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required,
  autoComplete,
  type = "text",
  className,
}: CommonProps & { type?: string }) {
  const id = useId();
  return (
    <div className={cn("text-start", className)}>
      <label htmlFor={id} className="mb-1.5 block font-body text-sm font-semibold text-orange">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={cn(fieldBase, error ? "border-orange" : "border-line")}
      />
      {error ? (
        <p id={`${id}-err`} className="mt-1 font-body text-xs text-orange-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Labelled textarea variant. */
export function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  required,
  rows = 5,
  className,
}: CommonProps & { rows?: number }) {
  const id = useId();
  return (
    <div className={cn("text-start", className)}>
      <label htmlFor={id} className="mb-1.5 block font-body text-sm font-semibold text-orange">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        rows={rows}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={cn(fieldBase, "resize-y", error ? "border-orange" : "border-line")}
      />
      {error ? (
        <p id={`${id}-err`} className="mt-1 font-body text-xs text-orange-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
