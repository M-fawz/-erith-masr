import { StarRating } from "./StarRating";
import { cn } from "@/lib/cn";

/**
 * Review card: rounded portrait, orange bold name, grey country, big orange
 * rating + gold stars, short review text. Subtle hover tilt/lift.
 */
export function ReviewCard({
  photo,
  name,
  country,
  rating,
  text,
  className,
}: {
  photo: string;
  name: string;
  country: string;
  rating: number;
  text: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group flex flex-col text-start transition-transform duration-300 will-change-transform hover:-translate-y-1.5",
        className,
      )}
    >
      <div className="overflow-hidden rounded-card shadow-card ring-1 ring-line/40">
        <img
          src={photo}
          alt={name}
          loading="lazy"
          width={420}
          height={460}
          className="aspect-[4/4.4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-4">
        <h3 className="font-display text-h3 font-bold leading-tight text-orange">
          {name}{" "}
          <span className="font-body text-sm font-medium text-ink-soft">
            {country}
          </span>
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <span className="font-display text-2xl font-extrabold text-orange">
            {rating.toFixed(1)}
          </span>
          <StarRating value={rating} className="text-xl" />
        </div>

        <p className="mt-3 font-body text-sm leading-relaxed text-ink-sand">
          {text}
        </p>
      </div>
    </article>
  );
}
