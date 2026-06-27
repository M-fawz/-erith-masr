import { useTranslation } from "react-i18next";
import { Container } from "@/components/Container";
import { ReviewCard } from "@/components/ReviewCard";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

const REVIEWS = [
  { key: "reviews.r1", photo: "/assets/avatars/abu-salem.webp" },
  { key: "reviews.r2", photo: "/assets/avatars/ben-najah.webp" },
  { key: "reviews.r3", photo: "/assets/avatars/hakim.webp" },
  { key: "reviews.r4", photo: "/assets/avatars/abdullah.webp" },
] as const;

export function Reviews() {
  const { t } = useTranslation();

  return (
    <section id="reviews" className="section-pad scroll-mt-28">
      <Container>
        <Reveal>
          <h2 className="max-w-4xl font-display text-h2 font-bold leading-snug text-orange text-start">
            {t("reviews.title")}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
          {REVIEWS.map((r, i) => (
            <Reveal
              key={r.key}
              delay={i * 0.12}
              direction="up"
              className={cn(i % 2 === 1 && "lg:mt-14")}
            >
              <ReviewCard
                photo={r.photo}
                name={t(`${r.key}.name`)}
                country={t(`${r.key}.country`)}
                rating={parseFloat(t(`${r.key}.rating`))}
                text={t(`${r.key}.text`)}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
